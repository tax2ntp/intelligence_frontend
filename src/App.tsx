import route from "@/Router"
import { ThemeProvider } from "@/providers/ThemeProvider"
import { RouterProvider } from "react-router-dom"
import "./App.css"

function App() {
	return (
		<ThemeProvider>
			<RouterProvider router={route} />
		</ThemeProvider>
	)
}

export default App