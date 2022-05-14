`use strict`
const { connectDB } = require("./db");
const { ObjectId } = require("mongodb")
module.exports = {
    courses: async () => {
      let db;
      let courses = [];
      try {
        db = await connectDB();
        courses = await db.collection("courses").find().toArray();
      } catch (error) {
        console.error(error);
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
        console.error(error);
      }
      
    },
    students: async () => {
      let db;
      let students = [];
      try {
        db = await connectDB();
        students = await db.collection("students").find().toArray();
        console.log(students);
        
      } catch (error) {
        console.error(error);
      }
      return students;
    },
    student: async (root, { id }) => {
    let db;
      try {
        db = await connectDB();
        let student = await db.collection('students').findOne({ _id: ObjectId(id) });
        return student;
      } catch (error) {
        console.error(error);
      }
      
    },
  }
