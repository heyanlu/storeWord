const uuid = require("uuid").v4;   //import libray 

const sessions = {}; 


function addSession(username) {
    //uses the uuid library to generate a new unique session
    const sid = uuid(); 
    sessions[sid] = { username }; 
    return sid; 
}


function getSessionUser(sid) {
    if (!sid || !sessions[sid]) {
        return ""; 
    }
    return sessions[sid].username; 
}

function deleteSessin(sid) {
    delete sessions[sid]; 
}

function deleteSession(sid) {
    delete sessions[sid];
}

module.exports = {
    addSession,
    getSessionUser,
    deleteSession,
};