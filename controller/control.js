const express = require("express");
const app = express();
const mongoose = require("mongoose");
const movies = require("../db/schema");
const db = require("../db/db");
const { aggregate } = require("mongoose")
const User = require("../db/schemaauth")



const movie = async (req, res) => {
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


const groupyear = async (req, res) => {
  try {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 10);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = {};

    
    const aggregationPipeline = [
      { $group: { _id: "$year", title: { $push: "$$ROOT" } } }
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


const sum = async (req, res) => {
  try {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 10);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = {};


    const aggregationPipeline = [
      { $match: { type: "movie" } }, { $group: { _id: "$year", total: { $sum: 1 } } }
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


const descending = async (req, res) => {
  try {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 10);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = {};


    const aggregationPipeline = [{
      $match: { type: "movie" }
    }, { $group: { _id: "$year", total: { $sum: 1 } } }, { $sort: { total: -1 } }
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


const protected = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const token = req.cookies.jwt;
      console.log(token)
      res.json({ authenticated: true, token });
    } else {
      res.json({ authenticated: false });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send("Internal Server Error");
  }
  ;
}

const failure = async (req, res) => {
  res.send("login failed")
}


const profile = async(req,res) => { 
  try {
    if (req.isAuthenticated()) {
        const token = req.cookies.jwt;
        res.json({ authenticated: true });
      } else {
        res.json({ authenticated: false });
      }
  } catch (error) {
  console.error("An error occurred:", error);
  res.status(500).send("Internal Server Error");
  }
  ;
}

const logout = async(req,res) => { 
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
}

module.exports = { movie, sum, descending, groupyear, logout, profile,failure, protected }



