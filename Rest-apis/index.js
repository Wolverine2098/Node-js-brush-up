const express = require("express");
const app = express();

const PORT = 8000;
const data = require("./MOCK_DATA.json");
const fs = require("fs");

app.use(express.urlencoded({ extended: false }));
app.get("/get", (req, resp) => {
  const html = `<ul>
  ${data.map((user) => `<li>${user.first_name}</li>`).join("")}
  </ul>
  `;

  return resp.send(html);
});

app.get("/api/get", (req, resp) => {
  return resp.json(data);
});

app.get("/api/get/:id", (req, resp) => {
  const newId = Number(req.params.id);
  const filteredData = data.filter((user) => {
    if (user.id == newId) return user;
  });
  console.log(newId);
  return resp.json(filteredData);
});

app.post("/api/post", (req, res) => {
  console.log(req.body);
  const addData = req.body;
  JSON.stringify(data.push({ ...addData, id: data.length + 1 }));
  console.log("old data ", data);
  console.log("we have the new data", data);

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(data), (err) => {
    console.log(err);
  });
  return res.json(`successfully added new ID: ${data.length}`);
});

app.listen(PORT, (req, res) => {
  console.log(`server has started at port: ${PORT}`);
});
