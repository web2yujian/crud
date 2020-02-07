/*
students.js
数据操作文件模块
职责：操作文件中的数据，只处理数据，不关心业务
* */

var dbPath = './db.json'
var fs = require('fs')

//获取学生列表
exports.find = function (callback) {
  fs.readFile(dbPath,'utf8', function (err,data) {
    if(err){
      return callback(err)
    }
    callback(null,JSON.parse(data).students)
  })
}
//根据ID 获取单个学生
exports.findById = function (id,callback) {
  fs.readFile(dbPath,'utf8', function (err,data) {
    if(err){
      return callback(err)
    }
    var students = JSON.parse(data).students
    var ret = students.find(function (item) {
      return item.id === parseInt(id)
    })
    callback(null,ret)
  })
}

//添加保存学生
exports.save = function (student,callback) {
  fs.readFile(dbPath,'utf8', function (err,data) {
    if(err){
      return callback(err)
    }
    var students = JSON.parse(data).students
    student.id = students[students.length-1].id+1
    students.push(student)
    var fileData = JSON.stringify({
      students:students
    })
    fs.writeFile(dbPath,fileData,function (err,data) {
      if(err){
        return callback(err)
      }
      callback(null)
    })
  })
}

//更新学生
exports.updateById = function (student,callback) {
  fs.readFile(dbPath,'utf8', function (err,data) {
    if(err){
      return callback(err)
    }
    var students = JSON.parse(data).students
    student.id = parseInt(student.id)
    var stu = students.find(function (item) {
      return item.id === student.id
    })
    for(var key in student){
      stu[key] = student[key]
    }
    var fileData = JSON.stringify({
      students:students
    })
    fs.writeFile(dbPath,fileData,function (err) {
      if(err){
        return callback(err)
      }
      callback(null)
    })
  })
}

//删除学生
exports.deleteById = function (id,callback) {
  fs.readFile(dbPath,'utf8', function (err,data) {
    if(err){
      return callback(err)
    }
    var students = JSON.parse(data).students
    var index = students.findIndex(function (item) {
      return item.id === parseInt(id)
    })
    students.splice(index,1)
    var fileData = JSON.stringify({
      students:students
    })
    fs.writeFile(dbPath,fileData,function (err) {
      if(err){
        return callback(err)
      }
      callback(null)
    })
  })
}
