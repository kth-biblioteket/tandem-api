const database = require('./db');

//Hämta alla Events
const readLanguages = () => {
    return new Promise(function (resolve, reject) {
        const sql = `SELECT * FROM tll_languages  WHERE tll = 1  ORDER BY name_en`;
        database.db.query(database.mysql.format(sql,[]),(err, result) => {
            if(err) {
                console.error(err);
                reject(err.message)
            }
            resolve(result);
        });
    })
};

module.exports = {
  readLanguages
};