const express = require('express');

const server = express();
const bcrypt = require('bcryptjs')
const db = require('../api/userModel.js')
const jwt = require('jsonwebtoken')

server.use(express.json());

server.get('/', (req, res) => {
  res.send("It's alive!");
});

server.post('/api/register', (req, res) => {
    let user = req.body
    const hash = bcrypt.hashSynch(user.password, 12)
    user.password = hash

    db.add(user)
    .then(newUser => {
        const token = generateToken(newUser)

        res.status(201).json({
            message: `Welcome ${newUser.username}`,
            authToken: token
        })
    })
    .catch(err => {
        res.status(500).json({message: 'Could not register new user, please try again'})
    })
})

server.post('/login', (req, res) => {
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

function generateToken(user) {
    return jwt.sign({
        userId: user.id,
        userRole: user.department,
    }, secrets.jwt, {
        expiresIn: '1h'
    })
}

module.exports = server;