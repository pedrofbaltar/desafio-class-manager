const { date, graduation } = require('../../lib/utils')
const db = require('../../../config/db')

module.exports = {
  all(callback) {
    db.query(`
    SELECT *
    FROM teachers
    ORDER BY name ASC`, (err, results) => {
      if(err) {
        throw `Database ${err}`
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
        throw `Database ${err}`
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
        throw `Database ${err}`
      }

      callback(results.rows[0])
    })
  },
  update(data, callback) {
    const query = `
      UPDATE teachers SET
        name=($1),
        avatar_url=($2),
        birth_date=($3),
        education_level=($4),
        class_type=($5),
        subjects_taught=($6),
      WHERE id = $7
    `

    const values = [
      data.name,
      data.avatar_url,
      date(data.birth).iso,
      graduation(data.education_level),
      data.classes,
      data.services,
    ]

    db.query(query, values, (err, results) => {
      if(err) {
        throw `Database ${err}`
      }

      callback()
    })
  }
}