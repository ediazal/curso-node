// Import libraries

const moment = require('moment');
const http = require('http');
const fs = require('fs');

// Define constants

const host = "localhost";
const port = 8080;

const log = (endpoint) => {
    let date = moment().format('DD-MM-YYYY HH:mm:ss');
    let logLine = date + ' - ' + endpoint + '\n';
    fs.appendFile('requests.log', logLine, (err) => {
        if (err) throw err;
      });
}

// Create server
const server = http.createServer( (request, response) => {
    console.log(request.url);
    log(request.url);
    if (request.url === '/'){
        // http headers
        response.writeHead(200, {
            'Content-Type':'text/html; charset=utf-8'
        });
        // http body
        response.write("<h1>¡Ya sé Node!</h1>");
        // send http message
        response.end();
    }
    else if (request.url === '/hw'){
        // http headers
        response.writeHead(200, {
            'Content-Type':'text/html'
        });
        // http body
        response.write('<p style="color: orange">Happy Halloween!</p>');
        // send http message
        response.end();
    }

    else if (request.url === '/myjson'){
        // http headers
        response.writeHead(200, {
            'Content-Type':'application/json'
        });
        // http body

        const respuesta = { 
            "nombre": "Espagueti", 
            "apellido": "Volador" 
        }

        response.write(JSON.stringify(respuesta));
        // send http message
        response.end();
    }

    else if (request.url === '/timenow'){
        // http headers
        response.writeHead(200, {
            'Content-Type':'text/plain'
        });
        // http body
        const ahora = moment().format('h:mm:ss a');
        response.write(ahora);
        // send http message
        response.end();
    }

    else if (request.url === "/web") {
        fs.readFile('front/index.html', (error, data) => {

            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();

        });
    }
    else if (request.url === "/styles") {
        fs.readFile('front/css/style.css', (error, data) => {

            response.writeHead(200, { 'Content-Type': 'text/css' });
            response.write(data);
            response.end();

        });
    }

    else if (request.url === "/img"){
        fs.readFile('front/img/nodejs.jpg', (error, data) =>{
            response.writeHead(200, { 'Content-Type': '	image/jpg' });
            response.write(data);
            response.end();
        });
    }
    /*
    Si se hace una petición a algún sitio que no sea ninguno de los anteriores...
    Entonces devolver un 404 y el mensaje:
    "Estos no son los androides que buscas"
    */
    else {
        // http headers
        response.writeHead(404, {
            'Content-Type':'text/plain'
        });
        // http body
        response.write('Estos no son los androides que buscas');
        // send http message
        response.end();
    }
});

// Start server
server.listen(port, host, () =>{
    console.log(`Server is running on http://${host}:${port}`);
});