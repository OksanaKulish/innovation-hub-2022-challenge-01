import requests as requests
from bs4 import BeautifulSoup
from bs4.element import SoupStrainer
# from bs4 import SoupStrainer  # , SoupStrainer  # HTML parsing
#import urllib.request  # aufrufen von URLs
from time import sleep  # damit legen wir den Scraper schlafen
import json  # lesen und schreiben von JSON-Dateien
from datetime import datetime  # um den Daten Timestamps zu geben
import re  # regular expressions
import os  # Dateipfade erstellen und lesen
import pandas as pd  # Datenanalyse und -manipulation

import random
user_agent_list = [
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Safari/605.1.15',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:77.0) Gecko/20100101 Firefox/77.0',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
]


def get_models():
    return ["focus", "c-max", "escape", "explorer", "mustang", "f-150", "fiesta", "kuga", "mondeo"]


def get_brand():
    return 'ford'


def smart_truncate(src):
    return src[0:src.rfind('/')]


def get_user_agent():
    user_agent = random.choice(user_agent_list)
    # Set the headers
    headers = {'User-Agent': user_agent}
    return headers


def download_file(url, folder=None):
    local_filename = url.split('/')[-1]
    if os.path.exists(folder):
        local_filename = os.path.join(folder, local_filename)
    # NOTE the stream=True parameter below
    with requests.get(url, stream=True, headers=get_user_agent()) as r:
        r.raise_for_status()
        with open(local_filename, 'wb') as f:
            for chunk in r.iter_content(chunk_size=8192):
                # If you have chunk encoded response uncomment if
                # and set chunk_size parameter to None.
                #if chunk:
                f.write(chunk)
    return local_filename


def read_url(url):
    fn = download_file(url)
    with open(fn, 'r') as f:
        res = f.read()
    return res


def download_images(car, folder):
    brand = car['brand']
    model = car['model']
    color = car['color']
    images = car['images']
    import os
    dir = os.path.join(folder, brand, model, color)
    if not os.path.exists(dir):
        os.makedirs(dir)
    images_counter = 0
    for img in images:
        from requests import HTTPError
        try:
            download_file(img, folder=dir)
        except Exception as e:
            print("Error: {}, Skipping file: {}", e, dir)

        # print(".", end='')
        images_counter += 1
        # sleep(1)
    # print("\n")
    return images_counter


