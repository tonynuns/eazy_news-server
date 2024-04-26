const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const createUser = async (req, res) => {
	const { first_name, last_name, email, password } = req.body;
	if (!first_name || !last_name || !email || !password) {
		return res.status(400).send("Please complete all required fields.");
	}
	const hashedPassword = bcrypt.hashSync(password);

	// create the new user
	const newUser = {
		first_name,
		last_name,
		email,
		password: hashedPassword,
	};
	// Insert new user into our database
	try {
		await knex("users").insert(newUser);
		res.status(201).send("Registered successfully");
	} catch (error) {
		console.log(error);
		res.status(400).send("Failed registration");
	}
};

const getUser = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).send("Please complete all required fields");
	}

	// Find the user
	const user = await knex("users").where({ email: email }).first();
	if (!user) {
		return res.status(400).send("Invalid email");
	}

	// Validate the password
	const isPasswordCorrect = bcrypt.compareSync(password, user.password);
	if (!isPasswordCorrect) {
		return res.status(400).send("Invalid password");
	}

	// Generate a token
	const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: "24h" });

	res.json({ token });
};

const getUserInfo = async (req, res) => {
	// If there is no auth header provided
	if (!req.headers.authorization) {
		return res.status(401).send("Please login");
	}

	// Parse the bearer token
	const authHeader = req.headers.authorization;
	const authToken = authHeader.split(" ")[1];

	// Verify the token
	try {
		const decoded = jwt.verify(authToken, secretKey);

		// Respond with the appropriate user data
		const user = await knex("users").where({ id: decoded.id }).first();
		delete user.password;
		res.json(user);
	} catch (error) {
		return res.status(401).send("Invalid auth token");
	}
};

module.exports = {
	createUser,
	getUser,
	getUserInfo,
};
