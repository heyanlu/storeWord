const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

const sessions = require("./sessions");
const users = require("./users");

// Middleware
app.use(express.static("./dist"));
app.use(cookieParser());
app.use(express.json());

function authenticate(req, res) {
    //retrieve
    const sid = req.cookies.sid;
    const username = sessions.getSessionUser(sid); 

    //validate
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: "auth-missing" }); 
        return ""; 
    }
    return username; 
}


//get username 
app.get("/api/v1/session", (req, res) => {
    const username = authenticate(req, res); 
    if (!username) {
        return; 
    }
    //if successful, session information is sent in JSON format as { username: "..." }.
    res.status(200).json({ username });
})


app.post("/api/v1/session", (req, res) => {
    //get input 
    const { username } = req.body; 

    if (!users.isValid(username)) {
        return res.status(400).json({ error: "required-username" })
    }

    if (username === "dog") {
        return res.status(403).json({ error: "auth-insufficient" });
    }

    const sid = sessions.addSession(username);

    //send back to client 
    res.cookie("sid", sid);
    res.status(201).json({ username });
})


app.delete("/api/v1/session", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";
  
    if (sid) {
      res.clearCookie("sid");
    }
  
    if (username) {
      sessions.deleteSession(sid);
    }
  
    res.json({ loggedOut: true });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


//word
app.get("/api/v1/word", (req, res) => {
    const username = authenticate(req, res);
    if (!username) return;
  
    const storedWord = users.getWord(username);
    res.json({ storedWord });
});


app.patch("/api/v1/word", (req, res) => {
    const username = authenticate(req, res);
    if (!username) return;

    const { newWord } = req.body;

    const validateError = users.validateWord({ username, newWord });
    if (validateError) {
        return res.status(400).json({ error: validateError });
    }

    users[username] = newWord;
    res.status(200).json({ newWord });
});


