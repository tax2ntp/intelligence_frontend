import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"
import { Activity, Car, ChevronDown, Info, Upload } from "lucide-react"
import React from "react"
import { Link } from "react-router-dom"

const Home: React.FC = () => {
	return (
		<div className="pt-24 md:pt-32 pb-20 md:pb-40">
			<motion.div 
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="max-w-3xl mx-auto text-center"
			>
				<h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
         			 AI ทำนายที่แม่นยำ
				</h1>
				<p className="text-lg md:text-xl text-muted-foreground mb-10">
					ระบบวิเคราะห์อัตโนมัติด้วย AI ที่แม่นยำ เพียงอัปโหลดรูปภาพหรือกรอกข้อมูล
					ระบบจะทำการวิเคราะห์และให้ผลลัพธ์ที่ถูกต้องเชื่อถือได้ ไม่ว่าจะเป็นการจำแนกประเภทรถยนต์
					หรือการประเมินความเสี่ยงต่อภาวะโรคอ้วน
				</p>
				<div className="flex flex-col md:flex-row gap-4 justify-center mb-16">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button size="lg" className="gap-2">
								<Upload size={20} /> เริ่มทำนายเลย <ChevronDown className="h-4 w-4 ml-1" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem asChild>
								<Link to="/prediction" className="flex items-center gap-2 cursor-pointer">
									<Car className="h-4 w-4" /> ทำนายประเภทรถยนต์
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link to="/obesity-prediction" className="flex items-center gap-2 cursor-pointer">
									<Activity className="h-4 w-4" /> ทำนายความเสี่ยงโรคอ้วน
								</Link>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<Button asChild variant="outline" size="lg" className="gap-2">
						<Link to="/about">
							<Info size={20} /> เกี่ยวกับโมเดล
						</Link>
					</Button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<Card>
						<CardContent className="pt-6">
							<div className="flex flex-col items-center text-center">
								<div className="bg-primary/10 p-3 rounded-full mb-4">
									<Car className="h-6 w-6 text-primary" />
								</div>
								<h3 className="font-medium text-lg mb-2">จำแนกประเภทรถยนต์</h3>
								<p className="text-muted-foreground text-sm">
                  					ระบบสามารถแยกแยะรถยนต์ได้ 7 ประเภท ได้แก่ Sedan, SUV, Coupe, Convertible, Hatchback, Pick-Up และ VAN
								</p>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<div className="flex flex-col items-center text-center">
								<div className="bg-primary/10 p-3 rounded-full mb-4">
									<Activity className="h-6 w-6 text-primary" />
								</div>
								<h3 className="font-medium text-lg mb-2">ทำนายความเสี่ยงโรคอ้วน</h3>
								<p className="text-muted-foreground text-sm">
                 					วิเคราะห์ความเสี่ยงต่อภาวะโรคอ้วนจากข้อมูลสุขภาพและพฤติกรรม ด้วยโมเดล Machine Learning ที่แม่นยำ
								</p>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<div className="flex flex-col items-center text-center">
								<div className="bg-primary/10 p-3 rounded-full mb-4">
									<Info className="h-6 w-6 text-primary" />
								</div>
								<h3 className="font-medium text-lg mb-2">ประสิทธิภาพสูง</h3>
								<p className="text-muted-foreground text-sm">
                  					โมเดลใช้ Deep Learning และ Machine Learning ที่ผ่านการเทรนด้วยข้อมูลจำนวนมาก ให้ความแม่นยำสูง
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</motion.div>
		</div>
	)
}

export default Home