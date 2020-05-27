exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("plants")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("plants").insert([
        {
          nickname: "Plant1",
          species: "weird",
          h2oFrequency: "HIGH",
          image: null,
          user_id: 1,
        },
        {
          nickname: "Plant2",
          species: "not so weird",
          h2oFrequency: "MEDIUM",
          image: null,
          user_id: 1,
        },
        {
          nickname: "Plant3",
          species: "weird",
          h2oFrequency: "LOW",
          image: null,
          user_id: 1,
        },
        {
          nickname: "Plant4",
          species: "not so weird",
          h2oFrequency: "HIGH",
          image: null,
          user_id: 1,
        },
      ]);
    });
};
