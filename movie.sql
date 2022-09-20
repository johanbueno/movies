DROP DATABASE IF EXISTS movie_buster;

CREATE DATABASE movie_buster;

USE movie_buster;

CREATE TABLE movies
(
    id INT NOT NULL
    AUTO_INCREMENT,
  title VARCHAR
    (45) NULL,
  price DECIMAL
    (10,2) NULL,
  rating DECIMAL
    (10,2) NOT NULL,
  year YEAR,
  quantity INT NULL,
  PRIMARY KEY
    (id)
);

    INSERT INTO movies
        (title, price,rating,year,quantity)
    VALUES
        ("Spy Kids", 2.50, 8.5, 2001, 5);
    INSERT INTO movies
        (title, price,rating,year,quantity)
    VALUES
        ("The Ring", 4.50, 9.5, 2002, 10);

    INSERT INTO movies
        (title, price,rating,year,quantity)
    VALUES
        ("Remember the Titans", 3.00, 7.5, 2002, 1);

    INSERT INTO movies
        (title, price,rating,year,quantity)
    VALUES
        ("Spirited Away", 1.00, 6.5, 2001, 19);

    INSERT INTO movies
        (title, price,rating,year,quantity)
    VALUES
        ("Iron Man", 4.00, 7.5, 2008, 13);

    INSERT INTO movies
        (title, price,rating,year,quantity)
    VALUES
        ("Catch Me If You Can", 5.00, 9.5, 2002, 13);

    INSERT INTO movies
        (title, price,rating,year,quantity)
    VALUES
        ("Finding Nemo", 3.00, 9.8, 2003, 9);

    SELECT *
    FROM movies;