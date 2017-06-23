var express = require('express');
var router = express.Router();

var fetchUrl = require('fetch').fetchUrl;
var _ = require('lodash');
/*
  初始化数据库连接对象  (相当于java中的获取daoImpl对象)
 */
var config = require('../config/mysql.config.js');
var pool = require('../model/news_dao.js');
pool.init(config);

//////////////////////////////////////////////////

/*获取新闻  直接从API接口上获取*/
router.get('/news', function(req, res) {
  var type = req.query.type;
  var count = req.query.count;
  //console.log(req.query);
  var url = 'http://v.juhe.cn/toutiao/index?type=' + type + '&key=68a5edf415c81245d80ebc4c1450a44c';
  //res.json({data:'news'})
  fetchUrl(url, function(error, meta, body) {
    if (error) {
      console.log(error);
      jsonNewsArr = [];
      res.json(null);
    } else {
      var data = JSON.parse(body.toString());
      var news = data.result.data.slice(0, count); // 一个数组  原数组保持不变 索引从第0个到第count个
      //将获取到的数据插入到数据库中
      for (var i = 0; i < news.length; i++) {
        pool.addNews(news[i], function(result) {
        });

      }

      res.json({data: news})
    }

  });
})

// 从本地服务器上的数据库上面获取
router.get('/localNews', function() {
  pool.getAllNews(function(data) {
    res.json(data) //返回users数组
  })
})

router.get('/news_detail', function(req, res) {
  var uniquekey = req.query.uniquekey;
  // console.log(uniquekey)
  pool.getNewsDetail(uniquekey, function(data) {
    var url = decodeURIComponent(data.url);
    fetchUrl(url, function(error, meta, body) {
      //var htmlString = body.toString().replace(/<script[\s\S]*?<\/script>/g, "").replace(/<link[\s\S]*?\/>/g, "");
      var htmlString = body.toString().replace(/<head[\s\S]*?<\/head>/i, "").replace(/<script[\s\S]*?<\/script>/g, "");
      //var htmlString = body.toString().replace(/<meta[\s\S]*?>/g, "").replace(/<script[\s\S]*?<\/script>/g, "").replace(/<title[\s\S]*?<\/title>/g);
      res.json({data:htmlString});
    })
  })

});

router.get('/getComments', function(req, res) {
  var uniquekey = req.query.uniquekey;
  // console.log(uniquekey)
  pool.getComments(uniquekey, function(data) {
    res.json({data:data})
  })

});

router.get('/addComment', function(req, res) {
  var userid = req.query.userid;
  var uniquekey = req.query.uniquekey;
  var comments = req.query.comments;
  var datetime = new Date().format("yyyy-MM-dd  hh:mm:ss");
  // console.log(uniquekey)
  pool.addComment(userid,uniquekey,comments,datetime, function(data) {
    res.json({data:data})
  })

});


router.get('/addUserCollection', function(req, res) {
  var userid = req.query.userid;
  var uniquekey = req.query.uniquekey;
  var datetime = new Date().format("yyyy-MM-dd  hh:mm:ss");
  // console.log(uniquekey)
  pool.addUserCollection(userid,uniquekey,datetime, function(data) {
    res.json({data:data})
  })

});

router.get('/getCollection', function(req, res) {
  var userid = req.query.userid;

  pool.getCollection(userid, function(data) {
    res.json({data:data})
  })

});

router.get('/getComment', function(req, res) {
  var userid = req.query.userid;

  pool.getComment(userid, function(data) {
    res.json({data:data})
  })

});

router.get('/regist', function(req, res) {
  //console.log(req.query);
  var uname = req.query.username;
  var upass = req.query.password;
  pool.addUser(uname, upass, function(result) {
    if (result.insertId) {
      res.json({userid: result.insertId, NickUsername: uname})
    } else {
      res.json({userid: 0, NickUsername: '注册失败'});
    }
  });
})

router.post('/login', function(req, res) {
  //console.log(req.body);
  var json = JSON.parse(decodeURIComponent(req.body.json))
  var bodyData = JSON.parse(json);
  var uname = bodyData.username;
  var upass = bodyData.password;
  pool.login(uname, upass, function(result) {
    if (result) {
      res.json({data:{userid: result.id, userNickname: result.uname}})
    } else {
      res.json({data:null});
    }
  });
})


////////////////////////////////////////////////////////////////////
/*注册*/
// router.post('/regist', function(req, res) {
//   var uname = req.body.uname,
//
//   pool.addUser(uname, function(result) {
//     console.log(result);
//     if (result.insertId) {
//       res.render("MyError", {errMsg:"注册成功", errCode:1, nextPage: '/user_manage/admin_login.html'});
//     } else {
//       res.render("MyError", {errMsg:"注册失败", errCode:1, nextPage: '/user_manage/admin_regist.html'});
//     }
//   });
// });

router.get('/regist', function(req, res) {
  //console.log(req.query);
  var uname = req.query.username;
  var upass = req.query.password;
  pool.addUser(uname, upass, function(result) {
    if (result.insertId) {
      res.json({userid: result.insertId, NickUsername: uname})
    } else {
      res.json({userid: 0, NickUsername: '注册失败'});
    }
  });
})

/*修改密码*/
router.post('/updatePass', function(req, res) {
  var uid = req.body.uid;
  pool.updateUpassByUid(uid, upass, function(result) {
    if (result.affectedRows) {
      res.json({result: true});
    } else {
      res.json({result: false});
    }
  });
});

// 返回所有的用户
router.get('/', function(req, res) {
  pool.getAllUsers(function(data) {
    res.json(data) //返回users数组
  })
})

/* GET users listing. */
router.get('/isUserExists/:uname', function(req, res, next) {
  //res.send('respond with a resource');
  var uname = req.params.uname;
  pool.is_user_exists(uname, function(isExists) {
    res.json(isExists);
  })
});

router.get('/findUserById', function(req, res) {
  var uid = req.query.uid;
  pool.findUserById(uid, function(obj) {
    res.json(obj)
  })
});


Date.prototype.format = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1)
        ? (o[k])
        : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

module.exports = router;
