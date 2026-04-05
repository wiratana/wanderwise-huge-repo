import os
from bs4 import BeautifulSoup
import requests
from mongoengine import connect, Document, StringField, GeoPointField, IntField
from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.firefox.service import Service

load_dotenv()

# service = Service(executable_path='D:\Services\geckodriver-v0.33.0-win64\geckodriver.exe')
# driver = webdriver.Firefox(service=service)

class City(Document):
  name = StringField(required=True)
  province = StringField(required=True)
  country = StringField(required=True)
  population = IntField(required=True)
  coordinates = GeoPointField(required=True)
  

def wikiScrapper():
    html_content = requests.get('https://id.wikipedia.org/wiki/Daftar_kabupaten_dan_kota_di_Bali')
    soup = BeautifulSoup(html_content.content, 'html.parser')
    table = soup.find('table', class_="wikitable")
    tbody = table.find('tbody')
    
    listOfDetailOfCity = []
    for row in tbody:
        row = list(row)
        if len(row) <= 1:
            continue
        
        linkToDetailOfCity = row[3]
        listOfDetailOfCity.append(linkToDetailOfCity)

    for row in listOfDetailOfCity[1:]:
        html_content = requests.get("https://id.wikipedia.org" + row.a["href"])
        
        print("\n")
        print("get link ========> {}".format("https://id.wikipedia.org" + row.a["href"]))
        
        soup = BeautifulSoup(html_content.content, 'html.parser')
        
        cityName = soup.find('span', class_="mw-page-title-main")
        cityName = cityName.get_text(strip=True)
        cityName = cityName.replace("Kabupaten", "").replace("Kota", "").strip()
        
        targetThTexts = ['Negara', 'Provinsi']
        resultDict = {}
        
        for targetThText in targetThTexts:
            targetTh = soup.find('th', string=targetThText)

            if targetTh:
                columnData = targetTh.find_next('td')

                resultDict[targetThText] = columnData.get_text(strip=True) if columnData else None


        matchingOtherThElements = []
        for thElement in soup.find_all('th', class_='infobox-header'):
            if "Populasi" in thElement.get_text(strip=True):
                matchingOtherThElements.append(thElement)

        for matchingElement in matchingOtherThElements:
            nextTr = matchingElement.find_next('tr')
            thOfTotal = nextTr.find('th')
            tdOfTotal = nextTr.find('td')
            
            if tdOfTotal:
                th_total = thOfTotal.get_text(strip=True)[2:]
                integer_total = int(''.join(filter(str.isdigit, tdOfTotal.get_text(strip=True))))
                resultDict[th_total] = integer_total

        coordinates = {}
        for trElement in soup.find_all('tr', class_='mergedbottomrow'):
            external_link = trElement.find('a', class_='external')
            if external_link:
                href_value = external_link.get('href')
                
                html_content = requests.get("https:" + href_value)
                soup = BeautifulSoup(html_content.content, 'html.parser')
                
                geoHref = soup.find('a', class_='external free')
                geo = geoHref.get('href')[4:]
                latitude, longitude = map(float, geo.split(','))
                
                coordinates['latitude'] = latitude
                coordinates['longitude'] = longitude
        
        new_city = City(
             name=cityName,
             province=resultDict['Provinsi'],
             country=resultDict['Negara'], 
             population=resultDict['Total'], 
             coordinates=[coordinates['latitude'], coordinates['longitude']]
             )
        
        # new_city.save()
        
        # print(resultDict)
        # print(coordinates)
  

def main():
    connect(db=os.getenv("DB_NAME"),host=os.getenv("DB_URI"))
    wikiScrapper()
    # driver.quit()
    
    
if __name__ == "__main__":
    main()
