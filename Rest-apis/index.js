const express = require("express");
const app = express();
const mongoose = require("mongoose");

const PORT = 8000;
const data = require("./MOCK_DATA.json");
const fs = require("fs");

mongoose
  .connect("mongodb://127.0.0.1:27017/user-profession")
  .then(() => {
    console.log("mongo DB connected successfully");
  })
  .catch((err) => {
    console.log("error connecting with mongo DB", err);
  });

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

app.use(express.urlencoded({ extended: false }));
app.get("/get", async (req, resp) => {
  const allUsers = await User.find({});
  const html = `<ul>
  ${allUsers
    .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
    .join("")}
  </ul>
  `;

  return resp.send(html);
});

app.get("/api/get", async (req, resp) => {
  resp.setHeader("x-Powered-By", "RG-Server");
  const userData = await User.find({});
  return resp.json(userData);
});

app
  .route("/api/users/:id")
  .get(async (req, resp) => {
    const filteredData = await User.findById(req.params.id);
    if (filteredData.length === 0) {
      return resp.status(404).json({ Error: "No user with such id exists" });
    }
    return resp.json(filteredData);
  })
  .patch(async (req, resp) => {
    await User.findByIdAndUpdate(req.params.id, { lastName: "changed Name" });

    resp.status(201).json("user updated");
  })
  .delete(async (req, resp) => {
    await User.findByIdAndDelete(req.params.id);
    resp.status(203).json("user Deleted");
  });

app.post("/api/post", async (req, res) => {
  console.log(req.body);
  const addData = req.body;
  if (
    !addData.first_name ||
    !addData.last_name ||
    !addData.email ||
    !addData.gender ||
    !addData.jobTitle
  ) {
    return res.status(400).json(`Bad input`);
  }
  await User.create({
    firstName: addData.first_name,
    lastName: addData.last_name,
    email: addData.email,
    gender: addData.gender,
    jobTitle: addData.jobTitle,
  });

  return res.status(201).json(`successfully added new user`);
});

app.listen(PORT, (req, res) => {
  console.log(`server has started at port: ${PORT}`);
});
