const express = require("express");
const connectDB = require("./config/db");
const config = require("config");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const auth = require("./middleware/auth");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const rfs = require("rotating-file-stream");

const LogStream = fs.createWriteStream(path.join(__dirname, `logs.log`), { flags: "a" });

const appLogStream = rfs.createStream("app.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "logs"),
});
const successLogStream = rfs.createStream("success.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "logs"),
});

const app = express();

//connect Database
connectDB();
app.use(cors());
morgan.token("admin", (req, res, param) => (req.user && req.user.name) || "");
app.use(
  morgan("combined", {
    skip: (req, res) => {
      return res.statusCode > 400;
    },
    stream: successLogStream,
  })
);
app.use(morgan("combined", { stream: appLogStream }));
app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] -:admin  ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
    { interval: "7d", stream: LogStream }
  )
);

// Init Middleware
app.use(express.json({ extended: true, limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

app.get("/", (req, res) => res.send("API Running"));

//Define User Routes
app.use("/api/user/auth", require("./routes/api/user/auth"));
app.use("/api/user/dashboard", require("./routes/api/user/dashboard"));
app.use("/api/user/invoice", require("./routes/api/user/invoice"));
app.use("/api/user/requests", require("./routes/api/user/requests"));

//Define Admin Routes
app.use("/api/admin/users", require("./routes/api/admin/users"));
app.use("/api/admin/auth", require("./routes/api/admin/auth"));
app.use("/api/admin/admins", require("./routes/api/admin/admins"));
app.use("/api/admin/invoice", require("./routes/api/admin/invoice"));
app.use("/api/admin/requests", require("./routes/api/admin/requests"));
app.use("/api/admin/dashboard", require("./routes/api/admin/dashboard"));
// app.use("/api/admin/orders", require("./routes/api/admin/orders"));

const PORT = process.env.PORT || 8005;

app.listen(PORT, () => console.log(`Server stated on port ${PORT}`));
//app.listen(4000, () => console.log(`Server stated on port ${4000}`));
