const express = require("express");
const app = express();
const port = 3001;

app.use(express.static("public"));
// app.use(express.json({ limit: "1mb" }));

// app.post("/api", (req, res) => {
//     const data = req.body;
//     console.log(data.text);
//     res.json({ status: "success" });
// });

app.listen(port, () => {
    console.log(`listening at ${port}`);
});
