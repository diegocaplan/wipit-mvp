const router = require("express").Router();
const { User } = require("../db");

const updateUser = async function (req, res){
    const {userName , param, value} = req.body;
    try {
        if(param){
            let response = await User.findByPk(userName);
            if(response){
            response[param] = value;
            await response.save()
            return res.json(response)
        }
        return res.json({msg:"error al encontrar usuario"})
        }
    } catch (error) {
       return res.status(400).send(error.message);
    }
}

module.exports = {
    updateUser
}