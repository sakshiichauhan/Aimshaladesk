import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative h-[1.3rem] w-[1.3rem]"
    >
      <Sun
        className={`absolute -top-0.5 inset-0 transition-all duration-300 ease-in-out w-[1.4rem] text-[var(--text)]
          ${theme === "dark" ? "rotate-90 scale-0 opacity-0 " : "rotate-0 scale-100 opacity-100"}`}
      />
      <Moon
        className={`absolute -top-0.5 inset-0 transition-all duration-300 ease-in-out w-[1.35rem] text-[var(--text)]
          ${theme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}