const router = require("express").Router();
const userController = require("../controllers/users-controller");

router.route("/signup").post(userController.createUser);
router.route("/login").post(userController.getUser);
router.route("/profile").get(userController.getUserInfo);

module.exports = router;
