const saTemp = `Argentina,
Bolivia,
Brazil,
Chile,
Colombia,
Ecuador,
Guyana,
Paraguay,
Peru,
Suriname,
Uruguay,
Venezuela`;

const naTemp = `Antigua and Barbuda,
Bahamas,
Barbados,
Belize,
Bermuda,
Canada,
Costa Rica,
Cuba,
Dominica,
Dominican Republic,
El Salvador,
Grenada,
Guatemala,
Haiti,
Honduras,
Jamaica,
Mexico,
Nicaragua,
Panama,
St. Kitts and Nevis,
St. Lucia,
St. Vincent and The Grenadines,
Trinidad and Tobago,
USA`;

const europeTemp = `Albania,
Andorra,
Austria,
Belarus,
Belgium,
Bosnia and Herzegovina,
Bulgaria,
Croatia,
Czech Republic,
Denmark,
Estonia,
Finland,
France,
Germany,
Greece,
Hungary,
Iceland,
Ireland,
Italy,
Latvia,
Liechtenstein,
Lithuania,
Luxembourg,
Malta,
Moldova,
Monaco,
Netherlands,
Norway,
Poland,
Portugal,
Romania,
Russia,
San Marino,
Serbia and Montenegro,
Slovakia,
Slovenia,
Spain,
Sweden,
Switzerland,
Ukraine,
United Kingdom`;

const africaTemp = `Algeria,
Angola,
Benin,
Botswana,
Burkina Faso,
Burundi,
Cameroon,
Cape Verde,
Central African Republic,
Chad,
Comoros,
Congo,
Cote Ivoire,
Djibouti,
Egypt,
Equatorial Guinea,
Eritrea,
Ethiopia,
Gabon,
Gambia,
Ghana,
Guinea,
Guinea-Bissau,
Kenya,
Lesotho,
Liberia,
Libya,
Madagascar,
Malawi,
Mali,
Mauritania,
Mauritius,
Morocco,
Mozambique,
Namibia,
Niger,
Nigeria,
Rwanda,
Sao Tome and Principe,
Senegal,
Seychelles,
Sierra Leone,
Somalia,
South Africa,
Sudan,
Swaziland,
Tanzania,
Togo,
Tunisia,
Uganda,
Zambia,
Zimbabwe`;

const asiaTemp = `Afghanistan,
Bahrain,
Bangladesh,
Bhutan,
Brunei,
Burma,
Cambodia,
China,
East Timor,
India,
Indonesia,
Iran,
Iraq,
Israel,
Japan,
Jordan,
Kazakhstan,
Republic of Korea,
Kuwait,
Kyrgyzstan,
Laos,
Lebanon,
Malaysia,
Maldives,
Mongolia,
Nepal,
Oman,
Pakistan,
Philippines,
Qatar,
Russian Federation,
Saudi Arabia,
Singapore,
Sri Lanka,
Syria,
Tajikistan,
Thailand,
Turkey,
Turkmenistan,
United Arab Emirates,
Uzbekistan,
Vietnam,
Yemen`;

// Creatng variables holding countries of the continents
const europe = europeTemp.split(',\n');
const southAmerica = saTemp.split(',\n');
const northAmerica = naTemp.split(',\n');
const africa = africaTemp.split(',\n');
const asia = asiaTemp.split(',\n');

//Continent variable with continent names wich will be used to calculate the Cumulative 
//Population and GDP and parse it to the Continent JSON
const continent = [{ Continent: 'Asia' }, { Continent: 'Africa' }, { Continent: 'South America' }, { Continent: 'North America' }, { Continent: 'Europe' }, { Continent: 'Australia' }];

// Creating variables for storing Population JSON, GDP Json and Purchase Power JSON
const pop13Data = [];
const gdp13Data = [];
const ppp13Data = [];

// Reading CSV File
const fs = require('fs');

const filePath = './country_details.csv';

