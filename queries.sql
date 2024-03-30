CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100),
  description VARCHAR (1000)
);

INSERT INTO items (title) VALUES ('Buy milk'), ('Finish homework'), ('I finished the phisics homework');