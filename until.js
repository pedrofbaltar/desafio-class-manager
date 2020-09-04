
module.exports = {
  age: timestamp => {
    const today = new Date()
    const birthDate = new Date(timestamp)

    let age = (today.getFullYear() - birthDate.getFullYear())
    const month = (today.getMonth() - birthDate.getMonth())
    
    if (month < 0 || month == 0 && today.getDate() <= birthDate()) {
      age = age - 1
    }

    return age
  },
  date: timestamp => {
    const date = new Date(timestamp)

    const year = date.getUTCFullYear()

    const month = `0${date.getUTCMonth() + 1}`.slice(-2)
    
    const day = `0${date.getUTCDate()}`.slice(-2)

    return(`${year}-${month}-${day}`)
  },
  classType: typeClass => {
    let classe = ""

    if(typeClass == 'distance') {
      classe = 'Distância'
    } if(typeClass == 'present') {
      classe = 'Presencial'
    }

    return classe
  },
  graduation: educationLevel => {
    let education = ""

    if(educationLevel == 'high_school') {
      education = 'Ensino Médio'
    } if(educationLevel == 'graduate') {
      education = 'Ensino Superior'
    } if(educationLevel == 'master') {
      education = 'Mestrado'
    } if(educationLevel == 'doctorate') {
      education = 'Doutorado'
    }
    
    return education
  },
  schoolGrade: educationLevel => {
    let education = ""

    if(educationLevel == '5fund') {
      education = '5º ano - Fundamental I'
    } if(educationLevel == '6fund') {
      education = '6º ano - Fundamental II'
    } if(educationLevel == '7fund') {
      education = '7º ano - Fundamental II'
    } if(educationLevel == '8fund') {
      education = '8º ano - Fundamental II'
    } if(educationLevel == '9fund') {
      education = '9º ano - Fundamental II'
    } if(educationLevel == '1hight-school') {
      education = '1º ano - Ensino médio'
    } if(educationLevel == '2hight-school') {
      education = '2º ano - Ensino médio'
    } if(educationLevel == '3hight-school') {
      education = '3º ano - Ensino médio'
    }

    return education
  }
}