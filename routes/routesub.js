const express = require("express") 
const app = express() ; 
const router = express.Router() ;
const {addEmail} = require("../controller/subscription") 




router.post("/addemail" , addEmail) ;


module.exports = router ;