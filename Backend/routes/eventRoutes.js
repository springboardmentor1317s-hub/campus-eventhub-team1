const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createEvent } = require('../controllers/eventController'); 
const { isAuthenticated } = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'), 
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) cb(null, true);
  else cb(new Error('Only image files are allowed!'), false);
};
const upload = multer({ storage, fileFilter });


router.post('/create-event', isAuthenticated, upload.single('image'), createEvent);

router.get('/events', getEvents);
