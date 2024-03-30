import bodyParser from 'body-parser';
import express from 'express';
import pg from 'pg';

const app = express();
const port = 3001;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "95990919",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


async function titleDescList(){
  const consult = await db.query(
    "SELECT * FROM items ORDER BY id ASC"
  );
  return consult.rows;
}

//mainly page
app.get('/', async (req, res) =>{
  const TDList = await titleDescList();
  const arr = [];
  TDList.forEach(item =>{
    arr.push(item.id);
  });
  res.render("index.ejs", {
    items: TDList,
    list: arr
  });
});

//done
app.post('/update', async (req, res) =>{
  const title = req.body['titleDBname'];
  const desc = req.body['descDBname'];
  const id = req.body.RC;
  await db.query(
    "UPDATE items SET title = $1 WHERE id = $2", [title, id]
  );
  await db.query(
    "UPDATE items SET description = $1 WHERE id = $2", [desc, id]
  );
  res.redirect('/');
});

//done
app.post('/delete', async (req, res) =>{
  const title = req.body['titleDBname'];
  await db.query(
    "DELETE FROM items WHERE title = $1",
    [title]
  );
  res.redirect('/');
});

//done
app.post('/add', async (req, res) =>{
  const title = req.body['titleToInsert'];
  const desc = req.body['descriptionDB'];
  await db.query(
    "INSERT INTO items (title, description) VALUES ($1, $2);",
    [title, desc]
  );
  res.redirect('/');
});

app.post('/undo', async (req,res) =>{
  res.redirect('/');
});

//listening port
app.listen(port, () =>{
    console.log(`localhost:${port}`);
})
