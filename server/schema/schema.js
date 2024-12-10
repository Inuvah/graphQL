const graphql = require('graphql');
//lodash is a library im using to retrieve data from arrays
const _ = require('lodash');

//import mongodb
const Purchase = require('../models/purchases')
const User = require('../models/user')

//properties from GraphQL package
const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
} = graphql;

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

const UserType = new GraphQLObjectType({
    name: 'User',
    fields:() => ({
    id: { type: GraphQLID},
    name: { type: GraphQLString },
    password: { type: GraphQLString },
    purchase: {
        type: new GraphQLList(PurchaseType),
        resolve(parent, args) {
            console.log(parent.id)
            //filter finds all matching id's for specific use find
            //return _.filter(purchase, { userId:parent.id });
        }
    }
    })
})

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
                //return _.find(purchase, { id:args.id });
            }
        },
        user: {
            type: UserType,
            args: {id:{type: GraphQLID}},
            resolve(parent, args) {
                //return _.find(user, { id:args.id })
            }
        }
    },
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addPurchase: {
            //Defining data
            type: PurchaseType,
            args: {
                name: { type: GraphQLString },
                amount: { type: GraphQLInt },
                date: { type: GraphQLString },
            },
            async resolve(parent, args) {
                //Fecthing and saving data
                let newPurchase = new Purchase({
                    name: args.name,
                    amount: args.amount,
                    date: args.date,
                });
                try {
                    const savedPurchase = await newPurchase.save();
                    return savedPurchase;
                   } catch (err) {
                    const error = new GraphQLError(err); //you need to import GraphQLError like a GraphQLString type
                    return error;
                   } 
            }
        }
    }
})

//Export the schema 
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});