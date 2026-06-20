const express = require('express');
const userRouter = require('./user')
const accountRouter = require('./account')
const router = express.Router();

router.use("/user", userRouter)
router.use("/account", accountRouter)
// router.get('/', function (req, res, next) {
//     console.log("Router Working");
//     res.end();
// })

module.exports = router;