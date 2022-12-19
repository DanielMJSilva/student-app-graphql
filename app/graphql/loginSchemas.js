var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLString = require("graphql").GraphQLString;
var StudentModel = require("../models/student.server.model");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var private_key = require("../helpers/keys.js");
//
// Create a GraphQL Object Type for login
const userType = new GraphQLObjectType({
  name: "user",
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
      },
      studentNumber: {
        type: GraphQLString,
      },
    };
  },
});

const postType = new GraphQLObjectType({
  name: "post",
  fields: function () {
    return {
      title: {
        type: GraphQLString,
      },
      description: {
        type: GraphQLString,
      },
    };
  },
});

const loginReturnType = new GraphQLObjectType({
  name: "loginReturn",
  fields: function () {
    return {
      userId: {
        type: GraphQLString,
      },
      token: {
        type: GraphQLString,
      },
    };
  },
});

// create a GraphQL query type that returns all courses or a course by id
const queryType = {
  user: {
    type: new GraphQLList(userType),
    args: {
      id: {
        name: "_id",
        type: GraphQLString,
      },
    },
    resolve: async ({ userId }, req) => {
      if (!req.isAuth) {
        throw new Error("Unauthorized");
      }
      const userInfo = StudentModel.findById(userId).exec();
      if (!userInfo) {
        throw new Error("Error");
      }

      return userInfo;
    },
  },
  posts: {
    type: new GraphQLList(postType),
    resolve: async (_, req) => {
      if (!req.isAuth) {
        throw new Error("Unauthorized");
      }
      return [
        { title: "accident", description: "accident ocurred" },
        { title: "Laptop", description: "Buy A new Laptop" },
      ];
    },
  },
};

const mutation = {
  login: {
    type: loginReturnType,
    args: {
      studentNumber: {
        type: new GraphQLNonNull(GraphQLString),
      },
      password: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, params) => {
      try {
        const user = await StudentModel.findOne({
          studentNumber: params.studentNumber,
        });
        if (!user) {
          throw new Error("Invalid Credentials!user");
        }
        const id = user._id;
        const isCorrectPassword = await bcrypt.compare(
          params.password,
          user.password
        );
        if (!isCorrectPassword) {
          throw new Error("Invalid Credentials!password");
        }
        const token = jwt.sign(
          { _id: user._id, studentNumber: user.studentNumber },
          private_key,
          {
            algorithm: "RS256",
          }
        );
        return {
          userId: id,
          token,
        };
      } catch (error) {
        return error;
      }
    },
  },
};

//
module.exports = { loginQuery: queryType, loginMutation: mutation };
