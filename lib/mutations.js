"use strict";
const { ObjectId } = require("mongodb");
const { connectDB } = require("./db");
const { student } = require("./queries");

module.exports = {
  createCourse: async (root, { input }) => {
    const defaults = {
      teacher: "",
      topic: "",
    };

    const newCourse = Object.assign(defaults, input);
    let db;
    let course;
    try {
      db = await connectDB();
      course = await db.collection("courses").insertOne(newCourse);
      newCourse["_id"] = course.insertedId;
    } catch (error) {
      console.error(error);
    }
    return newCourse;
  },
  createStudent: async (root, { input }) => {
    let db;
    let student;
    try {
      db = await connectDB();
      student = await db.collection("students").insertOne(input);
      input["_id"] = student.insertedId;
    } catch (error) {
      console.error(error);
    }
    return input;
  },
  editCourse: async (root, { _id, input }) => {
    let db;
    let course;
    try {
      db = await connectDB();
      await db
        .collection("courses")
        .updateOne({ _id: ObjectId(_id) }, { $set: input });
      course = await db.collection("courses").findOne({ _id: ObjectId(_id) });
    } catch (error) {
      console.error(error);
    }
    return course;
  },
  editStudent: async (root, { _id, input }) => {
    let db;
    let student;
    try {
      db = await connectDB();
      await db
        .collection("students")
        .updateOne({ _id: ObjectId(_id) }, { $set: input });
      student = await db.collection("students").findOne({ _id: ObjectId(_id) });
    } catch (error) {
      console.error(error);
    }
    return student;
  },
  deleteCourse: async (root, { _id }) => {
    let db;
    try {
      db = await connectDB();
      let result = await db.collection("courses").deleteOne({ _id: ObjectId(_id) });
      if (result.deletedCount === 1) {
        return("Successfully deleted one document.");
      } else {
        return("No documents matched the query. Deleted 0 documents.");
      }
    } catch (error) {
        console.log(error);
    }
  },
  deleteStudent: async(root , {_id}) => {
      let db
      try {
          db = await connectDB()
          let result = await db.collection("students").deleteOne({ _id: ObjectId(_id)})
          if (result.deletedCount === 1) {
            return("Successfully deleted one document.");
          } else {
            return("No documents matched the query. Deleted 0 documents.");
          }
      } catch (error) {
          console.log(error);
      }
  },
  addPeople: async(root , {courseID, personID} )=>{
    let db 
    let course
    let student
    try {
        db = await connectDB()
        course = await db.collection('courses').findOne({_id:ObjectId(courseID)})
        student = await db.collection('students').findOne({_id:ObjectId(personID)})

        if(!course || !student ) throw new Error("Person or course does not exist ")

        await db.collection('courses').updateOne(
            {_id: ObjectId(courseID)},
            {
                $addToSet:{ people : ObjectId(personID) },
                $currentDate: { lastModified: true }
            }
        )
        
        return course
    } catch (error) {
        console.log(error);
    } 
  }
};
