const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const secrets = require('./secrets.js')
const db = require('./userModel.js')

module.exports = (req, res, next) => {
    
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, secrets.jwt, (err, payload) => {
            if (err) {
                res.status(403).json({message: 'Not Authorized'})
            } else {
                req.userID = payload.userID
                next()
            }
        })
    } else {
        res.status(400).json({message: "Please Log in to view users"})
    }
}