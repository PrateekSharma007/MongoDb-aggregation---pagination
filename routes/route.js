const express = require("express") 
const app = express() ; 
const router = express.Router() ;
const {movie, sum , descending, groupyear} = require("../controller/control")



router.get('/movie', movie);

router.get('/sum', sum);

router.get('/descending', descending);

router.get('/groupyear', groupyear);


module.exports = router; 
