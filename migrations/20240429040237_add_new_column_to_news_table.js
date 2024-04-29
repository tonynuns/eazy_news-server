exports.up = function (knex) {
	return knex.schema.alterTable("news", (table) => {
		table.string("news_url", 1000).after("content");
	});
};

exports.down = function (knex) {
	return knex.schema.alterTable("news", (table) => {
		table.dropColumn("news_url");
	});
};
