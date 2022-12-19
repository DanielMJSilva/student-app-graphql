var GraphQLSchema = require("graphql").GraphQLSchema;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLString = require("graphql").GraphQLString;
var StudentModel = require("../models/student.server.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
//
// Create a GraphQL Object Type for Course model
const courseType = new GraphQLObjectType({
  name: "courses",
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
      },
    };
  },
});
// Create a GraphQL Object Type for Student model
const studentType = new GraphQLObjectType({
  name: "student",
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
      },
      studentNumber: {
        type: GraphQLString,
      },
      firstName: {
        type: GraphQLString,
      },
      lastName: {
        type: GraphQLString,
      },
      email: {
        type: GraphQLString,
      },
      address: {
        type: GraphQLString,
      },
      city: {
        type: GraphQLString,
      },
      phone: {
        type: GraphQLString,
      },
      program: {
        type: GraphQLString,
      },
      password: {
        type: GraphQLString,
      },
      courses: {
        type: GraphQLList(courseType),
      },
    };
  },
});

//
// create a GraphQL query type that returns all students or a student by id
const queryType = {
  students: {
    type: new GraphQLList(studentType),
    resolve: async () => {
      const students = await StudentModel.find().exec();
      if (!students) {
        throw new Error("Error");
      }
      return students;
    },
  },
  student: {
    type: studentType,
    args: {
      id: {
        name: "_id",
        type: GraphQLString,
      },
    },
    resolve: async (root, params) => {
      const studentInfo = await StudentModel.findById(params.id).exec();
      if (!studentInfo) {
        throw new Error("Error");
      }
      return studentInfo;
    },
  },
  courseStudents: {
    type: new GraphQLList(studentType),
    args: {
      id: {
        type: GraphQLString,
      },
    },
    resolve: async (root, params) => {
      const students = await StudentModel.find({ courses: params.id }).exec();
      if (!students) {
        throw new Error("Error");
      }
      // console.log(students);
      return students;
    },
  },
};

//
// add mutations for CRUD operations
const mutation = {
  addStudent: {
    type: studentType,
    args: {
      studentNumber: {
        type: new GraphQLNonNull(GraphQLString),
      },
      firstName: {
        type: new GraphQLNonNull(GraphQLString),
      },
      lastName: {
        type: new GraphQLNonNull(GraphQLString),
      },
      email: {
        type: new GraphQLNonNull(GraphQLString),
      },
      address: {
        type: new GraphQLNonNull(GraphQLString),
      },
      city: {
        type: new GraphQLNonNull(GraphQLString),
      },
      phone: {
        type: new GraphQLNonNull(GraphQLString),
      },
      program: {
        type: new GraphQLNonNull(GraphQLString),
      },
      password: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, params) => {
      const studentModel = new StudentModel(params);
      const newStudent = await studentModel.save();
      if (!newStudent) {
        throw new Error("Error");
      }
      return newStudent;
    },
  },
  updateStudent: {
    type: studentType,
    args: {
      id: {
        name: "id",
        type: new GraphQLNonNull(GraphQLString),
      },
      studentNumber: {
        type: new GraphQLNonNull(GraphQLString),
      },
      firstName: {
        type: new GraphQLNonNull(GraphQLString),
      },
      lastName: {
        type: new GraphQLNonNull(GraphQLString),
      },
      email: {
        type: new GraphQLNonNull(GraphQLString),
      },
      address: {
        type: new GraphQLNonNull(GraphQLString),
      },
      city: {
        type: new GraphQLNonNull(GraphQLString),
      },
      phone: {
        type: new GraphQLNonNull(GraphQLString),
      },
      program: {
        type: new GraphQLNonNull(GraphQLString),
      },
      password: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, params) => {
      const hashed = await bcrypt.hash(params.password, saltRounds);
      return await StudentModel.findByIdAndUpdate(
        params.id,
        {
          studentNumber: params.studentNumber,
          firstName: params.firstName,
          lastName: params.lastName,
          email: params.email,
          address: params.address,
          city: params.city,
          phone: params.phone,
          program: params.program,
          password: hashed,
        },
        function (err) {
          if (err) return next(err);
        }
      );
    },
  },
  deleteStudent: {
    type: studentType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, params) => {
      const deletedStudent = await StudentModel.findByIdAndRemove(
        params.id
      ).exec();
      if (!deletedStudent) {
        throw new Error("Error");
      }
      return deletedStudent;
    },
  },
  updateUserCourse: {
    type: studentType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
      course: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, params) => {
      const user = await StudentModel.findByIdAndUpdate(params.id, {
        $addToSet: { courses: params.course },
      }).exec();
      if (!user) {
        throw new Error("Error");
      }
      return user;
    },
  },
  deleteUserCourse: {
    type: studentType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
      course: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, params) => {
      const user = await StudentModel.findByIdAndUpdate(params.id, {
        $pull: { courses: params.course },
      }).exec();
      if (!user) {
        throw new Error("Error");
      }
      return user;
    },
  },
};

//
module.exports = { studentQuery: queryType, studentMutation: mutation };
