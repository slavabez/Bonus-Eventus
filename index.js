const app = require("./server/app");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
