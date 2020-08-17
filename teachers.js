const fs = require('fs')
const data = require('./data.json')
const { age, graduation, date } = require('./until')

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
  })

  return res.redirect('teachers')
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