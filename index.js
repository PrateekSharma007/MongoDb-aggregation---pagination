const express = require("express") ; 
const mongoose = require("mongoose");
const app = express() ;
const db = require("./model/db")
const movies= require("./model/schema")
const route = require("./routes/route") 
const router = require("./routes/authroute") ; 
const session = require("express-session")
const passport = require("passport")
const cookieparser = require("cookie-parser")
const movie = require("./model/schema")
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


app.listen(3000,() => { 
    console.log("app is working") ;
})

