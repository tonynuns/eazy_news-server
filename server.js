const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

require("dotenv").config();
const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
	console.log(`server running on http://localhost:${PORT}`);
});
