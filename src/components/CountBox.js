export default function CountBox({ style, count, src, text }) {
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