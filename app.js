var express = require('express');
var router = require('./router');
var bodyParser = require('body-parser');

var app = express();

app.engine('html',require('express-art-template'));

app.use('/node_modules/',express.static('./node_modules/'));
app.use('/public/',express.static('./public/'));
app.use(bodyParser.urlencoded({extended:false}));//配置中间插件
app.use(bodyParser.json());

// router(app); //第一种方法
app.use(router);

app.listen(3000,function () {
  console.log('app server is running...')
})
module.exports = app
