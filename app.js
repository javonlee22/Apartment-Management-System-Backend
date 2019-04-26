const express = require("express");
const app = express();
const http = require("http");
const mongoose = require("mongoose");
const mongoConnect = require("./util/database").mongoConnect;
const parser = require("body-parser");
const adminRoutes = require("./routes/admin");
const publicRoutes = require("./routes/public");
const tenantRoutes = require("./routes/tenants");

mongoose.connect("mongodb://localhost:27017/mngmt_sys", {
  useNewUrlParser: true
});

const server = http.createServer(app);

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use("/api/admin", adminRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/tenant", tenantRoutes);

//Connect to database
mongoConnect(() => {
  server.listen(process.env.PORT || 8080, () => {
    console.log("Listening on port 8080");
  });
});
