
exports.seed = function(knex) {
      return knex('users').insert([
        {id: 1, username: 'Daximilian', password: "swaaag", department: 'Student'},
        {id: 2, username: 'Dalex', password: "SwagHard", department: 'PM'},
        {id: 3, username: 'Dilly', password: "password123", department: 'Instructor'}
      ]);
};
