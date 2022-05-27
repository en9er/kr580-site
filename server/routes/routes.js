const router = require('express').Router()
const jwt = require('jsonwebtoken')
const fs = require("fs")
multer = require('multer')

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

router.post('/upload-release', upload.single('file'), function (req, res) {
  console.log(req.file)
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
  console.log("releases")
  //files = fs.readdirSync(PATH)
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

router.get('/delete-release', function (req, res){
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

  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  })

  res.send({
    message: 'success'
  })
})

router.post('/logout', (req, res) => {
  res.cookie('jwt', '', {maxAge: 0})

  res.send({
    message: 'success'
  })
})

module.exports = router;
