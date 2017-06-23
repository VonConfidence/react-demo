var mysql = require('mysql');

var pool = null;

function query(sql, params, callback) {
  pool.getConnection(function(err, conn) {
    if (err) {
      callback(err, null, null);
    } else {
      var queryObj = conn.query(sql, params, function(qerr, vals, fields) {
        console.log("sql语句:   " + queryObj.sql);
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

  var sql = 'SELECT * FROM users WHERE uname = ?';
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

exports.findUserById = function(uid, callback) {
  if (uid == null) {
    callback(null);
    return;
  }

  var sql = 'SELECT * FROM users WHERE uid = ?';
  query(sql, [uid], function(err, rows, fields) {
    if (err) {
      callback(null);
      throw err;
    } else {
      if (rows.length > 0) {
        callback(rows[0]);
      } else {
        callback(null);
      }
    }
  });
}

exports.getAllUsers = function(callback) {
  var sql = 'SELECT * FROM users';
  query(sql, [], function(err, rows, fields) {
    if (err) {
      callback(null);
      throw err;
    } else {
      if (rows.length > 0) {
        callback(rows);
      } else {
        callback(null);
      }
    }
  });
}

exports.findUserByNamePassowordType = function(uname, upass, callback) {
  var sql = 'SELECT * FROM users where uname = ? and upass = ?';
  query(sql, [
    uname, upass
  ], function(err, rows, fields) {
    if (err) {
      callback(null);
      throw err;
    } else {
      if (rows.length > 0) {
        callback(rows[0]);
      } else {
        callback(null);
      }
    }
  });
}

//////////////////////////////////////////////////////////////////
exports.addUser = function(uname, upass, callback) {
  var sql = "insert into " +
  "users(uname, upass) values(?,?)";
  query(sql, [
    uname, upass
  ], function(err, result) {
    if (err) {
      callback(null);
      console.log(err);
      throw err;
    } else {
      //console.log(result.insertId); //返回插入后对象的id
      callback(result);
    }
  })
}

exports.login = function(uname, upass, callback) {
  var sql = 'SELECT id,uname FROM users where uname = ? and upass = ?';
  query(sql, [
    uname, upass
  ], function(err, rows, fields) {
    if (err) {
      callback(null);
      throw err;
    } else {
      if (rows.length > 0) {
        callback(rows[0]);
      } else {
        callback(null);
      }
    }
  });
}

exports.addNews = function(newsObj, callback) {
  var sql = "insert into " +
  "tb_news(uniquekey, title, category, author_name, thumbnail_pic_s, thumbnail_pic_s02,thumbnail_pic_s03,url,date) values(?,?,?,?, ?,?,?,?,?)";

  var sqlSelect = 'select * from tb_news where uniquekey = ? ';
  query(sqlSelect, [newsObj.uniquekey], function(err, rows, fields) {
    if (err) {
      callback(false);
      throw err;
    } else {
      if (rows.length > 0) {
        callback(false)
        return;
      } else {
        query(sql, [
          newsObj.uniquekey,
          newsObj.title,
          newsObj.category,
          newsObj.author_name,
          encodeURIComponent(newsObj.thumbnail_pic_s),
          encodeURIComponent(newsObj.thumbnail_pic_s02),
          encodeURIComponent(newsObj.thumbnail_pic_s03),
          encodeURIComponent(newsObj.url),
          newsObj.date
        ], function(err, result) {
          if (err) {
            callback(false);
            console.log(err);
            throw err;
          } else {
            //console.log(result.insertId); //返回插入后对象的id
            callback(result);
          }
        })
      }
    }
  });

}

exports.is_news_exists = function(uniquekey, callback) {
  if (uniquekey == null) {
    callback(false);
    return;
  }

  var sql = 'select * from tb_news where uniquekey = ? ';
  query(sql, [uniquekey], function(err, rows, fields) {
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

exports.getAllNews = function(callback) {
  var sql = 'SELECT * FROM tb_news';
  query(sql, [], function(err, rows, fields) {
    if (err) {
      callback(null);
      throw err;
    } else {
      if (rows.length > 0) {
        callback(rows);
      } else {
        callback(null);
      }
    }
  });
}

exports.getNewsDetail = function(uniquekey, callback) {
  var sql = 'SELECT * FROM tb_news where uniquekey = ?';
  query(sql, [
    uniquekey
  ], function(err, rows, fields) {
    if (err) {
      callback(null);
      throw err;
    } else {
      if (rows.length > 0) {
        callback(rows[0]);
      } else {
        callback(null);
      }
    }
  });
}

exports.getComments = function(uniquekey, callback) {
  var sql = 'select tb_comments.id, uname, comments,datetime  from tb_comments, users where tb_comments.userid = users.id and tb_comments.uniquekey=?';
  query(sql, [
    uniquekey
  ], function(err, rows, fields) {
    if (err) {
      callback(null);
      throw err;
    } else {
      if (rows.length > 0) {
        callback(rows);
      } else {
        callback(null);
      }
    }
  });
}

exports.addComment = function(userid, uniquekey,comments,datetime, callback) {
  var sql = "insert into " +
  "tb_comments(id,userid, uniquekey, comments,datetime) values(null,?, ?, ?,?)";
  query(sql, [
    userid, uniquekey,comments,datetime
  ], function(err, result) {
    if (err) {
      callback(null);
      console.log(err);
      throw err;
    } else {
      //console.log(result.insertId); //返回插入后对象的id
      callback(result);
    }
  })
}

exports.addUserCollection = function(userid, uniquekey,datetime, callback) {
  ////////////////////////////////////////////////////////////////
  // 这里要做的是 判断用户是否添加过改文章 如果已经添加过 在返回null
  // /////////////////////////////////////////////////////////////
  var sql = "insert into " +
  "tb_collections(id,userid, uniquekey,datetime) values(null,?, ?, ?)";
  query(sql, [
    userid, uniquekey,datetime
  ], function(err, result) {
    if (err) {
      callback(null);
      console.log(err);
      throw err;
    } else {
      //console.log(result.insertId); //返回插入后对象的id
      callback(result);
    }
  })
}

exports.getCollection = function(userid,callback) {
  var sql = 'select tb_collections.id,title,userid,datetime,tb_collections.uniquekey from tb_collections,tb_news where tb_collections.userid = ? and tb_collections.uniquekey = tb_news.uniquekey;';
  query(sql, [userid], function(err, rows, fields) {
    if (err) {
      callback(null);
      throw err;
    } else {
      if (rows.length > 0) {
        callback(rows);
      } else {
        callback(null);
      }
    }
  });
}

exports.getComment = function(userid,callback) {
  var sql = 'select tb_comments.id,title,userid,datetime,comments, tb_comments.uniquekey from tb_comments,tb_news where tb_comments.userid = ? and tb_comments.uniquekey = tb_news.uniquekey;';
  query(sql, [userid], function(err, rows, fields) {
    if (err) {
      callback(null);
      throw err;
    } else {
      if (rows.length > 0) {
        callback(rows);
      } else {
        callback(null);
      }
    }
  });
}

// exports.updateUpassByUid = function(uid, newPass, callback) {
//   var sql = "update users set upass = ? where uid = ?";
//   query(sql, [newPass,uid], function(err, result) {
//     if (err) {
//       callback(null);
//       throw err;
//     }else {
//       //console.log(result);
//       callback(result); //更改成功为1 失败为0
//     }
//   });
// }