fs.readFile(filePath, 'utf8', (err, data) => { // read the CSV file
  if (err) throw err;
  const rawData = String(data).split('\n'); // Getting the array of lines
  const attributes = rawData[0].split(','); // Getting the headers
  let cont = ''; // temp variable to store the continent value for each row

  for (let i = 1; i < rawData.length - 2; i += 1) {
    const pop13 = {};
    const gdp13 = {};
    const ppp13 = {};

    const obj = {};   //flag to find the continent of the current line
    const currentline = rawData[i].split(',');

    //Finding the Continent of the current line based on the countries names
    for (let j = 0; j < attributes.length; j += 1) {
      obj[attributes[j]] = currentline[j];
    }
    for (let cntTemp = 0; cntTemp < asia.length; cntTemp += 1) {
      if (obj.Country === asia[cntTemp]) {
        cont = 'Asia';
      }
    }
    for (let cntTemp = 0; cntTemp < europe.length; cntTemp += 1) {
      if (obj.Country === europe[cntTemp]) {
        cont = 'Europe';
      }
    }
    for (let cntTemp = 0; cntTemp < africa.length; cntTemp += 1) {
      if (obj.Country === africa[cntTemp]) {
        cont = 'Africa';
      }
    }
    for (let cntTemp = 0; cntTemp < southAmerica.length; cntTemp += 1) {
      if (obj.Country === southAmerica[cntTemp]) {
        cont = 'South America';
      }
    }
    for (let cntTemp = 0; cntTemp < northAmerica.length; cntTemp += 1) {
      if (obj.Country === northAmerica[cntTemp]) {
        cont = 'North America';
      }
    }

    //Mapping the found obj based on the continent value found and 
    //the continent value stored in the continent variable
    if (cont === 'Asia') {
      continent.forEach((temp) => {
        if (temp.Continent === 'Asia') {
          if (temp.Population2013) {
            temp.Population2013 += Number(obj.Population2013);
          } else {
            temp.Population2013 = Number(obj.Population2013);
          }
          if (temp.GDP2013) {
            temp.GDP2013 += Number(obj.GDP2013);
          } else {
            temp.GDP2013 = Number(obj.GDP2013);
          }
        }
      });
    }
    if (cont === 'Europe') {
      continent.forEach((temp) => {
        if (temp.Continent === 'Europe') {
          if (temp.Population2013) {
            temp.Population2013 += Number(obj.Population2013);
          } else {
            temp.Population2013 = Number(obj.Population2013);
          }
          if (temp.GDP2013) {
            temp.GDP2013 += Number(obj.GDP2013);
          } else {
            temp.GDP2013 = Number(obj.GDP2013);
          }
        }
      });
    }
    if (cont === 'Africa') {
      continent.forEach((temp) => {
        if (temp.Continent === 'Africa') {
          if (temp.Population2013) {
            temp.Population2013 += Number(obj.Population2013);
          } else {
            temp.Population2013 = Number(obj.Population2013);
          }
          if (temp.GDP2013) {
            temp.GDP2013 += Number(obj.GDP2013);
          } else {
            temp.GDP2013 = Number(obj.GDP2013);
          }
        }
      });
    }
    if (cont === 'South America') {
      continent.forEach((temp) => {
        if (temp.Continent === 'South America') {
          if (temp.Population2013) {
            temp.Population2013 += Number(obj.Population2013);
          } else {
            temp.Population2013 = Number(obj.Population2013);
          }
          if (temp.GDP2013) {
            temp.GDP2013 += Number(obj.GDP2013);
          } else {
            temp.GDP2013 = Number(obj.GDP2013);
          }
        }
      });
    }
    if (cont === 'North America') {
      continent.forEach((temp) => {
        if (temp.Continent === 'North America') {
          if (temp.Population2013) {
            temp.Population2013 += Number(obj.Population2013);
          } else {
            temp.Population2013 = Number(obj.Population2013);
          }
          if (temp.GDP2013) {
            temp.GDP2013 += Number(obj.GDP2013);
          } else {
            temp.GDP2013 = Number(obj.GDP2013);
          }
        }
      });
    }
    if (obj.Country === 'Australia') {
      continent.forEach((temp) => {
        if (temp.Continent === 'Australia') {
          if (temp.Population2013) {
            temp.Population2013 += Number(obj.Population2013);
          } else {
            temp.Population2013 = Number(obj.Population2013);
          }
          if (temp.GDP2013) {
            temp.GDP2013 += Number(obj.GDP2013);
          } else {
            temp.GDP2013 = Number(obj.GDP2013);
          }
        }
      });
    }

//Populating the Population, GDP and Purchase Power arrays with corresponding values
    pop13.Country = obj.Country;
    gdp13.Country = obj.Country;
    ppp13.Country = obj.Country;

    pop13.Population2013 = obj.Population2013;
    gdp13.GDP2013 = obj.GDP2013;
    ppp13.PPP2013 = obj.PPP2013;

    pop13Data.push(pop13);
    gdp13Data.push(gdp13);
    ppp13Data.push(ppp13);
  }

  pop13Data.sort((a, b) => b.Population2013 - a.Population2013);
  gdp13Data.sort((a, b) => b.GDP2013 - a.GDP2013);
  ppp13Data.sort((a, b) => b.PPP2013 - a.PPP2013);

  // Writing the files to the JSON files

  fs.writeFile('../data/pop2013.json', JSON.stringify(pop13Data), (err0) => {
    if (err) throw err0;
  });

  fs.writeFile('../data/gdp2013.json', JSON.stringify(gdp13Data), (err1) => {
    if (err) throw err1;
  });

  fs.writeFile('../data/ppp2013.json', JSON.stringify(ppp13Data), (err2) => {
    if (err) throw err2;
  });

  fs.writeFile('../data/continent2013.json', JSON.stringify(continent), (err3) => {
    if (err) throw err3;
  });
});

