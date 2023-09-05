const express = require("express") ; 
const app = express() ; 
const mongoose = require("mongoose") ; 
const movies = require("../db/schema") ; 
const db = require("../db/db") ; 




const movies = async (req,res) => { 
    try {
        const page = parseInt(req.query.page || 1);
        const limit = parseInt(req.query.limit || 10);
    
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
    
        const result = {};
    
        
        const aggregationPipeline = [
          {
            $match: { year: 2018 },
          },
        ];
    
        if (req.query.genres) {
          aggregationPipeline.push({
            $match: { genres: req.query.genres },
          });
        }
    
        
        const moviesAggregation = await movies.aggregate(aggregationPipeline).exec();
    
        
        if (endIndex < moviesAggregation.length) {
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
    
    
        result.result = moviesAggregation.slice(startIndex, endIndex);
    
        res.json(result);
      } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error");
      }
}


const groupyear = async (req,res) => { 
    try {
        const page = parseInt(req.query.page || 1);
        const limit = parseInt(req.query.limit || 10);
    
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
    
        const result = {};
    
        // Perform the aggregation to filter movies by year (2018)
        const aggregationPipeline = [
            {$group : {_id: "$year" , title : {$push : "$$ROOT"}}}
        ];
    
        if (req.query.genres) {
          aggregationPipeline.push({
            $match: { genres: req.query.genres },
          });
        }
    
        // Execute the aggregation pipeline
        const moviesAggregation = await movies.aggregate(aggregationPipeline).exec();
    
        // Set the 'next' and 'previous' pagination links
        if (endIndex < moviesAggregation.length) {
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
    
        // Apply pagination using slice
        result.result = moviesAggregation.slice(startIndex, endIndex);
    
        res.json(result);
      } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error");
      }

}


const sum = async (req,res) => { 
    try {
        const page = parseInt(req.query.page || 1);
        const limit = parseInt(req.query.limit || 10);
    
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
    
        const result = {};
    
        
        const aggregationPipeline = [
            {$match : {type:"movie" }},{$group : {_id:"$year" ,total : {$sum : 1  }}}
        ];
    
        if (req.query.genres) {
          aggregationPipeline.push({
            $match: { genres: req.query.genres },
          });
        }
    
        
        const moviesAggregation = await movies.aggregate(aggregationPipeline).exec();
    
        
        if (endIndex < moviesAggregation.length) {
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
    
   
        result.result = moviesAggregation.slice(startIndex, endIndex);
    
        res.json(result);
      } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error");
      }

}


const descending = async (req,res) => { 
    try {
        const page = parseInt(req.query.page || 1);
        const limit = parseInt(req.query.limit || 10);
    
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
    
        const result = {};
    
     
        const aggregationPipeline = [{
            $match : {type:"movie" }},{$group : {_id:"$year" ,total : {$sum : 1}}},{$sort :{total : -1}}
        ];
    
        if (req.query.genres) {
          aggregationPipeline.push({
            $match: { genres: req.query.genres },
          });
        }
    
    
        const moviesAggregation = await movies.aggregate(aggregationPipeline).exec();
    

        if (endIndex < moviesAggregation.length) {
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
    
        
        result.result = moviesAggregation.slice(startIndex, endIndex);
    
        res.json(result);
      } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error");
      }

}


module.exports = {movies, sum,descending,groupyear,}



