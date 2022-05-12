'use strict'

const courses = [
    {
        _id: 'anyid1',
        title: 'Mi titulo 1',
        teacher: 'Mi profesor',
        description: 'Una descripción',
        topic: 'progreso'
    }
    ,
    {
        _id: 'anyid2',
        title: 'Mi titulo 2',
        teacher: 'Mi profesor',
        description: 'Una descripción',
        topic: 'progreso'
    },
    {
        _id: 'anyid3',
        title: 'Mi titulo 3',
        teacher: 'Mi profesor',
        description: 'Una descripción',
        topic: 'progreso'
    }
]

module.exports = {
    Query:{
        courses: () => {
            return courses;
          },
        course: (root,args) => {
            const course = courses.filter((ele)=>ele._id === args.id)
            return course.pop()
          }
    }

  };