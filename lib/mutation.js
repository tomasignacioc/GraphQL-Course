'use strict'

const connectDB = require('./db')

module.exports = {
    createCourse: async (root, {input}) => {
        let db
        let course
        try {
            db = connectDB()
            course = await db.collection('courses').insertOne(input)
        } catch (error) {
            console.log(error);
        }

        return course
    }
};