def main():
    folders = ["data/visited/", "data/autos/"]

    for folder in folders:
        if not os.path.isdir(folder):
            os.mkdir(folder)
            print(folder, "created.")
        else:
            print(folder, "already existed")

    path_to_visited_urls = "data/visited/visited_urls.json"

    if not os.path.isfile(path_to_visited_urls):
        with open(path_to_visited_urls, "w") as file:
            json.dump([], file)

    countries = {"Deutschland": "D",
                 "Oesterreich": "A",
                 "Belgien": "B",
                 "Spanien": "E",
                 "Frankreich": "F",
                 "Italien": "I",
                 "Luxemburg": "L",
                 "Niederlande": "NL"}

    # countries = {"Deutschland": "D"}

    brand = get_brand()
    models = get_models()

    car_counter = 1
    cycle_counter = 0

    while True:

        with open(path_to_visited_urls) as file:
            visited_urls = json.load(file)

        if len(visited_urls) > 100000:
            visited_urls = []

        multiple_cars_dict = {}

        cycle_counter += 1

        for country in countries:
            for model in models:
                car_URLs = []

                for page in range(1, 21):

                    try:
                        url = 'https://www.autoscout24.de/lst/' + brand + '/' + model + '?sort=age&desc=1&ustate=N%2CU&size=20&page=' + str(
                            page) + '&cy=' + countries[country] + '&atype=C&'
                        only_a_tags = SoupStrainer("a")
                        html = read_url(url)
                        soup = BeautifulSoup(html, 'lxml', parse_only=only_a_tags)
                    except Exception as e:
                        print("Übersicht: " + str(e) + " " * 50, end="\r")
                        pass

                    for link in soup.find_all("a"):
                        if r"/angebote/" in str(link.get("href")):
                            car_URLs.append(link.get("href"))

                    car_URLs_unique = [car for car in list(set(car_URLs)) if car not in visited_urls]

                    print(f'Cycle {cycle_counter} | {country} | Page {page} | {len(car_URLs_unique)} new URLs', end="\r")
                print("")
                if len(car_URLs_unique) > 0:

                    for URL in car_URLs_unique:
                        print(f'Cycle {cycle_counter} | {country} | Auto {car_counter}' + ' ' * 50, end="\r")
                        try:
                            car_counter += 1

                            car_dict = {}
                            car_dict["country"] = country
                            car_dict["date"] = str(datetime.now())
                            car = BeautifulSoup(read_url('https://www.autoscout24.de' + URL), 'lxml')

                            for key, value in zip(car.find_all("dt"), car.find_all("dd")):
                                car_dict[key.text.replace("\n", "")] = value.text.replace("\n", "")

                            img_count = 1
                            # for gallery in car.find_all("div", attrs={"class":"image-gallery-slides"}):
                            #     for pics in gallery.find_all("picture", attrs={"class":"css-1uafc8p e3j2jx20"}):
                            #         for img in pics.find_all("img"):
                            #             res = img
                            #             car_dict["img_{0:2d}".format(img_count)] = res['src']
                            #             img_count += 1

                            car_images = []
                            for thumbnails in car.find_all("div", attrs={"class", "image-gallery-thumbnails-container"}):
                                for img in thumbnails.find_all("img", attrs={"class", "image-gallery-thumbnail-image"}):
                                    car_images.append(smart_truncate(img['src']))
                                    img_count += 1
                            car_dict["images"] = car_images

                            if len(car_images) < 1:
                                # no images - no fun
                                continue

                            car_dict["haendler"] = car.find("div", attrs={"class": "cldt-vendor-contact-box",
                                                                          "data-vendor-type": "dealer"}) != None

                            car_dict["privat"] = car.find("div", attrs={"class": "cldt-vendor-contact-box",
                                                                        "data-vendor-type": "privateseller"}) != None

                            # car_dict[""]
                            # car_dict["ort"] = car.find("div", attrs={"class": "sc-grid-col-12",
                            #                                          "data-item-name": "vendor-contact-city"}).text

                            # car_dict["price"] = "".join(
                            #     re.findall(r'[0-9]+', car.find("div", attrs={"class": "cldt-price"}).text))

                            ausstattung = []

                            for i in car.find_all("div", attrs={
                                "class": "cldt-equipment-block sc-grid-col-3 sc-grid-col-m-4 sc-grid-col-s-12 sc-pull-left"}):
                                for span in i.find_all("span"):
                                    ausstattung.append(i.text)

                            ausstattung2 = []

                            for element in list(set(ausstattung)):
                                austattung_liste = element.split("\n")
                                ausstattung2.extend(austattung_liste)

                            car_dict["ausstattung_liste"] = sorted(list(set(ausstattung2)))

                            multiple_cars_dict[URL] = car_dict
                            visited_urls.append(URL)
                        except Exception as e:
                            print("Detail page: " + str(e) + " " * 50)
                            pass
                    print("")

                else:
                    print("\U0001F634")
                    sleep(60)

        if len(multiple_cars_dict) > 0:
            # df = pd.DataFrame(multiple_cars_dict).T
            # df.to_csv("data/autos/" + re.sub("[.,:,-, ]", "_", str(datetime.now())) + ".csv", sep=";", index_label="url")
            with open("data/autos/multiple_cars_dict_" + re.sub("[.,:,-, ]", "_", str(datetime.now())) + ".json", "w") as file:
                json.dump(multiple_cars_dict, file)
        else:
            print("No data")
        with open("data/visited/visited_urls.json", "w") as file:
            json.dump(visited_urls, file)


if __name__ == "__main__":
    main()
