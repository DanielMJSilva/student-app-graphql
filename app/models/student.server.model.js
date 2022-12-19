//Load the module dependencies
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;

//Define a new StudentSchema
var StudentSchema = new Schema({
  // studentNumber: String,
  studentNumber: {
    type: String,
    // Set a unique 'username' index
    unique: true,
    // Validate 'username' value existance
    required: "student number is required",
    // Trim the 'username' field
    trim: true,
  },
  firstName: {
    type: String,
    required: "First name is required",
  },
  lastName: {
    type: String,
    required: "Last name is required",
  },
  address: String,
  city: String,
  phone: String,
  program: String,
  email: {
    type: String,
    // Validate 'email' value existance
    required: "Email is required",
    // Trim the 'email' field
    trim: true,
    // Validate the email format
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  password: {
    type: String,
    // Validate 'password' value existance
    required: "Passwod is required",
    // Trim the 'password' field
    trim: true,
    // Validate the password format
    validate: [
      (password) => password && password.length > 6,
      "Password should be longer",
    ],
  },
  courses: [
    {
      type: Schema.ObjectId,
      ref: "Course",
    },
  ],
});

//Set the fullname virtual property
StudentSchema.virtual("fullName")
  .get(function () {
    return this.firstName + " " + this.lastName;
  })
  .set(function (fullName) {
    const splitName = fullName.split(" ");
    this.firstName = splitName[0] || "";
    this.lastName = splitName[1] || "";
  });

//Use pre-save middleware to hash the password
//before saving it into database
StudentSchema.pre("save", function (next) {
  //hash the password before saving it
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

//Configure the StudenSchema to use gtters
//virtuals when transformin to JSON
StudentSchema.set("toJSON", {
  getters: true,
  virtuals: true,
});

//Create the Student model out of the StudentSchema
module.exports = mongoose.model("Student", StudentSchema);
