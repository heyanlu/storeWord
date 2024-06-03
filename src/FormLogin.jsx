import { useState } from "react";
import { ACTIONS } from "./constants";

function FormLogin({ onLogin, error, dispatch }) {
  const [username, setUsername] = useState("");

  function handleChange(e) {
    setUsername(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(username);
  }

  return (
    <form className="form-login" onSubmit={handleSubmit}>
      <input
        type="text"
        className="input-username"
        placeholder="Username..."
        onChange={handleChange}
      />
      <button className="button-login" type="submit">
        Login
      </button>
      <p className="input-error-message">{error}</p>
    </form>
  );
}

export default FormLogin;