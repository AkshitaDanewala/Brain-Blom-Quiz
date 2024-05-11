const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors"); // Import cors package

// Database
require("./config/databaseConnection").connectDb();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Use cors middleware
app.use(cors({credentials:true, origin:true}));

// Routes
app.use("/api/users", require("./Routes/userRoutes"));
app.use("/api/quiz", require("./Routes/quizRoutes"));
app.use("/api/questions", require("./Routes/questionsRoutes"));
app.use("/api/attempts", require("./Routes/attemptsRoutes"));

app.listen(process.env.PORT, () =>
  console.log(`Server is running on ${process.env.PORT}`)
);
