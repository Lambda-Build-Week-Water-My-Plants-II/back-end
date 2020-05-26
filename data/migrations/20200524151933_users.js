exports.up = function (knex) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.increments();

    tbl.string("username", 255).notNullable().unique();
    tbl.string("password", 255).notNullable();
    tbl.string("phone_number",  15).notNullable()
    tbl.timestamps(true, true) //created at, updated at
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
