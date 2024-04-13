const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { Readability } = require("@mozilla/readability");

//function to convert external API datetime format to MySQL database format
const dateTimeConversion = (datetime) => {
	const date = new Date(datetime).toISOString().split("T")[0];
	const time = new Date(datetime).toISOString().split("T")[1].slice(0, 8);
	return `${date} ${time}`;
};

//function extract simplified content from news URL
const getSimpleContent = async (newsUrl) => {
	try {
		const response = await axios.get(newsUrl);

		const virtualConsole = new jsdom.VirtualConsole();
		const doc = new JSDOM(response.data, { virtualConsole }).window.document;

		const newsArticle = new Readability(doc).parse();
		// return newsArticle.textContent;
		return newsArticle.content;
	} catch (error) {
		console.log(`${error}: Unable to retrieve site content from ${newsUrl}`);
		return "error";
	}
};

module.exports = { dateTimeConversion, getSimpleContent };
