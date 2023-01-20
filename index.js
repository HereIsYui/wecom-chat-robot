var express = require("express");
var app = express();
const bodyParser = require('body-parser');
var router = express.Router();
const { main } = require('./main/main');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

router.post('/WeComMsg', (req, res) => {
    let msgInfo = req.body;
    main(msgInfo, res);
})



app.all('*', function (req, res, next) {
    //设为指定的域
    res.header('Access-Control-Allow-Origin', "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("X-Powered-By", ' 3.2.1');
    next();
});

app.use('/', router);
app.listen(3010, function () {
    console.log('Yui-WeCom-Server Start at:' + 3010);
});