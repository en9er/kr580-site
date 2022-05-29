const router = require('express').Router()
const jwt = require('jsonwebtoken')
const fs = require("fs")
multer = require('multer')
let currentToken = ""
const PATH = '../shared/releases';
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname)
  }
});
let upload = multer({
  storage: storage
});

function checkToken(token){
  return token === currentToken
}

router.post('/upload-release', upload.single('file'), function (req, res) {
  if(!checkToken(req.cookies["jwt"]))
  {
    return res.status(200).send({
      message: "You dont have permissions to do this, mr. Hacker"
    })
  }
  if (!req.file) {
    return res.send({
      success: false
    });
  } else {
    return res.send({
      success: true
    })
  }
});

router.get('/releases', function (req, res){
  let files = []
  fs.readdir(PATH, function(err, files){
    files = files.map(function (fileName) {
      return {
        name: fileName,
        time: fs.statSync(PATH + '/' + fileName).mtime.getTime()
      };
    })
      .sort(function (a, b) {
        return b.time - a.time; })
      .map(function (v) {
        return v.name; });
    return res.status(200).send({
      files
    })
  });
})
router.get('/download-release',function(req,res,next){
  res.download(PATH + "/" + req.query["release"],function(err){
    if(err){
      next(err);}
  })
})
router.post('/delete-release', function (req, res){
  console.log(currentToken)
  if(!checkToken(req.body.token))
  {
    return res.status(200).send({
      message: "You dont have permissions to do this, mr. Hacker"
    })
  }


  let res_path = PATH + "/" + req.query["name"];
  console.log(res_path)
  if(fs.existsSync(res_path))
  {
    fs.rmSync(res_path)
    return res.status(200).send({
      message: "OK"
    })
  }
  else {
    return res.status(400).send({
      message: "file does not exist"
    })
  }

})

router.post('/login', async (req, res) => {
  if (req.body.login !== process.env.admin_login) {
    return res.status(404).send({
      message: 'user not found'
    })
  }
  if (req.body.password !== process.env.admin_password) {
    return res.status(400).send({
      message: 'invalid credentials'
    })
  }
  const token = jwt.sign({_id: process.env.admin_id}, "secret")
  currentToken = token
  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  })

  res.send({
    token
  })
})

router.post('/logout', (req, res) => {
  console.log("delete cookie")
  currentToken = ""
  res.cookie('jwt', '', {maxAge: 0})
  res.send({
    message: 'success'
  })
})
router.post('/isAdmin', (req, res) => {
  console.log(req.cookies["jwt"])
  console.log(currentToken)
  return res.status(200).send({
      message: checkToken(req.cookies["jwt"]).toString()
    })
})
module.exports = router;
