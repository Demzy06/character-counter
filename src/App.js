import { useEffect, useRef, useState } from "react";
import logo_dark from "../src/assets/logo-dark-theme.svg";
import icon_sun from "../src/assets/icon-sun.svg";
import pattern_character from "../src/assets/pattern-character-count.svg";
import pattern_word from "../src/assets/pattern-word-count.svg"
import pattern_sentence from "../src/assets/pattern-sentence-count.svg"
import icon_info from "../src/assets/icon-info.png";
import light_bg from "../src/assets/bg-light-theme.png"
import dark_bg from '../src/assets/bg-dark-theme.png'
import logo_light from '../src/assets/logo-light-theme.svg'
import icon_moon from '../src/assets/icon-moon.svg'


export default function App() {
  const [text, setText] = useState("")
  const [excludeSPace, setExcludeSpace] = useState(false);
  const [charLimit, setCharLimit] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const divEl = useRef(null)
  const [bodyEl] = [...document.getElementsByTagName("body")];

  let counts = {}
  let density = {}

  const letterCount = text.match(/[a-zA-Z]/g)

  const totalChar = excludeSPace ? text.replaceAll(" ", "").split("").length : text.split("").length
  const wordCount = text.split(" ").filter((word) => word !== "").length
  const sentenceCount = text.split(".").filter(s => s !== "").length

  let xo = {}
  xo["percentage"] = 3
  console.log(xo["percentage"])

  function handleToggleSpace() {
    setExcludeSpace(curSpaceValue => !curSpaceValue)
  }

  function handleToggleLimit() {
    setCharLimit(charLimit => !charLimit)
  }

  function toggleTheme() {
    setIsDark(cur => !cur)
  }

  useEffect(function () {
    bodyEl.style.backgroundImage = isDark ? `url(${light_bg})` : `url(${dark_bg})`
  })

  letterCount?.forEach(word => {
    if (typeof counts[word] == "undefined") {
      counts[word] = 1
    } else {
      counts[word]++
    }
  })

  for (let word in counts) {
    density[word] = {
      count: counts[word],
      percentage: ((counts[word] / letterCount?.length) * 100).toFixed(2)
    }
  }

  return (
    <div ref={divEl} className="App" data-theme={isDark ? "light" : "dark"}>
      <Navbar onHandleToggleTheme={toggleTheme} isDark={isDark} />
      <Form setText={setText}
        text={text}
        onHandleToggleSpace={handleToggleSpace}
        excludeSPace={excludeSPace}
        charLimit={charLimit}
        onHandleToggleLimit={handleToggleLimit}
        totalChar={totalChar}
        divEl={divEl.current}
      />
      <CountBoxContainer totalChar={totalChar} wordCount={wordCount} sentenceCount={sentenceCount} />
      <LetterDensity wordDensity={density} />
    </div>
  );
}

function Navbar({ isDark, onHandleToggleTheme }) {
  return (
    <nav>
      <Logo isDark={isDark} onHandleToggleTheme={onHandleToggleTheme} />
    </nav>
  )
}

function Logo({ isDark, onHandleToggleTheme }) {
  return (
    <div className="logo-div">
      <header>
        <img src={isDark ? logo_light : logo_dark} alt="logo-dark-theme" />
      </header>
      <span>
        <img src={isDark ? icon_moon : icon_sun} alt="icon-sun" onClick={() => onHandleToggleTheme()} />
      </span>
    </div>
  )
}

function Form({ totalChar, text, setText, onHandleToggleSpace, excludeSPace, charLimit, onHandleToggleLimit }) {
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

function CountBoxContainer({ totalChar, wordCount, sentenceCount }) {
  const boxStyles1 = {
    backgroundColor: "#D3A0FA",
  }
  const boxStyles2 = {
    backgroundColor: "#FF9F00",
  }
  const boxStyles3 = {
    backgroundColor: "#FE8159",
  }
  return (
    <div className="count-main-container">
      <CountBox style={boxStyles1} src={pattern_character} text="Total Characters" count={totalChar} />
      <CountBox style={boxStyles2} src={pattern_word} text="Word Count" count={wordCount} />
      <CountBox style={boxStyles3} src={pattern_sentence} text="Sentence Count" count={sentenceCount} />
    </div>
  )
}

function CountBox({ style, count, src, text }) {
  return (
    <div className="count-container" style={style}>
      <div className="count-output" >
        <span>
          <h2>{count}</h2>
          <p>{text}</p>
        </span>
      </div>
      <img src={src} alt="pattern-character" />
    </ div>
  )
}

function LetterDensity({ wordDensity }) {
  const [isMore, setIsMore] = useState(false)
  const density = isMore ? Object.entries(wordDensity) : Object.entries(wordDensity).slice(0, 5)
  console.log(density)


  return (
    <div className="letter-density-container">
      <h2>Letter density</h2>
      {density.length === 0 ? <p>No characters found. Start typing to see letter density.</p> : null}
      <ul className="list-container">
        {density.map(charDensity =>
          <li className="list">
            <p>{charDensity[0].toLocaleUpperCase()}</p>
            <div>
              <progress value={charDensity[1].percentage} max="100" className="progress-bar"></progress>
            </div>
            <span>
              <p>{charDensity[1].count}</p>
              <p>({charDensity[1].percentage}%)</p>
            </span>
          </li>
        )}
      </ul>
      <div className="letter-density-expand">
        <p onClick={() => setIsMore(cur => !cur)}>See more</p>
        {/* <img></img> */}
      </div>
    </div>
  )
}