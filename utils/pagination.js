const express = require("express") ; 
const app = require("express"); 



const paginateMiddleware = (req, res, next) => {
    try {
      const page = parseInt(req.query.page || 1);
      const limit = parseInt(req.query.limit || 10);
  
      req.pagination = {
        page,
        limit,
      };
  
      next();
    } catch (err) {
      console.error(err);
      res.status(400).send("Not working");
    }
  };


  module.exports = paginateMiddleware  ;