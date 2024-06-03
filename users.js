const users = {}; 

function isValid(username) {
    if (!!username && username.trim() && username.match(/^[A-Za-z0-9_]+$/)) {
        return true;
    } else {
        return false;
    }
}


function getWord(username) {
    return users[username]; 
}


function validateWord({ username, newWord }) {
    let message = ""; 

    if(!newWord) {
        message = "word is null"; 
    }

    if(newWord.length > 20) {
        message = "word exceeds limit"; 
    }

    if (!message) {
        users[username] = newWord; 
    }
    return message; 
}


module.exports = {
    isValid, 
    validateWord,
    getWord,
}; 