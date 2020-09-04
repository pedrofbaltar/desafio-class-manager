const fs = require('fs')
const data = require('../data.json')
const { age, date, graduation } = require('../until')

exports.index = (req, res) => {
  return res.render('teachers/index', { teachers: data.teachers })
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
  id = Number(data.teachers.length + 1)

  data.teachers.push({
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

    return res.redirect('/teachers')
  })
}

exports.create = (req, res) => {
  return res.render('teachers/create')
}

exports.show = (req, res) => {
  const { id } = req.params

  const foundTeacher = data.teachers.find((teacher) => {
    return teacher.id == id
  })

  if(!foundTeacher) {
    return ('Teacher not found!')
  }

  const teacher = {
    ...foundTeacher,

    services: foundTeacher.services.split(','),

    // birth: new Intl.DateTimeFormat('pt-BR').format(foundTeacher.birth), birthday date

    age: age(foundTeacher.birth),

    graduation: graduation(foundTeacher.education_level),
        
    created_at: new Intl.DateTimeFormat('pt-BR').format(foundTeacher.created_at)
  }

  return res.render('teachers/show', { teacher })
}

exports.edit = (req, res) => {
  const { id } = req.params

  const foundTeacher = data.teachers.find((teacher) => {
    return teacher.id == id
  })

  if(!foundTeacher) {
    return ('Teacher not found!')
  }

  const teacher = {
    ...foundTeacher,
    birth: date(foundTeacher.birth)
    
  }

  return res.render('teachers/edit', { teacher })
}

exports.update = (req, res) => {
  const { id } = req.body
  let index = 0

  const foundTeacher = data.teachers.find((teacher, foundIndex) => {
    if(id == teacher.id) {
      index = foundIndex

      return true
    }
  })

  if(!foundTeacher) {
    return res.send('Teacher not found!')
  }

  const teacher = {
    ...foundTeacher,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number.parseInt(req.body.id)
  }

  data.teachers[index] = teacher

  fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
    if(err) {
      return res.send('Write file error!')
    }

    return res.redirect(`/teachers/${id}`)
  })
}

exports.delete = (req, res) => {
  const { id } = req.body

  const filteredTeachers = data.teachers.filter(teacher => {
    return teacher.id != id
  })

  data.teachers = filteredTeachers

  fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
    if(err) {
      return res.render('Write file error!')
    }

    return res.redirect('/teachers')
  })
}