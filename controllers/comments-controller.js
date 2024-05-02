const knex = require("knex")(require("../knexfile"));

const addNewComment = async (req, res) => {
	if (!req.body.comment) {
		return res.status(400).json({
			message: "Please add your comment",
		});
	}
	try {
		const result = await knex("comments").insert(req.body);
		const newCommentId = result[0];
		const newComment = await knex("comments").where("id", newCommentId);
		res.status(201).json(newComment);
	} catch (error) {
		res.status(500).json({
			message: `Unable to add new comment: ${error}`,
		});
	}
};

module.exports = {
	addNewComment,
};
