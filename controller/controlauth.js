const express = require("express") ; 
const app = express(); 
const mongoose = require("mongoose") ; 
const User = require("../model/schemaauth") ; 


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

const failure = async (req,res ) => { 
    res.send("Authentication failed") ;
}

const logout = async(req,res) => { 
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  }


module.exports = {protected, failure, logout, profile} ; 
