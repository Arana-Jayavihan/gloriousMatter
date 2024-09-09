// Import required modules
import express from "express"
import path from 'path'
import { fileURLToPath } from "url"
import cors from 'cors'
import helmet from "helmet"
import morgan from "morgan"
import bodyParser from 'body-parser'

// Routes Import
import userRoutes from './routes/userRoutes.js'
import noteRoutes from './routes/noteRoutes.js'

const filePath = fileURLToPath(import.meta.url);
const dirName = path.dirname(filePath);

// Initialize Express app
const app = express();

// Middleware to parse JSON request bodies
// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json())
app.use(express.static(path.join(dirName, "uploads")));
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan("common"))
app.use(cors())

// Routes
app.use("/api", userRoutes)
app.use("/api", noteRoutes)

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
