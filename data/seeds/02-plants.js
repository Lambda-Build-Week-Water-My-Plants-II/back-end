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
          image: "https://i.imgur.com/xxQpUF6.jpg",
          user_id: 1,
        },
        {
          nickname: "Plant2",
          species: "not so weird",
          h2oFrequency: "MEDIUM",
          image: "https://imgur.com/gQdpqqi",
          user_id: 1,
        },
        {
          nickname: "Plant3",
          species: "weird",
          h2oFrequency: "LOW",
          image: "https://imgur.com/gQwCcPu",
          user_id: 1,
        },
        {
          nickname: "Plant4",
          species: "not so weird",
          h2oFrequency: "HIGH",
          image: "https://imgur.com/oaTVNoy",
          user_id: 1,
        },
      ]);
    });
};
