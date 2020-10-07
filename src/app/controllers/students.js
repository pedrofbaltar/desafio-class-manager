const { date, grade, age } = require('../../lib/utils')
const Student = require('../models/Student')
const teachers = require('./teachers')

module.exports = {
  index(req, res) {
    Student.all(students => {
      return res.render('students/index', { students })
    })
  },
  create(req, res) {
    return res.render('students/create')
  },
  post(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if(req.body[key] == "") {
        return res.send('Por favor, preencha todos os campos!')
      }
    }

    Student.create(req.body, student => {
      return res.redirect(`/students/${student.id}`)
    })
  },
  show(req, res) {
    Student.find(req.params.id, student => {
      if(!student) {
        return res.send('Student not found!')
      }

      student.grade = student.education_level
      student.birthDay = date(student.birth_date).format
      student.age = age(student.birth_date)

      return res.render('students/show', { student })
    })
  },
  edit(req, res) {
    Student.find(req.params.id, student => {
      if(!student) {
        return res.send('Student not found!')
      }

      student.birth = date(student.birth_date).iso

      return res.render('students/edit', { student })
    })
  },
  update(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if(req.body[key] == "") {
        return res.send('Por favor, preencha todos os campos!')
      }
    }

    Student.update(req.body, () => {
      return res.redirect(`/students/${req.body.id}`)
    })
  },
  delete(req, res) {
    Student.delete(req.body.id, () => {
      return res.redirect('/students')
    })
  }
}