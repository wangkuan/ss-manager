var app = express();
var router = express.Router();

app.set('views', './views/home');
router.get('/index', function (req, res, next) {
    res.render('home/index');
});