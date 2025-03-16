import ThemeToggle from "@/components/toggles/ThemeToggle"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Activity, Car, ChevronDown, Menu, X } from "lucide-react"
import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"

const Navbar: React.FC = () => {
	const location = useLocation()
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	const isActive = (path: string) => {
		return location.pathname === path
	}

	const toggleMobileMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen)
	}

	return (
		<header className="sticky top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between h-16">
					{/* Logo and brand */}
					<Link to="/" className="flex items-center gap-2">
						<Car className="h-6 w-6 text-primary" />
						<span className="font-bold text-lg">CarType AI</span>
					</Link>

					{/* Desktop navigation */}
					<nav className="hidden md:flex items-center gap-6">
						<Link 
							to="/" 
							className={`text-sm font-medium transition-colors hover:text-primary ${
								isActive("/") ? "text-primary" : "text-muted-foreground"
							}`}
						>
              				หน้าหลัก
						</Link>
						
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<button className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
									isActive("/prediction") || isActive("/obesity-prediction") ? "text-primary" : "text-muted-foreground"
								}`}>
									ทำนาย <ChevronDown className="h-4 w-4" />
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="center" className="w-48">
								<DropdownMenuItem asChild>
									<Link 
										to="/prediction" 
										className="flex items-center gap-2 cursor-pointer"
									>
										<Car className="h-4 w-4" /> ประเภทรถยนต์
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link 
										to="/obesity-prediction" 
										className="flex items-center gap-2 cursor-pointer"
									>
										<Activity className="h-4 w-4" /> ความเสี่ยงโรคอ้วน
									</Link>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						
						<Link 
							to="/about" 
							className={`text-sm font-medium transition-colors hover:text-primary ${
								isActive("/about") ? "text-primary" : "text-muted-foreground"
							}`}
						>
              				เกี่ยวกับ
						</Link>
					</nav>

					{/* Action buttons */}
					<div className="flex items-center gap-4">
						<ThemeToggle />
						<div className="hidden md:block">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button className="gap-2">
										ทำนาย <ChevronDown className="h-4 w-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end" className="w-56">
									<DropdownMenuItem asChild>
										<Link 
											to="/prediction" 
											className="flex items-center gap-2 cursor-pointer"
										>
											<Car className="h-4 w-4" /> ทำนายประเภทรถยนต์
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<Link 
											to="/obesity-prediction" 
											className="flex items-center gap-2 cursor-pointer"
										>
											<Activity className="h-4 w-4" /> ทำนายความเสี่ยงโรคอ้วน
										</Link>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>

						{/* Mobile menu button */}
						<Button 
							variant="ghost" 
							size="icon" 
							className="md:hidden" 
							onClick={toggleMobileMenu}
						>
							{mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
						</Button>
					</div>
				</div>
			</div>

			{/* Mobile navigation */}
			{mobileMenuOpen && (
				<div className="md:hidden border-t">
					<div className="container mx-auto px-4 py-3 space-y-1">
						<Link 
							to="/" 
							className={`flex py-2 text-sm font-medium ${
								isActive("/") ? "text-primary" : "text-muted-foreground"
							}`}
							onClick={toggleMobileMenu}
						>
              				หน้าหลัก
						</Link>
						<div className="py-2">
							<p className="text-sm font-medium text-muted-foreground mb-1">ทำนาย</p>
							<div className="pl-4 space-y-1">
								<Link 
									to="/prediction" 
									className={`flex items-center gap-2 py-1 text-sm font-medium ${
										isActive("/prediction") ? "text-primary" : "text-muted-foreground"
									}`}
									onClick={toggleMobileMenu}
								>
									<Car className="h-4 w-4" /> ประเภทรถยนต์
								</Link>
								<Link 
									to="/obesity-prediction" 
									className={`flex items-center gap-2 py-1 text-sm font-medium ${
										isActive("/obesity-prediction") ? "text-primary" : "text-muted-foreground"
									}`}
									onClick={toggleMobileMenu}
								>
									<Activity className="h-4 w-4" /> ความเสี่ยงโรคอ้วน
								</Link>
							</div>
						</div>
						<Link 
							to="/about" 
							className={`flex py-2 text-sm font-medium ${
								isActive("/about") ? "text-primary" : "text-muted-foreground"
							}`}
							onClick={toggleMobileMenu}
						>
              				เกี่ยวกับ
						</Link>
						<div className="pt-2 grid grid-cols-2 gap-2">
							<Button asChild size="sm">
								<Link to="/prediction" onClick={toggleMobileMenu}>
                  					<Car className="h-4 w-4 mr-1" /> ทำนายรถยนต์
								</Link>
							</Button>
							<Button asChild size="sm" variant="outline">
								<Link to="/obesity-prediction" onClick={toggleMobileMenu}>
                  					<Activity className="h-4 w-4 mr-1" /> ทำนายโรคอ้วน
								</Link>
							</Button>
						</div>
					</div>
				</div>
			)}
		</header>
	)
}

export default Navbar