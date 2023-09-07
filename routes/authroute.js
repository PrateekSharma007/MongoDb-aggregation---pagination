const express = require("express") ; 
const app = express() ; 
const router = express.Router() ; 
const {logout, protected, failure, profile} = require("../controller/controlauth") ;


router.get("/protected" ,protected) ; 

router.get("/failure" , failure) ; 

router.get("/profile" , profile); 

router.post("/logout" , logout) ; 


module.exports = router; 

