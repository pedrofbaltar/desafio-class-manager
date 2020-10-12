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
        created_at,
        teacher_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id
    `

    const values = [
      data.name,
      data.avatar_url,
      data.email,
      grade(data.education_level),
      data.hours,
      date(data.birth).iso,
      date(Date.now()).iso,
      data.teacher
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
      SELECT students.*, teachers.name AS teacher_name
      FROM students
      LEFT JOIN teachers ON (students.teacher_id = teachers.id)
      WHERE students.id = $1`, [id], (err, results) => {
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
        birth_date=($6),
        teacher_id=($7)
      WHERE id = $8
    `

    const values = [
      data.avatar_url,
      data.name,
      data.email,
      grade(data.education_level),
      data.hours,
      date(data.birth).iso,
      data.teacher,
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
  },
  teacherSelectedOptions(callback) {
    db.query(`SELECT name, id FROM teachers`, (err, results) => {
      if(err) {
        throw `Database ${err}`
      }

      callback(results.rows)
    })
  },
  paginate(params) {
    const {
      filter,
      limit,
      offset,
      callback
    } = params

    let query = "",
        filterQuery = "",
        totalQuery = `(
          SELECT count(*) FROM students
        ) AS total`

    if(filter) {
      filterQuery = `
        WHERE students.name ILIKE '%${filter}%'
        OR students.email ILIKE '%${filter}%'
      `

      totalQuery = `(
        SELECT count(*) FROM students
        ${filterQuery}
      ) AS total`
    }

    query = `
      SELECT students.*, ${totalQuery}
      FROM students
      ${filterQuery}
      LIMIT $1 OFFSET $2
    `

    db.query(query, [limit, offset], (err, results) => {
      if(err) {
        throw `Database ${err}`
      }

      callback(results.rows)
    })
  }
}