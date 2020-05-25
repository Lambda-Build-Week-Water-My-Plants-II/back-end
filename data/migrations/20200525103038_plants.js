exports.up = function (knex) {
  return knex.schema.createTable("plants", (tbl) => {
    tbl.increments();
    tbl.string("nickname", 255).notNullable();
    tbl.string("species", 255).notNullable();
    tbl.string("h2oFrequency", 255).notNullable();
    tbl.string("image", 255);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("plants");
};
