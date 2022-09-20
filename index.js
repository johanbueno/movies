var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "Sebastian7201",

  database: "movie_buster",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  createMovie();
});

function createMovie() {
  console.log("Inserting a new Movie....\n");
  var query = connection.query(
    "INSERT INTO movies SET ?",
    {
      title: "Raya",
      price: 17,
      rating: 9.5,
      year: 2001,
      quantity: 29,
    },
    // { why just let me add one ?
    // ask fabio
    //   title: "Free Guy",
    //   price: 11,
    //   rating: 9.5,
    //   release: 2001,
    //   quantity: 2,
    // },
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + "movies Added !!😁 \n");
    }
  );
}
