import { useState } from "react";

function WordPage({ onLogout, onUpdateWord, displayWord, error }) {
  const [inputWord, setInputWord] = useState(""); 

  function handleChange(e) {
    setInputWord(e.target.value); 
  }

  function handleSubmit(e) {
    e.preventDefault(); 
    onUpdateWord(inputWord); 
  }


  return (
    <>
       <h1 className="stored-word">{displayWord}</h1>
      <form className="form-word" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input-word"
          name="newWord"
          onChange={handleChange}
        />
        <button className="button-submit">Update</button>
      </form>
      <p className="input-error-message">{error}</p>
      <button className="button-logout" type="button" onClick={onLogout}>
        Logout
      </button>
    </>
  );
}

export default WordPage;