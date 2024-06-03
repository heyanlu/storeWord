import { ACTIONS, LOGIN_STATUS } from "./constants";

export const initialState = {
    loginStatus: LOGIN_STATUS.NOT_LOGGED_IN, 
    username: "", 
    word: "", 
    isLoading: true, 
    error: "", 
}; 

export function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.LOG_IN: 
            return {
                ...state, 
                loginStatus: LOGIN_STATUS.IS_LOGGED_IN, 
                username: action.payload,
                isLoading: false, 
            }
        
        case ACTIONS.LOG_OUT:
            return {
                ...state, 
                loginStatus: LOGIN_STATUS.NOT_LOGGED_IN, 
                username: "", 
                isLoading: false,            
            }
        
        case ACTIONS.IS_LOADING:
            return {
                ...state, 
                isLoading: true, 
            }
        
        case ACTIONS.DISPLAY_WORD:
            return {
                ...state, 
                word: action.payload, 
            }
        
        case ACTIONS.UPDATE_WORD:
            return {
                ...state,
                word: action.payload,
            };
        
        case ACTIONS.REPORT_ERROR:
            return {
                ...state,
                error: action.error || "ERROR",
        };
    
        case ACTIONS.CLEAR_ERROR:
            return {
                ...state,
                error: ""
            }
          
    
        default:
            return state; 

    }
}

export default reducer; 