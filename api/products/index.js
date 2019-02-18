const express = require('express');

const router = express.Router();

const multer = require('multer');

const checkAuth = require('../../authorization/check-auth');

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './uploads/');
	},
	filename: function(req, file, cb) {
		cb(null, new Date().toISOString() + file.originalname);
	}
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		const error = new Error('UNSUPPORTED_FILE_ONLY_ACCEPTS_JPEG_OR_PNG');
		cb(error, false);
	}
};

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5
	},
	fileFilter: fileFilter
});

const { getProductById, getAllProducts, createProduct, updateProductById, deleteProductById } = require('./product.controller');

router.get('/', getAllProducts);

router.get('/:id', getProductById);

router.post('/', checkAuth, upload.single('productImage'), createProduct);

router.patch('/:id', checkAuth, updateProductById);

router.delete('/:id', checkAuth, deleteProductById);

module.exports = router;
