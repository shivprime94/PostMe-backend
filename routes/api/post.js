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
    Post.find({})
      .sort({ date: -1 })
      .then((posts) => res.json(posts))
      .catch((err) => console.log(err));
  }
);

router.post(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.body.id;
    const author = req.body.author;
    const content = req.body.content;

    Post.findByIdAndUpdate(id, { content: content }, { new: true })
      .then((post) => res.json(post))
      .catch((err) => console.log(err));
  }
);

router.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.body.id;
    const author = req.body.author;
    Post.findByIdAndDelete(id)
      .then(() => res.json({ success: true }))
      .catch((err) => console.log(err));
  }
);

module.exports = router;