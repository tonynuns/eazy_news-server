exports.up = function (knex) {
	return knex.schema.alterTable("news", (table) => {
		table.dropColumn("uploaded_at");
		table.timestamp("published_at");
		table.timestamp("created_at").defaultTo(knex.fn.now());
	});
};

exports.down = function (knex) {
	return knex.schema.alterTable("news", (table) => {
		table.dropColumn("published_at");
		table.drop("created_at");
		table.timestamp("uploaded_at").defaultTo(knex.fn.now());
	});
};
