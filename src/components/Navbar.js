import Logo from "../components/Logo";
export default function Navbar({ isDark, onHandleToggleTheme }) {
  return (
    <nav>
      <Logo isDark={isDark} onHandleToggleTheme={onHandleToggleTheme} />
    </nav>
  )
}
