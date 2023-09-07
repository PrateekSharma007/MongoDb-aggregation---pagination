const express = require("express");
const app = express();
const mongoose = require("mongoose");
const movies = require("../model/schema");
const db = require("../model/db");
const { aggregate } = require("mongoose")
const User = require("../model/schemaauth")
const paginateMiddleware = require("../utils/pagination");



const movie = async (req, res) => {
  try {
    const { page, limit } = req.pagination;
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
};


const groupyear = async (req, res) => {
  try {
    const { page, limit } = req.pagination;
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
    const { page, limit } = req.pagination;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result = {};


    const aggregationPipeline = [
      { $match: { type: "movie" } }, { $group: { _id: "$year", total: { $sum: 1 } } }
    ];

    if (req.query.genres) {
      aggregationPipeline.push({
        $match: { genres: req.query.genres   },
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
    const { page, limit } = req.pagination;
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




module.exports = { movie, sum, descending, groupyear }



