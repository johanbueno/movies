var mysql = require("mysql");
var inquirer = require("inquirer");

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
  // createMovie();
  start();
});

function start() {
  inquirer
    .prompt({
      name: "buyOrDonate",
      type: "list",
      message: "Would you like to buy a movie or Donate",
      choices: ["BUY", "DONATE", "EXIT"],
    })
    .then(function (answer) {
      if (answer.buyOrDonate === "BUY") {
        buy();
      } else if (answer.buyOrDonate === "DONATE") {
        donate();
      } else {
        connection.end();
      }
    });
}

function buy() {
  connection.query("SELECT * FROM movies", function (err, results) {
    if (err) throw err;
    inquirer.prompt([
      {
        name: "choice",
        type: "list",
        choices: function () {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
            choiceArray.push(results[i].title);
          }
          return choiceArray;
        },
        message: "Which movie would you like to buy?",
      },
      {
        name: "price",
        type: "input",
        message: "How much would you like to pay?",
      },
    ]);
  });
}

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
      updateMovie();
    }
  );
}

function updateMovie() {
  console.log("Updating Maya Movie \n");
  var query = connection.query(
    "UPDATE movies SET ? WHERE ?",
    [
      //title: "Raya",
      // price: 17,
      // rating: 9.5,
      // year: 2001,
      // quantity: 29,
      {
        price: 30,
      },
      {
        title: "Raya",
      },
    ],
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " products updated!\n");
      // Call deleteMovie AFTER the UPDATE completes
      deleteMovie();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function deleteMovie() {
  console.log("Deleting Spy kids \n");
  connection.query(
    "DELETE FROM movies WHERE ?",
    {
      title: "Spy kids",
    },
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " Movie deleted!\n");
      // Call readMovies AFTER the DELETE completes
      readMovies();
    }
  );
}

function readMovies() {
  console.log("Selecting all Movies...\n");
  connection.query("SELECT * FROM movies", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
}
