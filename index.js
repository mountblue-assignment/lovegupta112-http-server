const fs = require('fs').promises;
const http = require('http');
const uuid = require('uuid');

const port = 8000;
const host = 'localhost';

let indexFile;
let jsonData;

const requestListener = function (req, res) {
  const url = req.url;

  //for GET /html -------
  if (req.method === 'GET' && url === '/html') {
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.end(indexFile);
  } else if (req.method === 'GET' && url === '/json') {
    //for GET /json -------
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(jsonData);
  } else if (req.method === 'GET' && url === '/uuid') {
    //for GET /uuid -------
    const generateUuid = { uuid: uuid.v4() };
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(generateUuid));
  } else if (req.method === 'GET' && url.split('/').length === 3) {
    const urlPartsArr = req.url.split('/');
    const num = parseInt(urlPartsArr[2]);

    if (urlPartsArr[1] === 'status' && !isNaN(num)) {
      //for GET /status/{status_code}-------
      res.setHeader('Content-Type', 'text/plain');
      res.writeHead(num);
      res.end(`Response with status code ${num}`);
      return;
    } else if (urlPartsArr[1] === 'delay' && !isNaN(num)) {
      //forGET /delay/{delay_in_seconds}  -------
      res.setHeader('Content-Type', 'text/plain');
      res.writeHead(200);
      setTimeout(() => {
        res.end(`After ${num} sec \n Response with status code 200 !`);
      }, num * 1000);
    }
  } else {
    res.setHeader('Content-Type', 'text/plain');
    res.writeHead(404);
    res.end('Not found !');
  }
};

const server = http.createServer(requestListener);

async function startServer() {
  try {
    //we will load the Html content and json from index.html and sample.json respectively
    //and save the html content , json  to our global  variable indexFile and  jsonData  respectively

    indexFile = await fs.readFile(__dirname + '/index.html', 'utf-8');
    jsonData = await fs.readFile(__dirname + '/sample.json', 'utf-8');

    //we will start our server -----
    server.listen(port, host, () => {
      console.log(`Server is running on http://${host}:${port}`);
    });
  } catch (error) {
    console.error('Error: ', error);
    process.exit(1); //terminating process synchronously -------
  }
}

startServer();
