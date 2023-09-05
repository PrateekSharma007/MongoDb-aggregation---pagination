const express = require("express") 
const app = express() ; 
const router = express.Router() ;
const {movies, sum , descending, groupyear} = require("../controller/control")





router.get('/movies', movies);

router.get('/movies', sum);

router.get('/movies', descending);

router.get('/movies', groupyear);


module.exports = router; 
