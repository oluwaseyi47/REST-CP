const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();



let User = require("./models/User");
const { request } = require("https");

//Port
app.listen(7200, () => {
  console.log("Server is on port 7200");
});

app.get("/", (req, res) => {
  res.status(200).send("Hello");
});
app.get("/users", (req, res) => {
  User.find({}, (err, data) => {
    if (err) console.log(err);
    else res.status(200).json(data);
  });
});

app.post("/users/add", (req, res) => {
  const { name, age, occupation } = req.body;
  const newUser = new User({
    name,
    age,
    occupation,
  });
  newUser.save();
  res.send(newUser);
});

app.put("/users/edit/:id", async (req, res) => {
  let toEdit = req.params.id;
  let { name, age, occupation } = req.body;
  try {
    await User.findOneAndUpdate(
      { _id: toEdit },
      { $set: { name, age, occupation } }
    );
    res.status(200).send(`user ${toEdit} has been updated`);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/users/delete/:id", async (req, res) => {
  let toDelete = req.params.id;
  try {
    await User.findOneAndDelete({ _id: toDelete });
    res.status(200).end(`user ${toDelete} has been Deleted`);
  } catch (error) {
    console.log(error);
  }
});