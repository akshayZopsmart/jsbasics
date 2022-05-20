/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function (knex: any): Promise<void> {
	return await knex.schema.createTable("users", (table: any) => {
		table.string("userID").notNullable();
		table.string("name").notNullable();
		table.string("email").notNullable().unique();
		table.string("password").notNullable();
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex: any): Promise<void> {
	await knex.schema.dropTable("users");
};
