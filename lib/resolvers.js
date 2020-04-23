'use strict'

const courses = [
    {
        _id: 'Aanyid',
        title: 'Mi titulo 1',
        teacher: 'Mi profesor',
        description: 'Mi descripcion',
        topic: 'programacion'
    },
    {
        _id: 'Aanyid',
        title: 'Mi titulo 2',
        teacher: 'Mi profesor',
        description: 'Mi descripcion',
        topic: 'programacion'
    },
    {
        _id: 'Aanyid',
        title: 'Mi titulo 3',
        teacher: 'Mi profesor',
        description: 'Mi descripcion',
        topic: 'programacion'
    },
    {
        _id: 'Aanyid',
        title: 'Mi titulo 4',
        teacher: 'Mi profesor',
        description: 'Mi descripcion',
        topic: 'programacion'
    }
]

module.exports = {
    getCourses: () => {
        return courses
    }
}