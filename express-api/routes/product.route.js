const router = require('express').Router();
const ProductsCtrl = require('../controllers/product.controller');

var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/tmp/my-uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg');
    }
})

var upload = multer({ storage: storage });
// var upload = multer({ dest: './uploads' });

module.exports = router.post('/', ProductsCtrl.createProduct)
    .get('/', ProductsCtrl.getProducts)
    .get('/:id', ProductsCtrl.getProductById)
    .put('/:id', ProductsCtrl.updateProduct)
    .put('/:id', ProductsCtrl.deleteProduct)
    .post('/create-user', upload.single('profilePic'), (req, res, next) => {
        var name = req.body.name;
        var email = req.body.email;
        var profilePic = req.file;

        return res.status(200).json({ message: `${name} created successfully` });
    })
