const express = require("express") ; 
const mongoose = require("mongoose");
const {aggregate} = require("mongoose")
const app = express() ;
const db = require("./db/db")
const movies= require("./db/schema")


//middleware for pagination 

const paginatedresult = (model) => { 
    return async (req, res, next) => { 
        const page = parseInt(req.query.page || 1);
        const limit = parseInt(req.query.limit || 10); 

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const result = {};

        if (endIndex < (await model.countDocuments().exec())) {
            result.next = {
                page: page + 1,
                limit: limit,
            };
        }

        if (startIndex > 0) {
            result.previous = {
                page: page - 1,
                limit: limit,
            };
        }

        const filter = { } 

        if (req.query.genres) {
            filter.genres = req.query.genres; 
          }


        try {
            result.result = await model
            .find(filter) 
            .limit(limit)
            .skip(startIndex)
            .exec();
      res.paginatedresult = result;
      next();
        } catch (err) {
            console.error("Error:", err);
            res.status(500).send("Error");
        }
    };
}

const pageNumber = 1; 
const pageSize = 10; 






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


app.listen(3000,() => { 
    console.log("app is working") ;
})

