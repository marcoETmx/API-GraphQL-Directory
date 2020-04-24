
'use strict'
const connectDb = require('./db');
const errorHandler = require('./errorHandler')
const { ObjectID } = require('mongodb')

module.exports = {
    getCourses: async () => {
        let db
        let courses = [];
        try {
            db = await connectDb();
            courses = await db.collection('courses').find().toArray()
            console.log(courses);

        } catch (e) {
            errorHandler(e)
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
    getPeople: async () => {
        let db
        let students = [];
        try {
            db = await connectDb();
            students = await db.collection('student').find().toArray()
        } catch (e) {
            errorHandler(e)
        }

        return students;
    },
    getPerson: async (root, { id }) => {
        let db
        let student;
        try {
            db = await connectDb();
            student = await db.collection('student').findOne({ _id: ObjectID(id) })
        } catch (e) {
            errorHandler(e)
        }

        return student;
    },

    searchItems: async (root, {
        keyword
    }) => {
        let db
        let items
        let courses
        let people

        try {
            db = await connectDb()
            courses = await db.collection('courses').find(
                { $text: { $search: keyword } }
            ).toArray()
            people = await db.collection('students').find({
                $text: {
                    $search: keyword
                }
            }).toArray()
            items = [...courses, ...people]
        } catch (error) {
            errorHandler(error)
        }

        return items
    }
}