//Grap graphQL and express, express is for setting up a server
const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const schema = require("./schema/schema.js");
const cors = require("cors");
//Database
const mongoose = require("mongoose");
//Made use of a chrome extension instead
//const GraphiQL  = require('graphiql');

//Connects to mongodb database
mongoose.connect(
  "mongodb+srv://Inovah:Opmoliveropm14@trackerino.n4yjg.mongodb.net/?retryWrites=true&w=majority&appName=Trackerino"
);
mongoose.connection.once("open", () => {
  console.log("connected");
});

//express function
const app = express();

app.use(cors());
//initialize express with graphQL package that allow express to read graphQL
app.use(
  "/graphql",
  createHandler({
    schema,
  })
);

//express server started on port 7000
app.listen(7000, () => {
  console.log("Listening for request port(7000)");
});
