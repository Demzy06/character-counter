import CountBox from "./CountBox"
import pattern_character from "../assets/pattern-character-count.svg";
import pattern_word from "../assets/pattern-word-count.svg"
import pattern_sentence from "../assets/pattern-sentence-count.svg"

export default function CountBoxContainer({ totalChar, wordCount, sentenceCount }) {
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
