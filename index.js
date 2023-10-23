const express = require('express');
const mongodb = require('mongodb')
const User = require('./Models/UserModels');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const cors = require('cors');
const corsOpt={
    origin:'*',
    optionsSucessStatus: 200
}

const jwt = require('jsonwebtoken');
const isAuthenticated = require('./Models/Authorized');


const connstring = 'mongodb+srv://Admin:LV0mHpYmKtHTajGR@cluster0.fw6znqm.mongodb.net/';
const MongoClient = mongodb.MongoClient;

const app = express();
app.use(cors(corsOpt));

const saltRound = 10;

mongoose.connect(connstring, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');

        app.use(express.json());

        app.post('/register',cors(corsOpt), (req, res) => {
            bcrypt.hash(req.body.password, saltRound)
            .then((hash) => {
                const user = new User({
                    name: req.body.name,
                    surname: req.body.surname,
                    emailAddress: req.body.emailAddress,
                    username: req.body.username,
                    password: hash
                })
                user.save()
                .then((result) => {
                    res.status(200).json({message:'User saved successfully'})
                }).catch(
                    (error) => {res.status(500).json({error: 'Failed to save'})
                })
            });

            app.get('/viewusers',isAuthenticated, (req, res) => {
                User.find()
                .then((newUser) => {
                    if (newUser.length === 0) {
                        // Handle the case where no tasks were found
                        return res.status(404).json({ message: 'No Users found' });
                    }
        
                    res.json({
                        message: 'Users found',
                        newUser: newUser
                    });
                })
                .catch((error) => {
                    console.error(error);
                    res.status(500).json({ error: 'Internal Server Error' });
                });  

            });
            
            
            app.post('/login', (req,res) =>
            {
                const { username, password } = req.body;
                User.findOne({ username: username })
                .then(user => {
                    if (!user) {
                        return res.status(404).json({ message: 'User not found' });
                    }
                    bcrypt.compare(password, user.password)
                    .then(match => {
                        const token = jwt.sign({username: user.username,userid: user.id}
                            ,'ThisWillBeTheStringWeUseForAuthentication',{expiresIn: '2h'});
                        if (match) {
                            res.status(200).json({ message: 'Hello '+user.name+' '+user.surname+', Authenticated successfully' });
                        } else {
                            res.status(404).json({ message: 'Failed to authenticate' });
                        }
                    })
                    .catch(err => {
                        res.status(500).json({ error: 'Error comparing passwords' });
                    });
            })
            .catch(err => {
                res.status(500).json({ error: 'Error finding user' });
            });
            })

    })
})
    .catch(error => {
        console.error("Error connecting to MongoDB:", error);
       });
       
module.exports = app;