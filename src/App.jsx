import { useEffect, useReducer } from "react";

import reducer, { initialState } from "./reducer";
import { LOGIN_STATUS, MESSAGES, ACTIONS } from "./constants";

import FormLogin from "./FormLogin";
import WordPage from "./WordPage";

import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchWord,
  fetchUpdateWord,
} from "./services";

import "./App.css";

function App() {
  //states
  const [state, dispatch] = useReducer(reducer, initialState); 

  //action functions
  //retrieve data from server and update the client-side state based on the server's response
  function checkSession() {
    //request to the server to retrieve session
    fetchSession()
      .then((data) => {
        //dispatch and update the client side data
        dispatch({ type: ACTIONS.LOG_IN, payload: data.username }); 
        return fetchWord();
      })
      .catch((err) => {
        if (err.error !== 'auth-missing') {
          dispatch({ type: ACTIONS.REPORT_ERROR, error: MESSAGES[err.error] });
        }
      });
  }

  function onLogin(username) {
    fetchLogin(username)
      .then((data) => {
        dispatch({ type: ACTIONS.LOG_IN, payload: data.username });
        return fetchWord();
      })
      .catch((err) => {
        if (err.error !== 'auth-missing') {
          dispatch({ type: ACTIONS.REPORT_ERROR, error: MESSAGES[err.error] });
        }
      });
  }

  function onLogout() {
    fetchLogout()
      .then(() => {
        dispatch({ type: ACTIONS.LOG_OUT });
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: MESSAGES[err.error] });
      });
  }

  function onUpdateWord(newWord) {
    fetchSession()
      .then((data) => {
        dispatch({ type: ACTIONS.LOG_IN, payload: data.username}); 
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: MESSAGES[err.error] });
        return Promise.reject(err); 
      })
      .then(() => {
        return fetchUpdateWord(newWord);
      })
      .then((data) => {
        dispatch({ type: ACTIONS.UPDATE_WORD, payload: data.newWord})
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: MESSAGES[err.error] });
      }); 
  }

  useEffect(() => {
    checkSession();
  }, []);


  return (
    <>
      <div>
      {state.loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && (
          <FormLogin
          onLogin={onLogin}
          error={state.error}
          dispatch={dispatch}
          />
        )}
        {state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
        <WordPage
          onLogout={onLogout}
          onUpdateWord={onUpdateWord}
          displayWord={state.word}
          error={state.error}
        />
        )}
      </div>
    </>
  )
}

export default App
