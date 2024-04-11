exports.up = function (knex) {
	return knex.schema.createTable("comments", (table) => {
		table.uuid("id").primary().defaultTo(knex.fn.uuid());
		table.text("comment").notNullable();
		table.string("user_id").notNullable();
		table.string("news_id").notNullable();
		table.timestamp("created_at").defaultTo(knex.fn.now());
		table
			.timestamp("updated_at")
			.defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
		table
			.foreign("user_id")
			.references("id")
			.inTable("users")
			.onUpdate("CASCADE")
			.onDelete("CASCADE");
		table
			.foreign("news_id")
			.references("id")
			.inTable("news")
			.onUpdate("CASCADE")
			.onDelete("CASCADE");
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable("comments");
};
