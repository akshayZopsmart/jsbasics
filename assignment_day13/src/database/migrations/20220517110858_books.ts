/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function (knex: any): Promise<void> {
	return await knex.schema.createTable("books", (table: any) => {
		table.string("bookID").notNullable();
		table.string("publisherID").notNullable();
        table.string("name").notNullable();
        table.timestamps();
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex: any): Promise<void> {
	await knex.schema.dropTable("users");
};
