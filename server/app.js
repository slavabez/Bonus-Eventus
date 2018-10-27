const express = require("express");
const helmet = require("helmet");

const app = express();

// Initialize an express app with some security defaults
app.use(https).use(helmet());

// Application-specific routes
// Add your own routes here!
app.get("/example-path", async (req, res) => {
  res.json({ message: "Hello World!!!" });
});

// Serve static assets built by create-react-app
app.use(express.static("build"));

// If no explicit matches were found, serve index.html
app.get("*", function(req, res) {
  res.sendFile(__dirname + "/build/index.html");
});

app.use(notfound).use(errors);

function https(req, res, next) {
  if (process.env.NODE_ENV === "production") {
    const proto = req.headers["x-forwarded-proto"];
    if (proto === "https" || proto === undefined) {
      return next();
    }
    return res.redirect(301, `https://${req.get("Host")}${req.originalUrl}`);
  } else {
    return next();
  }
}

function notfound(req, res) {
  res.status(404).send("Not Found");
}

function errors(err, req, res) {
  console.log(err);
  res.status(500).send("something went wrong");
}

module.exports = app;
