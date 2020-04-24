'use strict'
const connectDb = require('./db');
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')

module.exports = {
    createCourse: async (root, { input }) => {
        const defaults = {
            teacher: '',
            topic: ''
        }
        const newCourse = Object.assign(defaults, input);
        let db
        let course
        try {
            db = await connectDb();
            course = await db.collection('courses').insertOne(newCourse)
            newCourse._id = course.insertedId
        } catch (error) {
            errorHandler(error)
        }

        return newCourse;
    },
    createStudent: async (root, { input }) => {
        let db
        let student
        try {
            db = await connectDb();
            student = await db.collection('student').insertOne(input)
            input._id = student.insertedId
        } catch (error) {
            errorHandler(error)
        }
        return input;
    },
    editCourse: async (root, { _id, input }) => {
        let db
        let course
        try {
            db = await connectDb();
            await db.collection('courses').updateOne(
                { _id: ObjectID() },
                { $set: input })
            course = await db.collection('courses').findOne({ _id: ObjectID(_id) })
        } catch (error) {
            errorHandler(error)
        }
        return course;
    }
    ,
    editStudent: async (root, { _id, input }) => {
        let db
        let student
        try {
            db = await connectDb();
            await db.collection('student').updateOne(
                { _id: ObjectID() },
                { $set: input })
            student = await db.collection('student').findOne({ _id: ObjectID(_id) })
        } catch (error) {
            errorHandler(error)
        }
        return student;
    },
    addPeople: async (root, { courseId, personId }) => {
        let db
        let course
        let person
        try {
            db = await connectDb();
            course = await db.collection('courses').findOne({ _id: ObjectID(courseId) })
            person = await db.collection('student').findOne({ _id: ObjectID(personId) })

            if (!course || !person) throw new Error('La persona o el curso no existe')

            await db.collection('courses').updateOne({ _id: ObjectID(courseId) },
                { $addToSet: { people: ObjectID(personId) } });

            course = await db.collection('courses').findOne({ _id: ObjectID(courseId) })

        } catch (error) {
            errorHandler(error)
        }

        return course
    }
}