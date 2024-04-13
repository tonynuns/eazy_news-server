const knex = require("knex")(require("../knexfile"));
const axios = require("axios");
const helperFunctions = require("./helper-functions");

require("dotenv").config();
const baseUrl = process.env.NEWSAPI_URL;
const apiKey = process.env.NEWSAPI_API_KEY;

const getSources = async () => {
	const sourceCountries = ["us", "ca", "gb", "au", "nz"]; //native english speaking countries

	try {
		//fetch subset data of top news publisher sources
		const response = await axios.get(
			`${baseUrl}/sources?language=en&apiKey=${apiKey}`
		);
		const sourcesArr = response.data.sources;

		//filter list of source publishers by native english speaking countries
		const engSourcesArr = sourcesArr.filter((sources) =>
			sourceCountries.includes(sources.country)
		);
		return engSourcesArr;
	} catch (error) {
		console.log(`${error}: Unable to fetch news sources from NewsAPI`);
		return;
	}
};

const getNews = async () => {
	//fetch english speaking source countries array
	const engSourcesArr = await getSources();

	//create an array of top news source publishers' id
	const engSourcesIdArr = engSourcesArr.map((sources) => sources.id);

	try {
		//fetch live top headline articles from top news source publishers using the publishers ID array
		const response = await axios.get(
			`${baseUrl}?language=en&sources=${engSourcesIdArr}&pageSize=100&apiKey=${apiKey}`
		);
		const articlesArr = response.data.articles;

		//match news articles id to sources id and append news category key/value pair to news articles
		articlesArr.map((article) => {
			const foundSource = engSourcesArr.find(
				(source) => source.id === article.source.id
			);
			article.category = foundSource.category;
			return article;
		});

		return articlesArr;
	} catch (error) {
		console.log(`${error}: Unable to fetch top headline news from NewsAPI`);
		return;
	}
};

const addNews = async () => {
	//sites whose news contents cannot be parsed
	const excludedSources = [
		"the-hill",
		"financial-post",
		"the-wall-street-journal",
	];
	const articlesArr = await getNews();

	articlesArr
		.filter((article) => !excludedSources.includes(article.source.id))
		.map(async (article) => {
			//employ helper functions for content and published date
			const content = await helperFunctions.getSimpleContent(article.url);
			const publishedDate = helperFunctions.dateTimeConversion(
				article.publishedAt
			);

			if (content !== "error") {
				//create newsObj
				const simpleNews = {
					source: article.source.name,
					author: article.author,
					title: article.title,
					category: article.category,
					summary: article.description,
					image_url: article.urlToImage,
					content: content,
					views: 0,
					likes: 0,
					published_at: publishedDate,
				};
				try {
					//upload news objects to database
					const uploadedNews = await knex("news").insert(simpleNews);
					// const deleteNews = await knex("news").del();
					return uploadedNews;
				} catch (error) {
					console.log(
						`Unable to upload top headline news to database for Title: "${article.title}", URL: ${article.url}`
					);
					return;
				}
			}
		});
};

module.exports = { addNews };
