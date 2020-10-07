const { date, grade } = require('../../lib/utils')
const db = require('../../../config/db')

module.exports = {
  all(callback) {
    db.query(`
    SELECT *
    FROM students
    ORDER BY name ASC`, (err, results) => {
      if(err) {
        throw `Database ${err}`
      }

      callback(results.rows)
    })
  },
  create(data, callback) {
    const query = `
      INSERT INTO students(
        name,
        avatar_url,
        email,
        education_level,
        hours,
        birth_date,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `

    const values = [
      data.name,
      data.avatar_url,
      data.email,
      grade(data.education_level),
      data.hours,
      date(data.birth).iso,
      date(Date.now()).iso
    ]

    db.query(query, values, (err, results) => {
      if(err) {
        throw `Database ${err}`
      }

      callback(results.rows[0])
    })
  },
  find(id, callback) {
    db.query(`
      SELECT *
      FROM students
      WHERE id = $1`, [id], (err, results) => {
      if(err) {
        throw `Database ${err}`
      }

      callback(results.rows[0])
    })
  },
  update(data, callback) {
    const query = `
      UPDATE students SET
        avatar_url=($1),
        name=($2),
        email=($3),
        education_level=($4),
        hours=($5),
        birth_date=($6)
      WHERE id = $7
    `

    const values = [
      data.avatar_url,
      data.name,
      data.email,
      grade(data.education_level),
      data.hours,
      date(data.birth).iso,
      data.id
    ]

    db.query(query, values, (err, results) => {
      if(err) {
        throw `Database ${err}`
      }

      callback()
    })
  },
  delete(id, callback) {
    db.query(`
      DELETE FROM students
      WHERE id = $1`, [id], (err, results) => {
      if(err) {
        throw `Database ${err}`
      }

      return callback()
    })
  }
}