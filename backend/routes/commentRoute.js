const router = require("express").Router({ mergeParams: true });
const Comment = require("../models/comment");
const Location = require("../models/Location");

//COMMENT CREATE
router.post("/create", async (req, res) => {
  try {
    const foundLocation = await Location.findById({ _id: req.params.id });
    const comment = await Comment.create(req.body);
    await foundLocation.comment.push(comment);
    await foundLocation.save();
    res.status(200).json({ success: true, foundLocation });
  } catch (err) {
    res.status(400).json(err.message);
    console.log(err);
  }
});

//GET A SPECIFIC COMMENT
router.get('/:comment_id', (req, res) => {
    try {
        Comment.findById(req.params.comment_id)
        .then(foundComment => {
            res.status(200).json({success: true, foundComment})
        })
        .catch(err => res.status(400).json({success: false, message: err.message}))
    } catch (error) {
        res.status(400).json(error.message);
        console.log(error);
    }
})

//UPDATE COMMENT
router.put('/:comment_id', (req, res) => {
    try {
        Comment.findByIdAndUpdate(req.params.comment_id, req.body)
        .then(updatedComment => {
            res.status(200).json({success: true, updatedComment})
        })
        .catch(err => res.status(400).json({success: false, message: err.message}))
    } catch (error) {
        res.status(400).json(error.message);
        console.log(error);
    }
})

//DELETE COMMENT
router.delete('/:comment_id', (req, res) => {
    try {
        Comment.findByIdAndRemove(req.params.comment_id, { useFindAndModify: false })
          .then(() => res.json({ success: true }))
          .catch((err) =>
            res.status(400).json()({ success: false, message: err.message })
          );
    } catch (error) {
        res.status(400).json(error.message);
        console.log(error);
    }
})


module.exports = router;
