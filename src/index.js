const express = require("express");
const app = express();
const cors = require("cors");
const sequelize = require("./config/db");

const {
  companies,
  branches,
  roles,
  users,
  projects,
  devices,
  clients,
  utils,
  login_logs,
  role_permissions,
  permissions,
  issues,
  positions,
  phenomenons,
  wbs,
  qpis,
  attachments,
  mapping,
} = require("./models");
const companyRoutes = require("./routes/companyRoutes");
const branchRoutes = require("./routes/branchRoutes");
const userRoutes = require("./routes/userRoutes");
const roleRoutes = require("./routes/roleRoutes");
const testRoutes = require("./routes/testRoutes")
const projectRoutes = require("./routes/projectRoutes")
const permissionRoutes = require("./routes/permissionRoutes")

app.use(cors());
app.use(express.json());

// const dotenv = require("dotenv");
// dotenv.config();

app.use("/takenaka", companyRoutes);
app.use("/takenaka", branchRoutes);
app.use("/takenaka", userRoutes);
app.use("/takenaka", roleRoutes);
app.use("/takenaka", testRoutes);
app.use("/takenaka", projectRoutes);
app.use("/takenaka", permissionRoutes);
app.use("/", (req, res) => {
  return res.send({ message: "Server is listening at localhost:5001" });
});

sequelize
  .sync()
  .then((result) => {
    app.listen(
      5001,
      "192.168.0.47",
      // app.listen(5000,
      () => {
        console.log("You are on port 5001");
      }
    );
  })
  .catch((err) => {
    console.log(err);
  });
