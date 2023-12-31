const database = require('./db');

//Hämta alla Språk
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

const readHowManySpeak = (langid) => {
  return new Promise(function (resolve, reject) {
      const sql = `SELECT COUNT(id) as speaks FROM tll_users WHERE (lang_have_1 = ? OR lang_have_2 = ?) AND last_login > current_date - interval 6 month `;
      database.db.query(database.mysql.format(sql,[langid,langid]),(err, result) => {
          if(err) {
              console.error(err);
              reject(err.message)
          }
          resolve(result);
      });
  })
};

const readHowManyWant = (langid) => {
  return new Promise(function (resolve, reject) {
      const sql = `SELECT COUNT(id) as wants FROM tll_users WHERE (lang_want_1 = ? OR lang_want_2 = ?) AND last_login > current_date - interval 6 month `;
      database.db.query(database.mysql.format(sql,[langid,langid]),(err, result) => {
          if(err) {
              console.error(err);
              reject(err.message)
          }
          resolve(result);
      });
  })
};

module.exports = {
  readLanguages,
  readHowManySpeak,
  readHowManyWant
};