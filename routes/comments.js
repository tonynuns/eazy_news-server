const router = require("express").Router();
const commentsController = require("../controllers/comments-controller");

router.route("/").post(commentsController.addNewComment);

module.exports = router;
