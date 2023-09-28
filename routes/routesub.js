const express = require("express") ; 
const app = express() ; 
const router = express.Router() ; 
const {subscribe, unsubscribe} = require("../controller/subscription")



router.post("/subscribe" , subscribe) ; 

router.post("/unsubscribe", unsubscribe) ;


module.export = router ;