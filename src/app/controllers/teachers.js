const { age, date, grade } = require('../../lib/utils')
const Teacher = require('../models/Teacher')

module.exports = {
  index(req, res) {
    Teacher.all(teachers => {
      return res.render('teachers/index', { teachers })
    })
  },
  create(req, res) {
    return res.render('teachers/create')
  },
  post(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if(req.body[key] == "") {
        return res.send('Por favor, preencha todos os campos!')
      }
    }

    Teacher.create(req.body, teacher => {
      return res.redirect(`/teachers/${teacher.id}`)
    })
  },
  show(req, res) {
    return
  },
  edit(req, res) {
    return
  },
  update(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if(req.body[key] == "") {
        return res.send('Por favor, preencha todos os campos!')
      }
    }

    return
  },
  delete(req, res) {
    return
  }
}