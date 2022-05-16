`use strict`
const { connectDB } = require("./db");
const { ObjectId } = require("mongodb");
const { errorHandler } = require("./errorHandlers");

module.exports = {
    courses: async () => {
      let db;
      let courses = [];
      try {
        db = await connectDB();
        courses = await db.collection("courses").find().toArray();
      } catch (error) {
        errorHandler(error);
      }
      return courses;
    },
    course: async (root, { id }) => {
    let db;
      try {
        db = await connectDB();
        let course = await db.collection('courses').findOne({ _id: ObjectId(id) });
        return course;
      } catch (error) {
        errorHandler(error);
      }
      
    },
    people: async () => {
      let db;
      let students = [];
      try {
        db = await connectDB();
        students = await db.collection("students").find().toArray();
        console.log(students);
        
      } catch (error) {
        errorHandler(error);
      }
      return students;
    },
    person: async (root, { id }) => {
    let db;
      try {
        db = await connectDB();
        let student = await db.collection('students').findOne({ _id: ObjectId(id) });
        return student;
      } catch (error) {
        errorHandler(error);
      }
      
    },
    searchItems: async (root, { keyword }) => {
      let db;
      let items
      let courses
      let people
        try {
          db = await connectDB();
          courses = await db.collection('courses').find({$text:{ $search: keyword}}).toArray()
          people = await db.collection('students').find({$text:{ $search: keyword}}).toArray()
          
          items = [...courses,...people]
          return items
        } catch (error) {
          errorHandler(error);
        }
        
      },
  }
