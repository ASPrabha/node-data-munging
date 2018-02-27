
// Continent variable with continent names wich will be used to calculate the Cumulative
// Population and GDP and parse it to the Continent JSON
const continent = [{ Continent: 'Asia' }, { Continent: 'Africa' }, { Continent: 'South America' }, { Continent: 'North America' }, { Continent: 'Europe' }, { Continent: 'Australia' }];

// Creating variables for storing Population JSON, GDP Json and Purchase Power JSON
const pop13Data = [];
const gdp13Data = [];
const ppp13Data = [];

let countrydetails = {};

// Reading CSV File
const fs = require('fs');
const mkdirp = require('mkdirp');

// File path of Country and Continent JSOn file
const jsonFilePath = './js/country_data.json';

// FIle path of input CSV file
const filePath = './js/country_details.csv';

// Reading and storing the Country and Continent details from the JSOn file
fs.readFile(jsonFilePath, 'utf8', (er, data) => {
  if (er) throw er;
  countrydetails = JSON.parse(data);
});

fs.readFile(filePath, 'utf8', (err, data) => { // read the CSV file
  if (err) throw err;
  const rawData = String(data).split('\n'); // Getting the array of lines
  const headers = rawData[0].split(','); // Getting the headers

  for (let i = 1; i < rawData.length - 2; i += 1) {
    const pop13 = {};
    const gdp13 = {};
    const ppp13 = {};

    const obj = {}; // flag to find the continent of the current line
    const currentline = rawData[i].split(',');

    // Storing the header elements in the Headers array
    for (let j = 0; j < headers.length; j += 1) {
      obj[headers[j]] = currentline[j];
    }

    // Finding the Continent of the current line based on the countries names
    for (let k = 0; k < continent.length; k += 1) {
      const temp = continent[k];
      if (temp.Continent === countrydetails[obj.Country]) {
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
    }

    // Populating the Population, GDP and Purchase Power arrays with corresponding values
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


  mkdirp('./data', (error) => {
    if (error) throw error;
    // Writing the files to the JSON files

    fs.writeFile('./data/pop2013.json', JSON.stringify(pop13Data), (err0) => {
      if (err0) throw err0;
    });

    fs.writeFile('./data/gdp2013.json', JSON.stringify(gdp13Data), (err1) => {
      if (err1) throw err1;
    });

    fs.writeFile('./data/ppp2013.json', JSON.stringify(ppp13Data), (err2) => {
      if (err2) throw err2;
    });

    fs.writeFile('./data/continent2013.json', JSON.stringify(continent), (err3) => {
      if (err3) throw err3;
    });
  });
});

