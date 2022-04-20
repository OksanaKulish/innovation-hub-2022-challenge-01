import json
from main import download_file, smart_truncate, get_models, get_brand, download_images


def test_a():
    page = 1
    url = 'https://www.autoscout24.de/lst/?sort=age&desc=1&ustate=N%2CU&size=20&page=' + str(
        page) + '&cy=D&atype=C&'

    fn = download_file(url)

    with open(fn, 'r') as f:
        res = f.read()
    print(res)


def test_b():
    url1 = 'https://aaa.com/abcd.jpg/120x33.jpg'
    assert 'https://aaa.com/abcd.jpg' == smart_truncate(url1)


def build_prefixes():
    prefixes = list()
    brand = get_brand()
    for m in get_models():
        prefix = '/angebote/' + get_brand() + '-' + m + '-'
        p = {
            'prefix': prefix,
            'brand': brand,
            'model': m
        }
        prefixes.append(p)
    return prefixes


def discover_model(u):
    idx = u.find(get_brand()) + len(get_brand()) + 1
    idx2 = u[idx:].find('-', 2)
    return u[idx:idx+idx2]


def test_extract_model():
    urls = ['/angebote/ford-focus-turnier-1-0-benzin-rot-c0f24c63-59e1-4455-b79a-1c662ab362fd',
            '/angebote/ford-focus-cool-connect-1-0l-ecoboost-led-navi-pdc-elektro-benzin-grau-1cd71482-667f-411b-9ae3-0f09a2d19a4e',
            '/angebote/ford-c-max-titanium-xenon-navi-kamera-panoramadach-benzin-grau-e6df043b-a74f-458c-8003-620a50489248',
            '/angebote/ford-c-max-1-0-ecoboost-start-stopp-system-sync-edition-benzin-grau-80be8aad-4632-4c89-87a4-9e7daec69cbe',
            '/angebote/ford-c-max-2-0-titanium-klima-navi-ahzv-pano-pdc-diesel-schwarz-353df5bd-ea2b-43de-9752-e89d7700abe8',
            '/angebote/ford-explorer-plug-in-hybrid-st-line-4x4-elektro-benzin-blau-a1c5154d-347e-4a20-9f5f-49af5aacf7d0'
            ]

    prefixes = build_prefixes()
    # pair {brand, model} => prefix => substr (^prefix-)
    for u in urls:
        print(discover_model(u))


def test_d():
    import glob
    json_files_list = glob.glob('../data/autos/multiple_cars_dict_*.json')
    colors = set()

    color_map = {
        'Blau': 'Blue',
        'Braun': 'Brown',
        'Sonstige': 'Other',
        'Grau': 'Grey',
        'Weiß': 'White',
        'Metallic': 'Metallic',
        'Violett': 'Purple',
        'Schwarz': 'Black',
        'Silber': 'Silver',
        'Rot': 'Red',
        'Bronze': 'Bronze',
        'Orange': 'Orange',
        'Beige': 'Beige',
        'Gold': 'Gold',
        'Gelb': 'Yellow',
        'Grün': 'Green'}

    brand = get_brand()
    car_counter = 0
    car_images = 0

    for fn in json_files_list:
        with open(fn, "r") as f:
            res = json.load(f)

        # print(res)
        for k, v in res.items():
            model = discover_model(k)
            color = 'Unknown'
            if 'Außenfarbe' in v:
                de_color = v['Außenfarbe']
                colors.add(de_color)
                if de_color in color_map:
                    color = color_map[de_color]
            v['color'] = color
            v['model'] = model
            v['brand'] = brand
            car_images += download_images(v, folder="..")
            car_counter += 1

            if car_counter % 20 == 0:
                print("Cars: {0:05d}, Car images: {1:05d}", car_counter, car_images)
                print("Pausing for 180 seconds...")
                from time import sleep
                sleep(180)

            # break
    # print(colors)
    print(car_counter)
