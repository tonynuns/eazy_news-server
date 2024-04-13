exports.up = (knex) => {
	return knex.schema.alterTable("news", (table) => {
		table.string("title", 1000).nullable().alter();
		table.string("image_url", 1000).nullable().alter();
		table.text("content", "mediumtext").nullable().alter();
	});
};

exports.down = (knex) => {
	return knex.schema.alterTable("news", (table) => {
		table.string("title").nullable().alter();
		table.string("image_url").nullable().alter();
		table.text("content").nullable().alter();
	});
};
