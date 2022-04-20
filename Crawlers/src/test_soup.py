import urllib
import urllib.request  # aufrufen von URLs
import pytest

def download_file(url):
    local_filename = url.split('/')[-1]
    # NOTE the stream=True parameter below
    import requests
    with requests.get(url, stream=True) as r:
        r.raise_for_status()
        with open(local_filename, 'wb') as f:
            for chunk in r.iter_content(chunk_size=8192):
                # If you have chunk encoded response uncomment if
                # and set chunk_size parameter to None.
                #if chunk:
                f.write(chunk)
    return local_filename



def test_a():
    page = 1
    url = 'https://www.autoscout24.de/lst/?sort=age&desc=1&ustate=N%2CU&size=20&page=' + str(
        page) + '&cy=D&atype=C&'

    fn = download_file(url)

    with open(fn, 'r') as f:
        res = f.read()
    print(res)


def smart_truncate(src):
    return src[0:src.rfind('/')]

def test_b():
    url1 = 'https://aaa.com/abcd.jpg/120x33.jpg'

    assert 'https://aaa.com/abcd.jpg' == smart_truncate(url1)
