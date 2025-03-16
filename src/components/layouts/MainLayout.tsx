import Footer from "@/components/footers/Footer"
import Navbar from "@/components/navbars/Navbar"
import React from "react"
import { Outlet } from "react-router-dom"

const MainLayout:React.FC = () => {
	return (
		<div className="main-layout w-full min-h-screen flex flex-col">
			<Navbar />
			<main className="main-content flex-grow">
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}

export default MainLayout