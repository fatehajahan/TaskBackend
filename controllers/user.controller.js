const userSchema = require("../models/user.model")
const emailValidation = require("../utils/email.validator")
const bcrypt = require('bcrypt');

async function userCtrl(req, res) {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.json({ message: "fields required!!" })
    }
    if (!emailValidation(email)) {
        return res.json({ error: 'email is not valid' })
    }

    const exsistingEmail = await userSchema.find({ email })
    if (exsistingEmail.length > 0) {
        return res.status(409).json({ message: 'Email is already registered. Please use a different email.' })
    }

    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            return res.json({ error: 'error in hashing password' })
        }

        const users = new userSchema({
            name: name,
            email: email,
            password: hash,
        })
        users.save()
            .then(() => res.json({ message: "user added successfully" }))
            .catch(err => res.json({ error: 'error saving user' }));
    })
}

async function login(req, res) {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required!" })
        }

        if (!emailValidation(email)) {
            return res.status(400).json({ message: 'Please enter a valid email address' })
        }

        const user = await userSchema.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }

        // SUCCESS
        res.status(200).json({
            message: 'Login successful!',
            status: 'success',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        })

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            message: 'Internal server error. Please try again.',
            status: 'error'
        });
    }
}

async function allUserListsCtrl(req, res) {
    try {
        const allusers = await userSchema.find({})
        res.status(200).json({
            message: "get all users",
            statues: "success",
            data: allusers
        })
    } catch (error) {
        res.status(400).json({ error: "internal server error", statues: "failed" })
    }
}
module.exports = { userCtrl, login, allUserListsCtrl }