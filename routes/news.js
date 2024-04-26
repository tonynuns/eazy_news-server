const router = require("express").Router();
const newsController = require("../controllers/news-controller");

router.route("/current").get(newsController.getCurrentNews);

module.exports = router;
