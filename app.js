const express = require("express");
const path = require("path");

// Models
const userModel = require("./models/user.model");

const { connectDB } = require("./db/connectDB");
connectDB();

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/allusers", async (req, res) => {
  const allUsers = await userModel.find();
  res.render("users", { users: allUsers });
});

app.get("/edit/:userId", async (req, res) => {
    const user = await userModel.findOne({_id: req.params.userId});
    res.render("edit", { user });
});

// Post routes
app.post("/adduser", async (req, res) => {
  const { name, email, imageurl } = req.body;

  const createdUser = await userModel.create({
    name,
    email,
    imageString: imageurl,
  });

  res.redirect("/allusers");
});

app.post("/edit/:userId", async (req, res) => {
    const { name, email, imageurl } = req.body;
    const updatedUser = await userModel.findOneAndUpdate({_id: req.params.userId}, { name, email, imageString: imageurl }, { new: true });
    res.redirect("/allusers")
});

// Delete Route
app.get("/delete/:id", async (req, res) => {
    const deleteUser = await userModel.findOneAndDelete({_id: req.params.id})
    res.redirect("/allusers")
    
  });

app.listen(port, () => {
  console.log(`App is runnging on port ${port}`);
});
