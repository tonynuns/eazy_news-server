const router = require("express").Router();
const commentsController = require("../controllers/comments-controller");

router.route("/").get(commentsController.getComments);
router.route("/").post(commentsController.addNewComment);
router.route("/:id").delete(commentsController.deleteComment);

module.exports = router;
