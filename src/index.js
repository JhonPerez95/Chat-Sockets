require("dotenv").config();
const server = require("./server");

server.listen(port, (err) => {
  if (err) {
    throw new Error(err);
  }
  console.log(`Server started on ${port}`);
});
