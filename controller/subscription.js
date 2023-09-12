const axios = require("axios") 






// const contactData = [
//     {
//       Email: 'sharma.prateek0000@gmail.com',
//       'First Name': 'PRATEEK',
//       'Last Name': 'SHARMA',
//     },
//   ];




  const addEmail = async (req,res) => {
    try {
      const apiKey = 'fee5adc560b27214bdca3e234894b420';
      const email = 'sharma.prateek00000@gmail.com';
      const listId = '3za066450fed17e3db132e443165c35ff43b1b2b2a44c6b67f8caf6d9f8d378ddd'; 
  
      const apiUrl = `https://campaigns.zoho.com/api/v1/contact/add?apikey=${apiKey}&listkey=${listId}`;
  
      
      const response = await axios.post(apiUrl, {
        data: [
          {
            email,
          },
        ],
      });
  
      // Check if the API response indicates success (you may need to adjust this based on the API's response format)
      if (response.status === 200 && response.data && response.data.code === 'success') {
        console.log('Email ID added successfully:', response.data);
        res.status(200).json({ message: 'Email ID added successfully' });
      } else {
        console.error('Error adding email ID:', response.data);
        res.status(500).json({ error: 'Error adding email ID' });
      }
    } catch (error) {
      console.error('Error adding email ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  
  







const subscribeContacts = async () => {
  const apiUrl = `https://campaigns.zoho.com/api/v1.1/json/listsubscribe?resfmt=JSON&listkey=${"3za066450fed17e3db132e443165c35ff43b1b2b2a44c6b67f8caf6d9f8d378ddd"}`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await axios.post(apiUrl, { data: contactData }, { headers });

    if (response.status === 200) {
      console.log('Subscription successful!');
    } else {
      console.error(`Error: ${response.status}, ${response.data.message}`);
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
};



const unsubscribeContacts = async () => {
    const apiUrl = `https://campaigns.zoho.com/api/v1.1/json/listunsubscribe?resfmt=JSON&listkey=${listKey}`;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  
    try {
      const response = await axios.post(apiUrl, { Email: unsubscribeEmail }, { headers });
  
      if (response.status === 200) {
        console.log('Unsubscription successful!');
      } else {
        console.error(`Error: ${response.status}, ${response.data.message}`);
      }
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  };



module.exports = {subscribeContacts,addEmail}












// https://campaigns.zoho.com/api/v1.1/json/listsubscribe?resfmt=JSON&listkey=3za066450fed17e3db132e443165c35ff43b1b2b2a44c6b67f8caf6d9f8d378ddd&contactinfo={First+Name:prateek,Last+Name:prateek,Contact+Email:sharma.prateek00000@gmail.com
