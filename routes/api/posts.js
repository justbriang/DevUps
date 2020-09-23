const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middlewares/auth");
const User = require("../../models/User");
const Posts = require("../../models/Posts");
const Profile = require("../../models/Profile");

//create a post
router.post(
  "/",
  [auth, [check("text", "Post description is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const newPost = new Posts({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });
      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("sever Error");
    }
  }
);
//get all post
router.get("/", auth, async (req, res) => {
  try {
    const post = await Posts.find().sort({ date: -1 });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
//get a post by id
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Posts not found" });
    }
    res.json(post);
  } catch (err) {
    console.error(err);
    if (!err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Posts not found" });
    }
    res.status(500).send("Server Error");
  }
});
//delete a post
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "user not authorised" });
    }
    if (!post) {
      return res.status(404).json({ msg: "Posts not found" });
    }
    await post.remove();
    res.json(post);
  } catch (err) {
    console.error(err);
    if (!err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Posts not found" });
    }
    res.status(500).send("Server Error");
  }
});
//add a like
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already liked' });

        }
        post.likes.unshift({ user: req.user.id });
        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.error(err);
     
        res.status(500).send("Server Error");
    }
});
//unlike post

router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (post.likes.filter(like => like.user.toString() === req.user.id).length == 0) {
            return res.status(400).json({ msg: 'Post not yet liked' });

        }
        
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        if (removeIndex < 0) {

            res.status(404).send("Post not liked");
        }
        post.likes.splice(removeIndex, 1);
        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.error(err);

        res.status(500).send("Server Error");
    }
});
//create a comment
router.post(
    "/comment/:id",
    [auth, [check("text", "comment description is required").not().isEmpty()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const user = await User.findById(req.user.id).select("-password");
            const post = await Post.findById(req.params.id);

            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id,
            };
            post.comments.unshift(newComment);
            await post.save();
          
            res.json(post.comments);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("sever Error");
        }
    }
);
//delete a comment
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);
        if (!comment) {
            res.status(404).send("comment not found");
        }
        if (comment.user.toString() !== req.user.id) {
            res.status(401).send("Unauthorized");

        }
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
        if (removeIndex < 0) {
            res.status(404).send("comment not found");
        }
        post.comments.splice(removeIndex, 1);

        await post.save();
        res.json(post.comments);

    } catch (err) {
      
            console.error(err.message);
            res.status(500).send("sever Error");

        
    }
})

module.exports = router;
