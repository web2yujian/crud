var fs = require('fs');
var  Students = require('./students')
var express = require('express')
var router = express.Router()
router.get('/students',function (req,res) {
  // fs.readFile('./db.json', 'utf8', function (err, data) {
  // })
  Students.find(function (err,students) {
    if (err) {
      return res.status(500).send('Server error...');
    }
    res.render('index.html', {
      fruits: [
        {name:'苹果',english:'Apple',mean:'武'},
        {name:'香蕉',english:'Banana',mean:'汉'},
        {name:'西瓜',english:'Watermelon',mean:'加'},
        {name:'橘子',english:'Orange',mean:'油'},
      ],
      students: students,
    });
  })
})
router.get('/students/new',function (req,res) {
  res.render('new.html');
})
router.post('/students/new',function (req,res) {
  // console.log(req.body)
  Students.save(req.body,function (err) {
    if (err) {
      return res.status(500).send('Server error...');
    }
    res.redirect('/students')
  })
})
router.get('/students/edit',function (req,res) {
 // console.log(req.query.id)
  Students.findById(parseInt(req.query.id),function (err,student) {
    if (err) {
      return res.status(500).send('Server error...');
    }
    // console.log(student);
    res.render('edit.html',{
      student:student
    });
  })
})

router.post('/students/edit',function (req,res) {
// console.log(req.body)
  Students.updateById(req.body,function (err) {
    if (err) {
      return res.status(500).send('Server error...');
    }
    res.redirect('/students')
  })
})

router.get('/students/delete',function (req,res) {
   Students.deleteById(req.query.id,function (err) {
     if (err) {
       return res.status(500).send('Server error...');
     }
     res.redirect('/students')
   })
})




module.exports = router;
/*//第一种方式
module.exports = function (app){
  app.get('/',function (req,res) {
    fs.readFile('./db.json','utf8',function (err,data) {
      if(err){
        return res.status(500).send('Server error...');
      }
      // console.log(data);
      var students = JSON.parse(data).students
      res.render('index.html',{
        fruits:['苹果','香蕉','橘子','西瓜'],
        students:students,
      });
    })

  });

}*/
