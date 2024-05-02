const knex = require("knex")(require("../knexfile"));

const getComments = async (req, res) => {
	const { id } = req.headers;
	try {
		// check if a news article with the given id exists
		const news = await knex("news").where("id", id).first();
		if (!news) {
			return res.status(404).json({
				message: `News with ID ${id} not found`,
			});
		}

		// check if comments existi for news article with the given id
		const newsComments = await knex("comments").where("news_id", id).first();
		if (!newsComments) {
			return res.status(404).json({
				message: `Comments for news with ID ${id} not found`,
			});
		}

		// fetch all comments with the given news id and append comment author names from the user table
		const comments = await knex("comments")
			.join("users", "users.id", "comments.user_id")
			.select("comments.*", "users.first_name", "users.last_name")
			.where("news_id", id);
		res.status(200).json(comments);
	} catch (error) {
		res.status(500).json({
			message: `Error retrieving comments: ${error}`,
		});
	}
};

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

const deleteComment = async (req, res) => {
	const { id } = req.params;
	try {
		const deletedComment = await knex("comments").where("id", id).delete();
		if (deletedComment === 0) {
			return res.status(404).json({
				message: `Comment with ID ${id} not found.`,
			});
		}
		res.status(204).send();
	} catch (error) {
		res.status(500).json({
			message: `Unable to delete comment with ID ${id}: ${error}`,
		});
	}
};

module.exports = {
	getComments,
	addNewComment,
	deleteComment,
};
