const graphql = require("graphql");
//lodash is a library im using to retrieve data from arrays
const _ = require("lodash");

//import mongodb
const Purchase = require("../models/purchases");
const User = require("../models/user");
const user = require("../models/user");

//properties from GraphQL package
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

//Defining the types so it know what it's retrieving
const PurchaseType = new GraphQLObjectType({
  name: "Purchase",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    date: { type: GraphQLString },
    amount: { type: GraphQLInt },
    userId: { type: GraphQLString },
    user: {
      type: PurchaseType,
      resolve(parent, args) {
        return user.findById(parent.userId);
      },
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    password: { type: GraphQLString },
    purchase: {
      type: new GraphQLList(PurchaseType),
      resolve(parent, args) {
        console.log(parent.id);
        //filter finds all matching id's for specific use find
        //return _.filter(purchase, { userId:parent.id });
        return Purchase.find({ userId: parent.id });
      },
    },
  }),
});

//Defining entry points where data can be retrieved
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  //entry points
  fields: {
    //entry point
    purchase: {
      type: PurchaseType,
      //saves retrieved id as args to pass into resolve
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db
        //return _.find(purchase, { id:args.id });
        return Purchase.findById(args.id);
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        console.log(args.id);
        //return _.find(user, { id:args.id })
        return User.findById(args.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addPurchase: {
      //Defining data
      type: PurchaseType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        amount: { type: new GraphQLNonNull(GraphQLInt) },
        date: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let purchase = new Purchase({
          name: args.name,
          amount: args.amount,
          date: args.date,
          userId: args.userId,
        });
        return purchase.save();
      },
    },
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let user = new User({
          name: args.name,
          password: args.password,
        });
        return user.save();
      },
    },
  },
});

//Export the schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
