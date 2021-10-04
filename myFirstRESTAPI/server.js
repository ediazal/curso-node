// ----- Import libraries -----

const express = require('express');

let characters = [
    {
      "id": 1,
      "username": "Leela",
      "role": "Capitana"
    },
    {
      "id": 2,
      "username": "Fry",
      "role": "Está ahí"
    },
    {
      "id": 3,
      "username": "Zoidberg",
      "role": "Médico"
    },
    {
      "id": 4,
      "username": "Amy",
      "role": "Científica"
    }
  ];

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

// ----- Endpoints -----

server.get('/', (req, res)=>{
    res.send("Hello");
});

server.get('/characters', (req, res) => {
    res.send(characters);
});

server.get('/character', (req, res) => {
    const name = req.query.name;
    for (let i = 0; i < characters.length; i++) {
        const c = characters[i];
        if (c.username === name){
            res.send(c);
            break;
        }
    }
});

server.get('/charactersByProfile', (req, res)=>{
    const profile = req.query.profile;
    for (let i = 0; i < characters.length; i++) {
        const c = characters[i];
        if (c.role === profile){
            res.send(c);
            break;
        }
    }
});

server.post('/newCharacter', (req, res)=>{
    const id = req.body.id;
    const username = req.body.username;
    const role = req.body.role;

    let newCharacter = {
        "id": id,
        "username": username,
        "role": role
    };
    characters.push(newCharacter);
    res.redirect('/');
});

server.put('/updateCharacter', (req, res)=>{
    const updateId = req.query.id;
    const username = req.body.username;
    const role = req.body.role;
    for (let i = 0; i < characters.length; i++) {
        let c = characters[i];
        if (c.id === updateId){
            characters[i].username = username;
            characters[i].role = role;
            break;
        }
    }
    res.redirect('/');
});

server.delete('/deleteCharacter',(req, res)=>{
    const deleteId = req.query.id;
    for (let i = 0; i < characters.length; i++) {
        let c = characters[i];
        if (c.id == deleteId){
            characters.splice(i, 1);
            break;
        }
    }
    res.redirect('/');
});


server.use((req, res) => res.status(404).send('Estos no son los androides que buscas'));

// ----- Start server -----

server.listen(port,
    () => console.log(`Server started listening on ${port}`)
);