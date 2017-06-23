var mysql = require('mysql');

var pool = null;

function query(sql, params, callback) {
  pool.getConnection(function(err, conn) {
    if (err) {
      callback(err, null, null);
    } else {
      conn.query(sql, params, function(qerr, vals, fields) {
        //释放连接
        conn.release();
        //事件驱动回调
        callback(qerr, vals, fields);

      });
    }
  });
};

exports.init = function(config) {
  pool = mysql.createPool({host: config.HOST, user: config.USER, password: config.PSWD, database: config.DB, port: config.PORT})
}

exports.is_user_exists = function(uname, callback) {
  if (uname == null) {
    callback(false);
    return;
  }

  var sql = 'SELECT * FROM tb_user WHERE uname = ?';
  query(sql, [uname], function(err, rows, fields) {
    if (err) {
      callback(false);
      throw err;
    } else {
      if (rows.length > 0) {
        callback(true);
      } else {
        callback(false);
      }
    }
  });
};
