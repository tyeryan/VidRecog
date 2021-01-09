const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const fs = require('fs')
const shell = require('shelljs')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
)
app.use(cookieParser())
app.use(fileUpload())
app.use('/public', express.static(__dirname + '/public'))

const processImage = async (imagePath) => {
  try {
    const filepath = "./tmp/" + imagePath
    shell.exec(`${__dirname}/services/script.sh`, {
      filepath : filepath
    })
    // const parsedJson = await storage.bucket('journey-storage').upload(filepath, {
    //   gzip: true,
    //   metadata: {
    //     cacheControl: 'no-cache',
    //   },
    // });
    return "Hello";
  } catch (err) {
    console.error(err);
  }
};

var imageDir = './tmp'
if (!fs.existsSync(imageDir)){
  fs.mkdirSync(imageDir);
}

app.get('/files', async (req, res, next) => {
  var response = require("./data.json")
  res.json(response)
})

app.post('/upload', async (req, res, next) => {
  let uploadFile = req.files.file
  const fileName = req.files.file.name
  await uploadFile.mv(
    `${imageDir}/${fileName}`,
    function (err) {
      if (err) {
        console.log(err)
        return res.status(500).send(err)
      }

      // res.json({
      //   file: `${imageDir}/${req.files.file.name}`,
      // })
    },
  )
  extName = path.extname(`${imageDir}/${fileName}`)
  shell.mv(`./tmp/${fileName}`, `./tmp/image${extName}`)
  try {
    json = await processImage(fileName);
    var response = require("./data.json")
    res.json(response)
  } catch (e) {
    throw new Error("Process image error")
  }
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app