const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

require("dotenv").config();
const PORT = process.env.PORT || 5050;

const newsAPI = require("./external-api/news-import");
// newsAPI.addNews(); //TO BE RUN EVERY HOUR USING NODE CRON

const usersRoutes = require("./routes/users");
app.use("/users", usersRoutes);

const newsRoutes = require("./routes/news");
app.use("/news", newsRoutes);

const commentsRoutes = require("./routes/comments");
app.use("/comments", commentsRoutes);

app.listen(PORT, () => {
	console.log(`server running on http://localhost:${PORT}`);
});
