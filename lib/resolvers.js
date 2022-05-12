'use strict'

const courses = [
    {
        _id: 'anyid',
        title: 'Mi titulo 1',
        teacher: 'Mi profesor',
        description: 'Una descripción',
        topic: 'progreso'
    }
    ,
    {
        _id: 'anyid',
        title: 'Mi titulo 2',
        teacher: 'Mi profesor',
        description: 'Una descripción',
        topic: 'progreso'
    },
    {
        _id: 'anyid',
        title: 'Mi titulo 3',
        teacher: 'Mi profesor',
        description: 'Una descripción',
        topic: 'progreso'
    }
]

module.exports = {
    courses: () => {
      return courses;
    },
  };