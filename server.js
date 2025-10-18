const http = require('http');
const fs = require('fs');
const url = require('url');
const figlet = require('figlet');

function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}

const server = http.createServer(function (req, res) {
  const parsedUrl = url.parse(req.url, true);
  const page = parsedUrl.pathname;
  const query = parsedUrl.query;
  console.log(page);

  if (page === '/') {
    fs.readFile('index.html', function (err, data) {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error loading index.html');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } 
  
else if (page === '/api') {
  const word = query.word;

  if (!word) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('err');
    return;
  }

  const result = isPalindrome(word);

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(result.toString());
}


  
  else if (page === '/style.css') {
    fs.readFile('style.css', function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end('CSS not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(data);
    });
  } 
  
  else if (page === '/main.js') {
    fs.readFile('main.js', function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end('JS not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.end(data);
    });
  } 
  
  else {
    figlet('404!!', function (err, data) {
      if (err) {
        console.log('Something went wrong...', err);
        res.writeHead(500);
        res.end();
        return;
      }
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(data);
    });
  }
});

server.listen(8000);
