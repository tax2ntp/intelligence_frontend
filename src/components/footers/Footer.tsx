import { Activity, Car } from "lucide-react"
import React from "react"
import { Link } from "react-router-dom"

const Footer: React.FC = () => {
	return (
		<footer className="bg-muted/40 border-t py-12">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row justify-between">
					<div className="mb-8 md:mb-0">
						<div className="flex items-center gap-2 mb-4">
							<Car className="h-6 w-6 text-primary" />
							<span className="font-bold text-lg">CarType AI</span>
						</div>
						<p className="text-muted-foreground text-sm max-w-xs">
             				ระบบทำนายอัจฉริยะด้วย AI ที่แม่นยำ สามารถวิเคราะห์ประเภทรถยนต์และความเสี่ยงต่อโรคอ้วน
						</p>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-3 gap-8">
						<div>
							<h3 className="font-medium mb-3 text-sm">หน้า</h3>
							<ul className="space-y-2 text-sm">
								<li>
									<Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
										หน้าหลัก
									</Link>
								</li>
								<li>
									<Link to="/prediction" className="text-muted-foreground hover:text-primary transition-colors">
										ทำนายประเภทรถยนต์
									</Link>
								</li>
								<li>
									<Link to="/obesity-prediction" className="text-muted-foreground hover:text-primary transition-colors">
										ทำนายความเสี่ยงโรคอ้วน
									</Link>
								</li>
								<li>
									<Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
										เกี่ยวกับ
									</Link>
								</li>
							</ul>
						</div>

						<div>
							<h3 className="font-medium mb-3 text-sm">บริการของเรา</h3>
							<ul className="space-y-2 text-sm">
								<li className="flex items-center gap-1 text-muted-foreground">
									<Car className="h-3 w-3" /> ประเภทรถยนต์
								</li>
								<li className="text-muted-foreground pl-4">Sedan</li>
								<li className="text-muted-foreground pl-4">SUV</li>
								<li className="text-muted-foreground pl-4">Hatchback</li>
								<li className="text-muted-foreground pl-4">Pick-Up</li>
								<li className="flex items-center gap-1 text-muted-foreground mt-3">
									<Activity className="h-3 w-3" /> ภาวะโรคอ้วน
								</li>
							</ul>
						</div>

						<div>
							<h3 className="font-medium mb-3 text-sm">ติดต่อ</h3>
							<ul className="space-y-2 text-sm">
								<li className="text-muted-foreground">
									<a href="s6404062610413@email.kmutnb.ac.th" className="hover:text-primary transition-colors">
										s6404062610413@email.kmutnb.ac.th
									</a>
								</li>
								<li className="text-muted-foreground">
									<a href="https://github.com/tax2ntp" className="hover:text-primary transition-colors">
										GitHub
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
					<p>&copy; {new Date().getFullYear()} AI Predictor. สงวนลิขสิทธิ์</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer