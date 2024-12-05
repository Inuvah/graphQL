//Grap graphQL and express, express is for setting up a server
const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');
const schema = require('./schema/schema.js');
//Made use of a chrome extension instead
//const GraphiQL  = require('graphiql');


//express function
const app = express();

//initialize express with graphQL package that allow express to read graphQL
app.use('/graphql', createHandler({
    schema,
}));

//express server started on port 7000
app.listen(7000, ()=> {
    console.log('Listening for request port(7000)')
});