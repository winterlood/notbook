import glob
import xml.etree.cElementTree as ET
import os
import os
from dotenv import load_dotenv

load_dotenv()

def add_element(url):
    global root
    doc = ET.SubElement(root, "url")
    ET.SubElement(doc, "loc").text = url

repo_info = os.getenv("GITHUB_REPOSITORY").split("/")
domain = 'https://%s.github.io/%s' % (repo_info[0], repo_info[1])

root = ET.Element('urlset')
root.attrib['xmlns'] = "http://www.sitemaps.org/schemas/sitemap/0.9"

add_element(domain)

pages = glob.glob("out/*.html")

for page in pages:
    if "404" in page: continue
    if "test" in page: continue
    url = page.replace('out/', domain+"/").replace('.html', '')
    add_element(url)
    print(url)

tree = ET.ElementTree(root)
ET.indent(tree, space="\t", level=0)
tree.write('out/sitemap.xml', encoding='utf-8', xml_declaration=True)

dir_path = os.path.dirname(os.path.realpath(__file__))
print(dir_path)

os.rename(dir_path + "/out/index/index.html", dir_path + "/out/index.html")
os.rmdir(dir_path + "/out/index")