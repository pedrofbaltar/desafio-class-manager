
module.exports = {
  age: timestamp => {
    const today = new Date()
    const birthDate = new Date(timestamp)

    let age = (today.getFullYear() - birthDate.getFullYear())
    const month = (today.getMonth() - birthDate.getMonth())
    
    if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
      age = age - 1
    }

    return age
  },
  date: timestamp => {
    const date = new Date(timestamp)

    const year = date.getUTCFullYear()

    const month = `0${date.getUTCMonth() + 1}`.slice(-2)
    
    const day = `0${date.getUTCDate()}`.slice(-2)

    return {
      iso: `${year}-${month}-${day}`,
      birthDay: `${day}/${month}`
    }
  },
  classType: typeClass => {
    if(typeClass == 'distance') return 'Distância'
    if(typeClass == 'present') return 'Presencial'
  },
  graduation: educationLevel => {
    if(educationLevel == 'high_school') return 'Ensino Médio'
    if(educationLevel == 'graduate') return 'Ensio Superior'
    if(educationLevel == 'master') return 'Mestrado'
    if(educationLevel == 'doctorate') return 'Doutorado'
    
    return education
  },
  grade: educationLevel => {
    let education = ""

    if(educationLevel == '5EF') {
      education = '5º ano - Fundamental I'
    } if(educationLevel == '6EF') {
      education = '6º ano - Fundamental II'
    } if(educationLevel == '7EF') {
      education = '7º ano - Fundamental II'
    } if(educationLevel == '8EF') {
      education = '8º ano - Fundamental II'
    } if(educationLevel == '9EF') {
      education = '9º ano - Fundamental II'
    } if(educationLevel == '1EM') {
      education = '1º ano - Ensino médio'
    } if(educationLevel == '2EM') {
      education = '2º ano - Ensino médio'
    } if(educationLevel == '3EM') {
      education = '3º ano - Ensino médio'
    }

    return education
  }
}