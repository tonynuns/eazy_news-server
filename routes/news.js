const router = require("express").Router();
const newsController = require("../controllers/news-controller");

router.route("/current").get(newsController.getCurrentNews);
router.route("/archive").get(newsController.getArchiveNews);
router.route("/:id/comments").get(newsController.getNewsComments);

module.exports = router;
