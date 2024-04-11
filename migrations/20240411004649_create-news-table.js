exports.up = function (knex) {
	return knex.schema.createTable("news", (table) => {
		table.uuid("id").primary().defaultTo(knex.fn.uuid());
		table.string("source").notNullable();
		table.string("author").notNullable();
		table.string("title").notNullable();
		table.string("category").notNullable();
		table.text("summary").notNullable();
		table.string("image_url").notNullable();
		table.text("content").notNullable();
		table.integer("views").notNullable();
		table.integer("likes").notNullable();
		table.timestamp("uploaded_at").defaultTo(knex.fn.now());
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable("news");
};
