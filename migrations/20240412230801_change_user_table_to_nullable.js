exports.up = (knex) => {
	return knex.schema.alterTable("news", (table) => {
		table.string("source").nullable().alter();
		table.string("author").nullable().alter();
		table.string("title").nullable().alter();
		table.string("category").nullable().alter();
		table.text("summary").nullable().alter();
		table.string("image_url").nullable().alter();
		table.text("content").nullable().alter();
		table.integer("views").nullable().alter();
		table.integer("likes").nullable().alter();
	});
};

exports.down = (knex) => {
	return knex.schema.alterTable("news", (table) => {
		table.string("source").notNullable().alter();
		table.string("author").notNullable().alter();
		table.string("title").notNullable().alter();
		table.string("category").notNullable().alter();
		table.text("summary").notNullable().alter();
		table.string("image_url").notNullable().alter();
		table.text("content").notNullable().alter();
		table.integer("views").notNullable().alter();
		table.integer("likes").notNullable().alter();
	});
};
