const express = require("express") ; 
const mongoose = require("mongoose");
const app = express() ;
const routersub = require("./routes/routesub")
const db = require("./model/db")
const movies= require("./model/schema")
const route = require("./routes/route") 
const router = require("./routes/authroute") ; 
const session = require("express-session")
const passport = require("passport")
const cookieparser = require("cookie-parser")
const movie = require("./model/schema")
const axios = require("axios") ;
const bodyParser = require('body-parser');
require("./passport")
const User = require("./model/schemaauth")



app.use(express.json({limit : '5mb'}));
app.use(express.urlencoded({extended : true}));
app.use(cookieparser())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure : false ,

    }
}))


app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.json());

app.use(express.json({limit : '5mb'}));
app.use(express.urlencoded({extended : true}));
app.use('/',route )
app.use("/",router)

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/failure' ,successRedirect : "/protected"}),
)


app.get('/auth/facebook', passport.authenticate('facebook'));


app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/error'
  }));

// app.use(morgan('dev'))


// http://localhost:3000/users?page=1&limit=5

movies.insertMany([
    {
       title: "Jurassic World: Fallen Kingdom",
       genres: [ "Action", "Sci-Fi" ],
       runtime: 130,
       rated: "PG-13",
       year: 2018,
       directors: [ "J. A. Bayona" ],
       cast: [ "Chris Pratt", "Bryce Dallas Howard", "Rafe Spall" ],
       type: "movie"
     },
     {
       title: "Tag",
       genres: [ "Comedy", "Action" ],
       runtime: 105,
       rated: "R",
       year: 2018,
       directors: [ "Jeff Tomsic" ],
       cast: [ "Annabelle Wallis", "Jeremy Renner", "Jon Hamm" ],
       type: "movie"
     },
     {

     
        title: "Inception",
        genres: ["Action", "Sci-Fi"],
        runtime: 148,
        rated: "PG-13",
        year: 2010,
        directors: ["Christopher Nolan"],
        cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
        type: "movie",
    },
    {
        title: "The Shawshank Redemption",
        genres: ["Drama", "Crime"],
        runtime: 142,
        rated: "R",
        year: 1994,
        directors: ["Frank Darabont"],
        cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
        type: "movie",
    },
    {
        title: "The Dark Knight",
        genres: ["Action", "Crime"],
        runtime: 152,
        rated: "PG-13",
        year: 2008,
        directors: ["Christopher Nolan"],
        cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
        type: "movie",
    },
    {
        title: "Pulp Fiction",
        genres: ["Crime", "Drama"],
        runtime: 154,
        rated: "R",
        year: 1994,
        directors: ["Quentin Tarantino"],
        cast: ["John Travolta", "Samuel L. Jackson", "Uma Thurman"],
        type: "movie",
    },
    {
        title: "Forrest Gump",
        genres: ["Drama", "Romance"],
        runtime: 142,
        rated: "PG-13",
        year: 1994,
        directors: ["Robert Zemeckis"],
        cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
        type: "movie",
    },
    {
        title: "Interstellar",
        genres: ["Adventure", "Drama"],
        runtime: 169,
        rated: "PG-13",
        year: 2014,
        directors: ["Christopher Nolan"],
        cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
        type: "movie",
    },
    {
        title: "The Matrix",
        genres: ["Action", "Sci-Fi"],
        runtime: 136,
        rated: "R",
        year: 1999,
        directors: ["Lana Wachowski", "Lilly Wachowski"],
        cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
        type: "movie",
    },
    {
        title: "Gladiator",
        genres: ["Action", "Adventure"],
        runtime: 155,
        rated: "R",
        year: 2000,
        directors: ["Ridley Scott"],
        cast: ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen"],
        type: "movie",
    },
    {
        title: "The Lord of the Rings: The Fellowship of the Ring",
        genres: ["Adventure", "Drama"],
        runtime: 178,
        rated: "PG-13",
        year: 2001,
        directors: ["Peter Jackson"],
        cast: ["Elijah Wood", "Ian McKellen", "Viggo Mortensen"],
        type: "movie",
    },
    {
        title: "Fight Club",
        genres: ["Drama"],
        runtime: 139,
        rated: "R",
        year: 1999,
        directors: ["David Fincher"],
        cast: ["Edward Norton", "Brad Pitt", "Helena Bonham Carter"],
        type: "movie",
    },
 ])


 app.get("/",async (req,res) => { 
  res.send('Mongodb aggregation')
})












// const clientId = '1000.S8VH7L4SYAW97M08MPDJ3NKASK74LH';
// const clientSecret = '2fe70fd1aa78b419dde31803feab2d8643073834b7';
// const redirectUri = 'https://sgwebpartners.com/';
// const refreshToken = '1000.6b52c89fd810f2161e3d9131098108d9.f9828bed827358d8f2b166d6e6512915';


// const apiUrl = 'https://campaigns.zoho.com/api/v1/';


// const axiosInstance = axios.create({
//   baseURL: apiUrl,
//   headers: {
//     Authorization: `Bearer ${refreshToken}`,
//   },
// });


// app.post('/create-campaign', async (req, res) => {
//   try {
   
//     const { name, subject, from_name, from_email, list_ids, content } = req.body;

   
//     const response = await axiosInstance.post('campaigns', {
//       name,
//       subject,
//       from_name,
//       from_email,
//       list_ids,
//       content,
//     });

//     res.status(201).json(response.data);
//   } catch (error) {
//     console.error('Error creating campaign:', error);
//     res.status(500).json({ error: 'Failed to create campaign' });
//   }
// });






app.post('/addemail', async (req, res) => {
    try {
      const apiKey = 'fee5adc560b27214bdca3e234894b420'; 
      const listKey = '3za066450fed17e3db132e443165c35ff43b1b2b2a44c6b67f8caf6d9f8d378ddd';
      const { firstName , lastName, email } = req.body; 
  
    const apiUrl = `https://campaigns.zoho.com/api/v1.1/json/listsubscribe?resfmt=JSON&listkey=${listKey}&contactinfo=%7B%22First+Name%22%3A%22${firstName}%22%2C%22Last+Name%22%3A%22${lastName}%22%2C%22Contact+Email%22%3A%22${email}%22%7D`;


      
    const accessToken = '1000.5fe804f5fb2cd1c22df51cba4752de52.f32766b3366693b8891a6144dae7f67f'; 
    const headers = {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
  
      const response = await axios.post(apiUrl, {}, { headers });
  
      if (response.data && response.data.code === 'success') {
        console.log('Contact updated successfully:', response.data);
        res.status(200).json({ message: 'Contact updated successfully' });
      } else {
        console.error('Error updating contact:', response.data);
        res.status(500).json({ error: 'Error updating contact' });
      }
    } catch (error) {
      console.error('Error updating contact:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.listen(3000,() => { 
    console.log("app is working") ;
})

