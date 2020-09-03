const fs = require('fs')
const data = require('../data.json')
const { age, graduation, date } = require('../until')

exports.index = (req, res) => {
  return res.render('students/index', { students: data.students })
}

exports.post = (req, res) => {
  const keys = Object.keys(req.body)

  // Validação
  for (key of keys) {
    if(req.body[key] == "") {
      return res.send('Por favor, preencha todos os campos!')
    }
  }
  
  let {
    avatar_url,
    name,
    education_level,
    classes,
    services,
    birth
  } = req.body

  birth = Date.parse(birth)
  created_at = Date.now()
  id = Number(data.students.length + 1)

  data.students.push({
    id,
    created_at,
    avatar_url,
    name,
    education_level,
    classes,
    services,
    birth
  })

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if(err) {
      return res.send('Ocorreu um erro, tente novamente!')
    }
  })

  return res.redirect('students')
}

exports.create = (req, res) => {
  return res.render('students/create')
}

exports.show = (req, res) => {
  const { id } = req.params

  const foundstudent = data.students.find((student) => {
    return student.id == id
  })

  if(!foundstudent) {
    return ('student not found!')
  }

  const student = {
    ...foundstudent,

    services: foundstudent.services.split(','),

    // birth: new Intl.DateTimeFormat('pt-BR').format(foundstudent.birth), birthday date

    age: age(foundstudent.birth),

    graduation: graduation(foundstudent.education_level),
    
    created_at: new Intl.DateTimeFormat('pt-BR').format(foundstudent.created_at)
  }

  return res.render('students/show', { student })
}

exports.edit = (req, res) => {
  const { id } = req.params

  const foundstudent = data.students.find((student) => {
    return student.id == id
  })

  if(!foundstudent) {
    return ('student not found!')
  }

  const student = {
    ...foundstudent,
    birth: date(foundstudent.birth)
    
  }

  return res.render('students/edit', { student })
}

exports.update = (req, res) => {
  const { id } = req.body
  let index = 0

  const foundstudent = data.students.find((student, foundIndex) => {
    if(id == student.id) {
      index = foundIndex

      return true
    }
  })

  if(!foundstudent) {
    return res.send('student not found!')
  }

  const student = {
    ...foundstudent,
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

  const filteredstudents = data.students.filter(student => {
    return student.id != id
  })

  data.students = filteredstudents

  fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
    if(err) {
      return res.render('Write file error!')
    }

    return res.redirect('/students')
  })
}