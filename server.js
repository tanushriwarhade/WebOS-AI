const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/webos");

// AI Route (Mock)
app.post("/ai", (req, res) => {
    const msg = req.body.message;

    let reply = "I don't understand.";

    if (msg.includes("open notepad")) {
        reply = "Opening Notepad...";
    } else {
        reply = "AI Response: " + msg;
    }

    res.json({ reply });
});

app.listen(5000, () => console.log("Server running on port 5000"));
