
'use strict'
const connectDb = require('./db');
const { ObjectID } = require('mongodb')

module.exports = {
    getCourses: async () => {
        let db
        let courses = [];
        try {
            courses = await db.collection('courses').find().toArray()
            console.log(courses);

        } catch (e) {
            console.error(e)
        }

        return courses;
    },
    getCourse: async (root, { id }) => {
        let db
        let course;
        try {
            db = await connectDb();
            course = await db.collection('courses').findOne({ _id: ObjectID(id) })
            console.log(course);

        } catch (e) {
            console.error(e)
        }

        return course;
    },
    getStudents: async () => {
        let db
        let students = [];
        try {
            db = await connectDb();
            students = await db.collection('student').find().toArray()
        } catch (e) {
            console.error(e)
        }

        return students;
    },
    getStudent: async (root, { id }) => {
        let db
        let student;
        try {
            db = await connectDb();
            student = await db.collection('student').findOne({ _id: ObjectID(id) })
        } catch (e) {
            console.error(e)
        }

        return student;
    }
}