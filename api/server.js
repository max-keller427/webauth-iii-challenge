const express = require('express');

const server = express();
const bcrypt = require('bcryptjs')
const db = require('../api/userModel.js')
const jwt = require('jsonwebtoken')
const restricted = require('./restricted.js')
const secrets = require('./secrets.js')

server.use(express.json());

function generateToken(user) {
    return jwt.sign({
        userId: user.id,
        userRole: user.department,
    }, secrets.jwt, {
        expiresIn: '1h'
    })
}

server.get('/', (req, res) => {
  res.send("It's alive!");
});

server.get('/api/users', restricted, (req, res) => {
    db.find()
    .then(users => {
        res.json(users)
    })
    .catch(err => 
        res.send(err))
})

server.post('/api/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;

    db.add(user)
    .then(newUser => {
        const token = generateToken(newUser)
        console.log(token)

        res.status(201).json(token)
    })
    .catch(err => {
        res.status(500).json({message: 'Could not register new user, please try again'})
    })
})

server.post('/api/login', (req, res) => {
    let { username, password} = req.body

    db.findBy({username})
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user)

            res.status(201).json({message: `Welcome ${user.username}`,
            authToken: token,
        })
        } else {
            res.status(401).json({ message: 'Invalid Credentials'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Error Loggin in'})
    })
})



module.exports = server;