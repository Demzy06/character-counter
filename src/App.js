import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Form from "./components/Form";
import CountBoxContainer from "./components/CountBoxContainer";
import LetterDensity from "./components/LetterDensity";

import light_bg from "../src/assets/bg-light-theme.png"
import dark_bg from '../src/assets/bg-dark-theme.png'

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

