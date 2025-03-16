import MainLayout from "@/components/layouts/MainLayout"
import About from "@/pages/About"
import Home from "@/pages/Home"
import NotFound from "@/pages/NotFound"
import ObesityPrediction from "@/pages/ObesityPrediction"
import Prediction from "@/pages/Prediction"
import { createBrowserRouter } from "react-router-dom"

const route = createBrowserRouter([
	{
		path: "/",
		element: (<MainLayout />),
		loader: async ({ request }: { request: Request }) => {
			try {
				console.log(request)
			} finally {
				//
			}
		},

		children: [
			{
				index: true,
				element: <Home />
			},
			{
				path: "/prediction",
				element: <Prediction />
			},
			{
				path: "/obesity-prediction",
				element: <ObesityPrediction />
			},
			{
				path: "/about",
				element: <About />
			},
		]
	},
	{
		path: "*",
		element: <NotFound />
	}
])

export default route