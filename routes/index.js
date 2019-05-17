module.exports = {
  getHomePage: (req, res) => {
      let query = "SELECT * FROM `list` ORDER BY id ASC"; // query database to get all the task

      // execute query
      db.query(query, (err, result) => {
          if (err) {
              res.redirect('/');
          }
          res.render('index.ejs', {
              title:"TO-DO List" ,
              task: result
          });
      });
  },
};
