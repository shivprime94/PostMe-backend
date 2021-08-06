const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const mongoose = require('mongoose');

const Post = require('../../models/Post');

const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const author = req.body.author;
    const content = req.body.content;

    const newPost = new Post({
      author: author,
      content: content,
      likes: [],
      dislikes: [],
    });

    newPost
      .save()
      .then((post) => res.json(newPost))
      .catch((err) => console.log(err));
  }
);

router.get(
  "/allPosts",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.find({}, (err, posts) => {
      res.send(posts);
    });
  }
);

router.post(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.body.id;
    const author = req.body.author;
    const content = req.body.content;

    Post.findByIdAndUpdate(
      id,
      { content: content },
      { new: true },
      (err, docs) => {
        if (err) {
          console.log(err);
          res.status(400).send("Bad request");
        } else {
          res.json(docs);
        }
      }
    );
  }
);

router.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.body.id;
    const author = req.body.author;

    Post.findByIdAndDelete(id, (err, docs) => {
      if (err) {
        console.log(err);
        res.status(400).send("Bad request");
      } else {
        res.send("Deleted");
      }
    });
  }
);

module.exports = router;