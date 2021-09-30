// ----- Import libraries -----

const express = require('express');
const nodemailer = require('nodemailer'); 

// ----- Define constants -----
//    (Configuración inicial)

const server = express();
const port = 8080;

// Folder with my frontend
const frontFolder = express.static(__dirname + '/front');
server.use(frontFolder);

// JSON support
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Endpoints

server.get('/', (req, res) => {
    res.send("<h1>Un mensaje de texto</h1>");
});

server.get('/myjson', (req, res) => {

    // JSON response
    const respuesta = {
        "nombre": "Espagueti",
        "apellido": "Volador",
        "habilidades": ["Node", "Mongo"],
        "vacaciones": {
            "lugar1": "Benidorm",
            "lugar2": "Groenlandia"
        }
    }

    res.send(respuesta);
});

server.get('correo', (req, res)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'myemail@gmail.com',
          pass: 'mypass'
        }
      });
      
      var mailOptions = {
        from: 'js3mail@gmail.com',
        to: 'davidcarvajalg@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'Un saludo, Eloy'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.send("Correo enviado con exito");
        }
      });
});

server.use((req, res) => res.status(404).send('Estos no son los androides que buscas'));

// ----- Start server -----

server.listen(port,
    () => console.log(`Server started listening on ${port}`)
);