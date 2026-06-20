const express = require('express');
const {z} = require('zod');
const { User, Account } = require('../db');
const { authMiddleware } = require('../middleware');
const JWT_SECRET = require('../config');
const jwt = require("jsonwebtoken");

const router = express.Router();

const signupSchema = z.object({
    firstName: z.string()
        .trim()
        .min(2, "First name must be at least 2 characters long")
        .max(50, "First name must not exceed 50 characters"),
    lastName: z.string()
        .trim()
        .min(2, "Last name must  be at least 2 characters long")
        .max(50, "Last name must not exceed 50 characters"),
    username: z.string()
        .trim()
        .email("Invalid email format")
        .min(3, "Username must be at least 3 characters long"),
    password: z.string()
        .min(8, "Password must be at least 8 characters long")
});


router.post('/signup', async (req, res) => {
    try {
        const body = req.body;
        const {success} = signupSchema.safeParse(req.body);
        if(!success){
            return res.status(411).json({
                message: "Incorrect inputs"
            })
        }

        const existingUser = await User.findOne({
            username: body.username
        })
        
        if(existingUser){
            return res.status(411).json({
                message: "Email already taken / Incorrect inputs"
            })
        }

        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        })
        
        const userId = user._id;

        await Account.create({
            userId,
            balance: 1 + Math.random()*10000
        })

        const token = jwt.sign({
            userId
        }, JWT_SECRET);

        res.json({
            message: "User Created Successfully",
            token: token
        })
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

const signinBody = z.object({
    username: z.string().email(),
	password: z.string()
})

router.post("/signin", async (req, res) => {
    try {
        const { success } = signinBody.safeParse(req.body)
        if (!success) {
            return res.status(411).json({
                message: "Incorrect inputs"
            })
        }

        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        });

        if (user) {
            const token = jwt.sign({
                userId: user._id
            }, JWT_SECRET);
    
            res.json({
                token: token
            })
            return;
        }

        res.status(411).json({
            message: "Error while logging in"
        })
    } catch (error) {
        console.error("Signin error:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
})

const updateBody = z.object({
    password: z.string().optional,
    firstName: z.string().optional(),
    lastName: z.string().optional()
})

router.put("/", authMiddleware, async(req,res)=>{
    const {success}  = updateBody.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message: "Error while updation"
        })

    await User.updateOne(req.body, {
        id: req.userId
    })

    res.json({
        message: "Updated Sucessfully"
    })
    }
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;