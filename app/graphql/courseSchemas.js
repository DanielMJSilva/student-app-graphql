var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLString = require("graphql").GraphQLString;
var CourseModel = require("../models/course.server.model");
var StudentModel = require("../models/student.server.model");
const ObjectId = require("mongodb").ObjectID;
//
// Create a GraphQL Object Type for Course model
const courseType = new GraphQLObjectType({
  name: "course",
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
      },
      courseCode: {
        type: GraphQLString,
      },
      courseName: {
        type: GraphQLString,
      },
      section: {
        type: GraphQLString,
      },
      semester: {
        type: GraphQLString,
      },
    };
  },
});
//
// create a GraphQL query type that returns all courses or a course by id
const queryType = {
  courses: {
    type: new GraphQLList(courseType),
    resolve: async () => {
      const courses = await CourseModel.find().exec();
      if (!courses) {
        throw new Error("Error");
      }
      return courses;
    },
  },
  course: {
    type: courseType,
    args: {
      id: {
        name: "_id",
        type: GraphQLString,
      },
    },
    resolve: async (root, params) => {
      const courseInfo = await CourseModel.findById(params.id).exec();
      if (!courseInfo) {
        throw new Error("Error");
      }
      return courseInfo;
    },
  },
  myCourses: {
    type: new GraphQLList(courseType),
    args: {
      id: {
        type: GraphQLString,
      },
    },
    resolve: async (root, params) => {
      const user = await StudentModel.findById(params.id).exec();
      if (!user) {
        throw new Error("Error");
      }
      // console.log(user);
      const courseIds = await user.courses.map((e) => ObjectId(e));
      if (!courseIds) {
        throw new Error("Error");
      }
      const courses = await CourseModel.find({
        _id: { $in: courseIds },
      }).exec();

      if (!courses) {
        throw new Error("Error");
      }
      return courses;
    },
  },
};

const mutation = {
  addCourse: {
    type: courseType,
    args: {
      courseCode: {
        type: new GraphQLNonNull(GraphQLString),
      },
      courseName: {
        type: new GraphQLNonNull(GraphQLString),
      },
      section: {
        type: new GraphQLNonNull(GraphQLString),
      },
      semester: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, params) => {
      const courseModel = new CourseModel(params);
      const newCourse = await courseModel.save();
      if (!newCourse) {
        throw new Error("Error");
      }
      return newCourse;
    },
  },
  updateCourse: {
    type: courseType,
    args: {
      id: {
        name: "id",
        type: new GraphQLNonNull(GraphQLString),
      },
      courseCode: {
        type: new GraphQLNonNull(GraphQLString),
      },
      courseName: {
        type: new GraphQLNonNull(GraphQLString),
      },
      section: {
        type: new GraphQLNonNull(GraphQLString),
      },
      semester: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, params) => {
      return await CourseModel.findByIdAndUpdate(
        params.id,
        {
          courseCode: params.courseCode,
          courseName: params.courseName,
          section: params.section,
          semester: params.semester,
        },
        function (err) {
          if (err) return next(err);
        }
      );
    },
  },
  deleteCourse: {
    type: courseType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, params) => {
      const deletedCourse = await CourseModel.findByIdAndRemove(
        params.id
      ).exec();
      if (!deletedCourse) {
        throw new Error("Error");
      }
      return deletedCourse;
    },
  },
};

//
module.exports = { courseQuery: queryType, courseMutation: mutation };
