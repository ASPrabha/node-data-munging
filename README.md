# node-data-munging
Using Node JS to convert CSV file to JSON and map graph out of the generated JSON data

CSV to JSON Conversion:

Input: Get the CSV file from http://172.23.238.252/csv_files/.  Download the country_details.csv. Place your CSV(.csv) file inside the /JS folder.  

Output: The Converted JSON files (i.e. pop2013.json for Popularion graph, gdp2013.json for GDP graph, ppp2013.json for the Purchasing Power of Populaiton graph and the continent2013.json for the Aggregate Continent Populaiton and GDP graph) will be created and will be plased inside the /data folder.

Changes: To change the name of the file in the input code, give your modified file name along with the filepath as input to the variable filePath in the /js/dp_country.js file(line:195).

Use the 'npm run' command to get the run-scripts available.

Use the npm run-script generate' commane to generate the desired output

Use the npm run-script lint' for ES linting


Plotting the Graph:

To view the graph plotted by the generated JSON run the index.html file in the http-server using 'npm start' command.
