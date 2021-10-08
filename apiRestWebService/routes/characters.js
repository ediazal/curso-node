const express = require('express');
const router = express.Router();
require('dotenv').config();

// ----- Database -----

const MongoClient = require('mongodb').MongoClient;
const urlDatabase = process.env.MONGODB;

router.get('/', (request, response) => {
    try {
        MongoClient.connect(urlDatabase, (error, database) => {
            const dbo = database.db("db-node"); // use halloweendb

            try {
                dbo
                    .collection("characters")
                    .find({})
                    .toArray((error2, result) => {
                        response.send(result);
                        database.close();
                    });
            }
            catch(error2) {
                console.log(error2);
                database.close();
            }
        });
    }
    catch(error) {
        console.log(error);
    }
});

router.get('/:name', (request, response) => {
    const charName = request.params.name;
    try {
        MongoClient.connect(urlDatabase, (error, database) => {
            const dbo = database.db("db-node");

            try {
                dbo
                    .collection("characters")
                    .findOne({name:charName}, (error2, result) => {
                        response.send(result);
                        database.close();
                    });
            }
            catch(error2) {
                console.log(error2);
                database.close();
            }
        });
    }
    catch(error) {
        console.log(error);
    }
});

router.get('/profile/:profile', (request, response) => {
    const role = request.params.profile;
    try {
        MongoClient.connect(urlDatabase, (error, database) => {
            const dbo = database.db("db-node");

            try {
                dbo
                    .collection("characters")
                    .findOne({role:role}, (error2, result) => {
                        response.send(result);
                        database.close();
                    });
            }
            catch(error2) {
                console.log(error2);
                database.close();
            }
        });
    }
    catch(error) {
        console.log(error);
    }
});

router.post('/new', (request, response) => {
    const newChar = request.body;
    try {
        MongoClient.connect(urlDatabase, (error, database) => {
            const dbo = database.db("db-node");

            try {
                dbo
                    .collection("characters")
                    .insertOne(newChar, (error2, result) => {
                        response.send(result);
                        database.close();
                    });
            }
            catch(error2) {
                console.log(error2);
                database.close();
            }
        });
    }
    catch(error) {
        console.log(error);
    }

});

router.put('/update/:id', (request, response) => {
    const datos = request.body;
    const charId = request.params.id;
    try {
        MongoClient.connect(urlDatabase, (error, database) => {
            const dbo = database.db("db-node");

            try {
                const newValues = {$set: {name: datos.name, role: datos.role}};
                dbo
                    .collection("characters")
                    .updateOne({_id: parseInt(charId)}, newValues,  (error2, result) => {
                        response.send(result);
                        database.close();
                    });
            }
            catch(error2) {
                console.log(error2);
                database.close();
            }
        });
    }
    catch(error) {
        console.log(error);
    }
});

router.delete('/delete/:id', (request, response) => {
    const id = request.params.id;
    try {
        MongoClient.connect(urlDatabase, (error, database) => {
            const dbo = database.db("db-node");

            try {
            
                dbo
                    .collection("characters")
                    .deleteOne({_id: parseInt(id)}, (error2, result) => {
                        response.send(result);
                        database.close();
                    });
            }
            catch(error2) {
                console.log(error2);
                database.close();
            }
        });
    }
    catch(error) {
        console.log(error);
    }
});

module.exports = router;