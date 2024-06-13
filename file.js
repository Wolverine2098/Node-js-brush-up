const fs = require("fs");
fs.writeFileSync("./test.txt", "created using file sync");

fs.writeFile("./test.txt", "writing using async", (err) => {});
fs.appendFile("./test2.txt", "appending", (err) => {});
