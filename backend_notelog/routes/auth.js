const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User')
const fetchUser = require('../middleware/fetchUser')
require('dotenv/config');


const JWT_SECRET = process.env.JWT_SECRET;


/*----------------------------------------Route 1----------------------------------------*/

//Create a user using:POST endpoint "/api/auth/createUser".

router.post('/createUser', [body('name', 'Enter a valid name').isLength({ min: 3 }), body('email', 'Enter a valid email').isEmail(), body('password', 'Password must be 5 digits').isLength({ min: 5 })], async (req, res) => {
    let success=false
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    try {

        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({success, error: "email already exit" })
        }

        const salt = bcrypt.genSaltSync(10);
        const securePassword = bcrypt.hashSync(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePassword
        })

        const data = {
            user: { id: user.id }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success=true
        res.json({success, authToken });

    } catch (error) {
        res.status(500).send("Internal server error")
    }
});





/*----------------------------------------Route 2----------------------------------------*/

//login  a user using:POST endpoint "/api/auth/login".
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blank').exists()], async (req, res) => {

        let success=false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array() });
        }
        try {
            const { email, password } = req.body;

            let user = await User.findOne({email});
            if (!user) {
                return res.status(400).json({success, error: "Enter correct credentials" });
            }

            let passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({success, error: "Enter correct credentials" });
            }

            const data = {
                user: { id: user.id }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
         
            success=true;
            res.json({success, authToken });


        } catch (error) {
          
            res.status(500).send("Internal server error")
        }
    })



/*----------------------------------------Route 3----------------------------------------*/

//Get loggedin user details uing :POST "/api/auth/getuser".

router.post('/getuser', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.json(user)
    } catch (error) {
        res.status(500).send("Internal server error")
    }
})





module.exports = router;