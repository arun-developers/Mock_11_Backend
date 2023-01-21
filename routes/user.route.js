const express = require('express');
const bcrypt = require('bcrypt');
const { UserModal } = require('../modals/user.modal');
const jwt = require('jsonwebtoken');
const UserRouter = express.Router();

UserRouter.get("/", async (req, res) => {
    let data = await UserModal.find({});
    res.status(200).json(data);
})

UserRouter.post("/signup", async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;
    const userPresent = await UserModal.findOne({ email })
    if (userPresent?.email) {
        res.send("Try loggin in, already exist")
    }
    else {
        try {
            bcrypt.hash(password, 4, async function (err, hash) {
                const user = new UserModal({ email, password: hash })
                await user.save()
                res.send("Sign up successfull")
            });

        }
        catch (err) {
            console.log(err)
            res.send("Something went wrong, pls try again later")
        }
    }

})
UserRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModal.find({ email })

        if (user.length > 0) {
            const hashed_password = user[0].password;
            bcrypt.compare(password, hashed_password, function (err, result) {
                if (result) {
                    const token = jwt.sign({ "userID": user[0]._id }, 'hush');
                    res.send({ "msg": "Login successfull", "token": token })
                }
                else {
                    res.send("Login failed")
                }
            })
        }
        else {
            res.send("Login failed")
        }
    }
    catch {
        res.send("Something went wrong, please try again later")
    }
})

module.exports = { UserRouter };