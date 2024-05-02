const router = require("express").Router();
const newsController = require("../controllers/news-controller");

router.route("/current").get(newsController.getCurrentNews);
router.route("/archive").get(newsController.getArchiveNews);
router.route("/:id").get(newsController.getNewsDetail);
router.route("/:id/views").post(newsController.updateViews);
router.route("/:id/likes").post(newsController.updateLikes);

module.exports = router;
