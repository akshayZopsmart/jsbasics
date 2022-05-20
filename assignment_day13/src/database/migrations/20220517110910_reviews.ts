/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function (knex: any): Promise<void> {
	return await knex.schema.createTable("reviews", (table: any) => {
		table.string("reviewID").notNullable();
		table.string("bookID").notNullable();
		table.string("reviewerID").notNullable();
        table.string("review").notNullable();
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
