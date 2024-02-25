const express = require("express");
const { Pool } = require("pg");

const app = express();

const pool = new Pool({
  user: "juno",
  host: "localhost",
  database: "instagram",
  password: "",
  port: 5432,
});

app.use(express.json());

app.get("/users", async (request, response) => {
  const dbConnection = await pool.connect();

  const users = await dbConnection.query("SELECT * FROM users;");

  response.send(users.rows.map((user) => user));
});

app.get("/users/:userId", async (request, response) => {
  const userId = request.params.userId;
  const dbConnection = await pool.connect();

  const user = await dbConnection.query("SELECT * FROM users WHERE id = $1;", [
    userId,
  ]);

  response.send(user.rows);
});

app.get("/posts", async (request, response) => {
  const dbConnection = await pool.connect();

  const posts = await dbConnection.query("SELECT * FROM posts;");

  response.send(posts.rows.map((post) => post.caption));
});

app.get("/posts/:postId", async (request, response) => {
  const postId = request.params.postId;
  const dbConnection = await pool.connect();

  const post = await dbConnection.query("SELECT * FROM posts WHERE id = $1;", [
    postId,
  ]);

  response.send(post.rows);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Hey im connected");
});
