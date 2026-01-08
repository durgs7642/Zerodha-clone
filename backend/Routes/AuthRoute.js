const {Signup, Login, Logout} = require("../Controllers/AuthController");
const {userVerification} = require("../Middlewares/AuthMiddlewares");
const router= require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/verify", userVerification, (req,res)=>{
    res.json({status:true, user:req.user});
});

router.post("/logout",Logout);



module.exports = router;