import { useEffect, useRef, useState } from "react";
import icon_info from "../assets/icon-info.png";

export default function Form({ totalChar, text, setText, onHandleToggleSpace, excludeSPace, charLimit, onHandleToggleLimit }) {
  const [limit, setLimit] = useState()
  const [bodyEl] = [...document.getElementsByTagName("body")]
  const inputEl = useRef(null)

  function addInputOutline() {
    inputEl.current.classList.add("textarea-style")
  }

  function removeInputOutline() {
    inputEl.current.classList.remove("textarea-style")
  }

  useEffect(function () {
    if (totalChar > limit) {
      console.log("hey")
      inputEl.current.classList.add("textarea-disclamer-style")
    }
    if (totalChar <= limit && inputEl.current.value !== "") {
      inputEl.current.classList.remove("textarea-disclamer-style")
      addInputOutline()
      // inputEl.current.classList.add("textarea-style")
    }
  }, [totalChar, limit])

  useEffect(function () {
    bodyEl.addEventListener("click", function (e) {
      if (e.target !== inputEl.current) {
        removeInputOutline()
      }
    })
  }, [bodyEl])

  return (
    <div className="form-container">
      <h1>Analyze your text in real-time.</h1>
      <form>
        <textarea
          ref={inputEl}
          onClick={() => addInputOutline()}
          value={text}
          onChange={(e) => setText(e.target.value)} placeholder="Start typing here... (or paste your text here)" />
        {totalChar > limit ? (
          <div className="declaimer-message">
            <img src={icon_info} alt="info-icon" />
            <p>Limit reached! Your text exceeds {limit} characters</p>
          </div>) : null}

        <div className="checkboxs">
          <div>
            <label>
              <input type="checkbox" value={excludeSPace} onChange={() => onHandleToggleSpace()} />
              Exclude Spaces
            </label>
            <label >
              <input type="checkbox" value={charLimit} onChange={() => onHandleToggleLimit()} />
              Set Character Limit

              {charLimit && <input type="text" className="char-limit" value={limit} onChange={(e) => setLimit(e.target.value)} />}
            </label>
          </div>
          <p>Approx. reading time: X1 minute</p>
        </div>
      </form>
    </div >
  )
}