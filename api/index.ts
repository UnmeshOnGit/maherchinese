import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://unmeshsutar33_db_user:Mq1vy7xcj2chIlz6@cluster0.pg6xtap.mongodb.net/hotel_dhruvtaara?retryWrites=true&w=majority&appName=Cluster0";
const JWT_SECRET = process.env.JWT_SECRET || "dhruvtaara_secret_key_2026";

// Use a cached connection for serverless environments
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log("Connected to MongoDB");
    await seedData();
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

// Connect immediately but don't block
connectDB();

// Schemas
const variationSchema = new mongoose.Schema({
  type: String,
  price: Number
});

const dishSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.Mixed, required: true, unique: true },
  name: String,
  description: String,
  category: String,
  veg: Boolean,
  image: String,
  variations: [variationSchema],
  available: { type: Boolean, default: true },
  rating: Number,
  votes: Number
});

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const DishModel = mongoose.model("Dish", dishSchema);
const AdminModel = mongoose.model("Admin", adminSchema);

// Auth Middleware
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// API Routes
app.get("/api/dishes", async (req, res) => {
  try {
    const dishes = await DishModel.find().sort({ id: 1 });
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching dishes" });
  }
});

app.post("/api/admin/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await AdminModel.findOne({ username });
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id, username: admin.username }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.patch("/api/dishes/:id/availability", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { available } = req.body;
  try {
    // Try to find by numeric id first, then by string id
    let queryId: any = id;
    if (!isNaN(Number(id))) {
      queryId = Number(id);
    }
    
    const dish = await DishModel.findOneAndUpdate({ id: queryId }, { available }, { new: true });
    if (!dish) return res.status(404).json({ message: "Dish not found" });
    res.json(dish);
  } catch (error) {
    res.status(500).json({ message: "Error updating availability" });
  }
});

// Seed Initial Data
const seedData = async () => {
  try {
    // Use dynamic import for constants to avoid issues with extensions
    const { DHRUVTAARA_MENU } = await import("../constants.js").catch(() => import("../constants.ts")).catch(() => import("../constants"));
    
    // Upsert each dish to ensure new items are added
    for (const dish of DHRUVTAARA_MENU) {
      await DishModel.findOneAndUpdate(
        { id: dish.id },
        { $setOnInsert: dish },
        { upsert: true, new: true }
      );
    }
    console.log("Menu items synchronized with database");

    const adminCount = await AdminModel.countDocuments();
    if (adminCount === 0) {
      console.log("Creating default admin account...");
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await AdminModel.create({
        username: "admin",
        password: hashedPassword
      });
      console.log("Default admin created (admin/admin123)");
    }
  } catch (error) {
    console.error("Seeding error:", error);
  }
};

// Vite Integration and Static Serving
async function setupApp() {
  if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
    // Only import vite in development
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, '..', 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      // Check if we are in an API route first (though rewrites should handle this)
      if (req.path.startsWith('/api')) return;
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Only listen if not on Vercel
  if (!process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}

setupApp();

export default app;
