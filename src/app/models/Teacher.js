const { age, date, grade } = require('../../lib/utils')
const db = require('../../../config/db')

module.exports = {
  all(callback) {
    db.query(`
      SELECT *
      FROM teachers
      ORDER BY name ASC`, (err, results) => {
        if(err) {
          throw `Data base error: ${err}`
        }

        callback(results.rows)
      }
    )
  }
}