var config = require('./mysql.config.js');

var pool = require('./pool.js');

pool.init(config);
console.log(pool);

pool.is_user_exists('fff', function(isExists) {
  if (isExists) {
    console.log('改用户存在');
  } else {
    console.log('该用户不存在')
  }
})
