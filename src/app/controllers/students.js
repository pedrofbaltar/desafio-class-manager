const fs = require('fs')
const data = require('../data.json')
const { age, date, grade } = require('../until')

exports.index = (req, res) => {
  const students = data.students

  for(let student of students) {
    student.grade = grade(student.education_level)
  }

  return res.render('students/index', { students: data.students })
}

exports.create = (req, res) => {
  return res.render('students/create')
}

exports.post = (req, res) => {
  const keys = Object.keys(req.body)

  // Validação
  for (key of keys) {
    if(req.body[key] == "") {
      return res.send('Por favor, preencha todos os campos!')
    }
  }

  birth = Date.parse(req.body.birth)

  let id = 1
  const lastStudent = data.students[data.students.length - 1]

  if(lastStudent) {
    id = lastStudent.id + 1
  }

  data.students.push({
    id,
    ...req.body,
    birth
  })

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if(err) {
      return res.send('Ocorreu um erro, tente novamente!')
    }

    return res.redirect('/students')
  })
}

exports.show = (req, res) => {
  const { id } = req.params
  const foundStudent = data.students.find((student) => {
    return student.id == id
  })

  if(!foundStudent) {
    return ('Student not found!')
  }

  const student = {
    ...foundStudent,
    grade: grade(foundStudent.education_level),
    age: age(foundStudent.birth),  
    birthDay: date(foundStudent.birth).birthDay
  }

  return res.render('students/show', { student })
}

exports.edit = (req, res) => {
  const { id } = req.params
  const foundStudent = data.students.find((student) => {
    return student.id == id
  })

  if(!foundStudent) {
    return ('Student not found!')
  }

  const student = {
    ...foundStudent,
    birth: date(foundStudent.birth).iso   
  }

  return res.render('students/edit', { student })
}

exports.update = (req, res) => {
  const { id } = req.body
  let index = 0

  const foundStudent = data.students.find((student, foundIndex) => {
    if(id == student.id) {
      index = foundIndex

      return true
    }
  })

  if(!foundStudent) {
    return res.send('Student not found!')
  }

  const student = {
    ...foundStudent,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number.parseInt(req.body.id)
  }

  data.students[index] = student

  fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
    if(err) {
      return res.send('Write file error!')
    }

    return res.redirect(`/students/${id}`)
  })
}

exports.delete = (req, res) => {
  const { id } = req.body
  const filteredStudents = data.students.filter(student => {
    return student.id != id
  })

  data.students = filteredStudents

  fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
    if(err) {
      return res.render('Write file error!')
    }

    return res.redirect('/students')
  })
}