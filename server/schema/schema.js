const graphql = require('graphql');
//lodash is a library im using to retrieve data from arrays
const _ = require('lodash');

//properties from GraphQL package
const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
} = graphql;

//test array
var purchase = [
    {name: 'Shopping Food', date: '05/12/24', amount: 200, id: '1'},
    {name: 'SNUS', date: '06/12/24', amount: 64, id: '2'},
    {name: 'Banja', date: '07/12/24', amount: 100, id: '3'},
];

//Defining the types so it know what it's retrieving
const PurchaseType = new GraphQLObjectType({
    name: 'Purchase',
    fields: () => ({
        id: { type: GraphQLID},
        name: { type: GraphQLString },
        date: { type: GraphQLString },
        amount: { type: GraphQLInt },
    }),
});

//Defining entry points where data can be retrieved
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    //entry points
    fields: {
        //entry point
        purchase: {
            type: PurchaseType,
            //saves retrieved id as args to pass into resolve
            args: {id:{type: GraphQLID}},
            resolve(parent, args){
                //code to get data from db
                return _.find(purchase, { id:args.id });
            }
        },
    },
});
//Export the schema 
module.exports = new GraphQLSchema({
    query: RootQuery,
});