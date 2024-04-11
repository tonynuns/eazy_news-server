exports.up = function (knex) {
	return knex.schema.createTable("users", (table) => {
		table.uuid("id").primary().defaultTo(knex.fn.uuid());
		table.string("first_name").notNullable();
		table.string("last_name").notNullable();
		table.string("email").notNullable();
		table.string("password").notNullable();
		table.timestamp("created_at").defaultTo(knex.fn.now());
		table
			.timestamp("updated_at")
			.defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable("users");
};
