//function to convert external API datetime format to MySQL database format
const dateTimeConversion = (datetime) => {
	const date = new Date(datetime).toISOString().split("T")[0];
	const time = new Date(datetime).toISOString().split("T")[1].slice(0, 8);
	return `${date} ${time}`;
};

module.exports = { dateTimeConversion };
