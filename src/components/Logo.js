import logo_light from '../assets/logo-light-theme.svg'
import logo_dark from "../assets/logo-dark-theme.svg";
import icon_moon from '../assets/icon-moon.svg'
import icon_sun from "../assets/icon-sun.svg";


export default function Logo({ isDark, onHandleToggleTheme }) {
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