const express = require("express") 
const app = express() ; 
const router = express.Router() ;
const {movie, sum , descending, groupyear, failure, protected, profile, logout} = require("../controller/control")



router.get('/movie', movie);

router.get('/sum', sum);

router.get('/descending', descending);

router.get('/groupyear', groupyear);

router.get("/protected" ,protected) ; 

router.get("/failure" , failure) ; 

router.get("/profile" , profile); 

router.post("/logout" , logout) ; 


module.exports = router; 
