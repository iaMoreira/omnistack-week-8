const axios = require('axios');
const Dev = require('../models/Dev')
module.exports = {
    async index(req, res){
        const {user} = req.headers;

        const loggedDev = await Dev.findById(user);

        const users = await Dev.find({
            $and : [
                { _id: {$ne: user}},
                { _id: {$nin: loggedDev.likes} },
                { _id: {$nin: loggedDev.dislikes}},
            ],
        });

        return res.json(users);
    },
    async store(req, res){
        const {username} = req.body;
        console.log( req.body.username)
        const userExists = await Dev.findOne({user: username});
        if(userExists){
            return res.json(userExists);
        }
        const response = await axios.get(`https://api.github.com/users/${username}`)
        var {name, bio, avatar_url: avatar}= response.data; 
        if(name == null){
            name = 'Ian Andrade Moreira'
        }
        // console.log(response.data)
        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        })
    console.log(dev)
        return res.json(dev);
    }
}; 