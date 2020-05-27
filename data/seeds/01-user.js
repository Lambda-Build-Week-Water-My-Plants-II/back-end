exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "test1",
          password:
            "$2a$10$/.0vo89bh8JtJrIj2znQ7Om4Se8el7zGWLT3LAiwproMgO7MBuHfy",
          phone_number: "123-421-1231",
        },
      ]);
    });
};
