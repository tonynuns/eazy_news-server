const express = require("express");
const cors = require("cors");
const cron = require("node-cron");

const app = express();
app.use(express.json());
app.use(cors());

require("dotenv").config();
const PORT = process.env.PORT || 5050;

// run news import api every hour and upload to database every hour
cron.schedule("0 * * * *", () => {
	const newsAPI = require("./external-api/news-import");
	newsAPI.addNews();
	console.log(
		`Recent News imported from external API and uploaded to database at ${new Date().toString()}`
	);
});

// run delete news api every 60 days and delete news published more than 60 days ago from database
cron.schedule("0 0 2 * * *", () => {
	const newsAPI = require("./external-api/news-import");
	newsAPI.deleteNews();
	console.log(
		`News published more than 60 days ago have been deleted from database at ${new Date().toString()}`
	);
});

const usersRoutes = require("./routes/users");
app.use("/users", usersRoutes);

const newsRoutes = require("./routes/news");
app.use("/news", newsRoutes);

const commentsRoutes = require("./routes/comments");
app.use("/comments", commentsRoutes);

app.listen(PORT, () => {
	console.log(`server running on http://localhost:${PORT}`);
});
