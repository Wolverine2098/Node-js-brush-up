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
  resp.setHeader("x-Powered-By", "RG-Server");
  return resp.json(data);
});

app.get("/api/get/:id", (req, resp) => {
  const newId = Number(req.params.id);
  const filteredData = data.filter((user) => {
    if (user.id == newId) return user;
  });
  console.log(newId);
  if (filteredData.length === 0) {
    return resp.status(404).json({ Error: "No user with such id exists" });
  }
  console.log("here is filtered data", filteredData);
  return resp.json(filteredData);
});

app.post("/api/post", (req, res) => {
  console.log(req.body);
  const addData = req.body;
  if (
    !addData.first_name ||
    !addData.last_name ||
    !addData.email ||
    !addData.gender ||
    !addData.ip_address
  ) {
    return res.status(400).json(`Bad input`);
  }
  JSON.stringify(data.push({ ...addData, id: data.length + 1 }));
  console.log("old data ", data);
  console.log("we have the new data", data);

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(data), (err) => {
    console.log(err);
  });

  return res.status(201).json(`successfully added new ID: ${data.length}`);
});

app.listen(PORT, (req, res) => {
  console.log(`server has started at port: ${PORT}`);
});
