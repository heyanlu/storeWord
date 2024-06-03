export const LOGIN_STATUS = {
    PENDING: "pending",
    NOT_LOGGED_IN: "notLoggedIn",
    IS_LOGGED_IN: "loggedIn",
};

export const MESSAGES = {
    "auth-missing": "",
    "network-error": "No network. Please check your Internet connection.",
    "required-username": "Username must be letters/numbers",
    "auth-insufficient": "Username cannot be 'dog'",
    "word is null": "Word cannot be empty",
    "word exceeds limit": "Word cannot exceed 20 letters",
    default: "Something went wrong, please come back later",
};
  
  
export const ACTIONS = {
    LOG_IN: "login",
    LOG_OUT: "logout",
    IS_LOADING: "loading",
    DISPLAY_WORD: "displayWord",
    UPDATE_WORD: "updateWord",
    REPORT_ERROR: "reportError",
    CLEAR_ERROR: "clearError",
};