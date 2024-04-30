const router = require("express").Router();
const newsController = require("../controllers/news-controller");

router.route("/current").get(newsController.getCurrentNews);
router.route("/archive").get(newsController.getArchiveNews);

module.exports = router;
