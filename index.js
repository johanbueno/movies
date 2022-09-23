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
      message: "Would you like to buy a movie or create",
      choices: ["BUY", "CREATE", "EXIT"],
    })
    .then(function (answer) {
      if (answer.buyOrDonate === "BUY") {
        buy();
      } else if (answer.buyOrDonate === "CREATE") {
        creatingMovie();
      } else {
        connection.end();
      }
    });
}

function buy() {
  connection.query("SELECT * FROM movies", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
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
          name: "bid",
          type: "input",
          message: "How much would you like to pay?",
        },
      ])
      .then(function (answer) {
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].title === answer.choice) {
            chosenItem = results[i];
          }
        }
        if (chosenItem.price < parseInt(answer.bid)) {
          // bid was high enough, so update db, let the user know, and start over
          connection.query(
            "UPDATE movies SET ? WHERE ?",
            [
              {
                price: answer.bid,
              },
              {
                id: chosenItem.id,
              },
            ],
            function (error) {
              if (error) throw err;
              console.log("new price on the movie !");
              start();
            }
          );
        } else {
          // bid wasn't high enough, so apologize and start over
          console.log("Your bid was too low. Try again...");
          start();
        }
      });
  });
}

function creatingMovie() {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "Please type the title of the movie",
      },
      {
        name: "price",
        type: "input",
        message: "how much will be the release price  ",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
      },
      {
        name: "rating",
        type: "input",
        message: "Please rate the movie from 1 to 10 ",
      },
      {
        name: "year",
        type: "input",
        message: "What year the movie will be release ",
      },
      {
        name: "quantity",
        type: "input",
        message: "How many movies will be available on cd or bluray ",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO movies SET ?",
        {
          title: answer.title,
          price: answer.price || 0,
          rating: answer.rating || 0,
          year: answer.year,
          quantity: answer.quantity,
        },
        function (err) {
          if (err) throw err;
          console.log("Your movie is created on Sony Data base !");

          start();
        }
      );
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
