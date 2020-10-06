const { age, date, grade, graduation } = require('../../lib/utils')
const db = require('../../../config/db')

module.exports = {
  all(callback) {
    db.query(`
    SELECT *
    FROM teachers
    ORDER BY name ASC`, (err, results) => {
      if(err) {
        throw `Data base ${err}`
      }

      callback(results.rows)
    })
  },
  create(data, callback) {
    const query = `
      INSERT INTO teachers(
        name,
        avatar_url,
        birth_date,
        education_level,
        class_type,
        subjects_taught,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `

    const values = [
      data.name,
      data.avatar_url,
      date(data.birth).iso,
      graduation(data.education_level),
      data.classes,
      data.services,
      date(Date.now()).iso
    ]

    db.query(query, values, (err, results) => {
      if(err) {
        throw `Data base ${err}`
      }

      callback(results.rows[0])
    })
  },
  find(id, callback) {
    db.query(`
      SELECT *
      FROM teachers
      WHERE id = $1`, [id], (err, results) => {
        if(err) {
          throw `Data base ${err}`
        }
      }
    )
  }
}