const express = require("express") ; 
const app = express() ; 
const router = express.Router() ; 
const {logout, protected, failure, profile} = require("../controller/controlauth") ;
const {addEmail} = require("../controller/subscription")


router.get("/protected" ,protected) ; 

router.get("/failure" , failure) ; 

router.get("/profile" , profile); 

router.post("/logout" , logout) ; 

// router.post("/addemail",addEmail);

module.exports = router; 

