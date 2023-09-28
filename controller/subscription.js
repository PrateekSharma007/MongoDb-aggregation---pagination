const express = require("express") ; 
const app = express(); 
const axios = require("axios") 



const subscribe = async (req, res) => {
  try {
    const apiKey = 'fee5adc560b27214bdca3e234894b420'; 
    const listKey = '3za066450fed17e3db132e443165c35ff43b1b2b2a44c6b67f8caf6d9f8d378ddd';
    const { firstname , lastname, email } = req.body; 

  const apiUrl = `https://campaigns.zoho.com/api/v1.1/json/listsubscribe?resfmt=JSON&listkey=3za066450fed17e3db132e443165c35ff43b1b2b2a44c6b67f8caf6d9f8d378ddd&contactinfo=%7B%22First+Name%22%3A%22${firstname}%22%2C%22Last+Name%22%3A%22${lastname}%22%2C%22Contact+Email%22%3A%22${email}%22%7D`;


    
  const accessToken = '1000.03e1023e8f40cd61a603eeb88b8c1f00.6df45e93f0f7c1b8eac1fb01d84f7353'; 
  const headers = {
    Authorization: `Zoho-oauthtoken ${accessToken}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };

    const response = await axios.post(apiUrl, {}, { headers });

    if (response) {
      res.status(200).json({ message: 'Please verify yourself , check your mail' });
    } else {
      res.status(500).json({ error: 'Error updating contact' });
    }
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const unsubscribe = async (req,res) => { 
  try {
    const apiKey = 'fee5adc560b27214bdca3e234894b420'; 
    const listKey = '3za066450fed17e3db132e443165c35ff43b1b2b2a44c6b67f8caf6d9f8d378ddd';
    const { firstName , lastName, email } = req.body; 

    const apiurl =` https://campaigns.zoho.com/api/v1.1/json/listsubscribe?resfmt=JSON&listkey=${listKey}&contactinfo=%7B%22First+Name%22%3A%22${firstName}%22%2C%22Last+Name%22%3A%22${lastName}%22%2C%22Contact+Email%22%3A%22${email}%22%7D`
  


    const accessToken = '1000.4bd72025fca58c2fc41e81655ac97811.e0290faca451efe5200d64c18fdf1d4a'; 
    const headers = {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const response = await axios.post(apiurl, {}, { headers });

    if(response){
      res.send("Successfully unsubsctibed") ;
    }else{
      res.status(500).json({ error: 'Error updating contact' });
    }
  }catch(error) {
    res.status(500).json({ error: 'Internal Server Error' });
  } 

}




module.exports = {subscribe,unsubscribe}










