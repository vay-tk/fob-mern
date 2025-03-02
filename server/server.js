import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;


// Middleware
app.use(cors());
app.use(express.json());



// Cloudinary setup
cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.VITE_CLOUDINARY_API_KEY,
  api_secret: process.env.VITE_CLOUDINARY_API_SECRET
});

// MongoDB setup
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.VITE_MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1); // Exit process on failure
  }
};

connectDB();

console.log('Cloudinary Config:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET ? '*****' : 'MISSING'
});


// Mongoose Schema
const formSchema = new mongoose.Schema({
  name: String,
  address: String,
  photoUrls: [String],  // Store multiple image URLs
  videoUrls: [String]   // Store multiple video URLs
});

const Form = mongoose.model('Form', formSchema);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload setup (memory storage for buffering files)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Function to upload files to Cloudinary
const uploadToCloudinary = (fileBuffer, resourceType) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: resourceType },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer);
  });
};

// POST route to handle form submission
app.post('/submit-form', upload.fields([
  { name: 'photo', maxCount: 10 },  // Match the field name from HTML
  { name: 'video', maxCount: 10 }
]), async (req, res) => {
  try {
    console.log('Received files:', req.files);  // Debugging line
    console.log('Received body:', req.body);

    if (!req.files || (!req.files.photo && !req.files.video)) {
      return res.status(400).json({ message: 'At least one photo or video is required' });
    }

    // Upload photos to Cloudinary
    const photoUrls = req.files.photo ? 
      await Promise.all(req.files.photo.map(file => uploadToCloudinary(file.buffer, 'image'))) 
      : [];

    // Upload videos to Cloudinary
    const videoUrls = req.files.video ? 
      await Promise.all(req.files.video.map(file => uploadToCloudinary(file.buffer, 'video'))) 
      : [];

    // Save form data to MongoDB
    const newForm = new Form({
      name: req.body.name,
      address: req.body.address,
      photoUrls,
      videoUrls
    });

    await newForm.save();

    res.json({ message: 'Form submitted successfully!', form: newForm });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
});

// GET route to fetch all submitted forms
app.get('/forms', async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching forms' });
  }
});

// Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
