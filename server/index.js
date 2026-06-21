const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
    res.send("Amazon Clone Backend Running");
});

app.get("/api/test", (req, res) => {
    res.json({
        message: "Backend Connected Successfully!"
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});