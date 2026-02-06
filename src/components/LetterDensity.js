import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";


export default function LetterDensity({ wordDensity }) {
  const [isLess, setIsLess] = useState(true)
  const wordDensityArr = Object.entries(wordDensity)
  const density = isLess ? wordDensityArr.slice(0, 5) : wordDensityArr

  console.log(density.length)

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

      {wordDensityArr.length > 5 &&
        <div div className="letter-density-expand">
          <p className="xo" onClick={() => setIsLess(cur => !cur)}>{isLess ? "See more" : "See less"}
            <FontAwesomeIcon icon={isLess ? faAngleDown : faAngleUp} className="angle-icon" />
          </p>
        </div>
      }
    </div >
  )
}