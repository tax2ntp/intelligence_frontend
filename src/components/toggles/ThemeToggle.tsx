import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/useTheme"
import { Moon, Sun } from "lucide-react"

const ThemeToggle: React.FC =() => {
	const { theme, setTheme } = useTheme()

	const toggleTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	return (
		<Button 
			variant="ghost" 
			size="icon" 
			onClick={toggleTheme} 
			title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
		>
			{theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
		</Button>
	)
}

export default ThemeToggle