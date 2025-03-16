import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { AlertCircle, Car, Home } from "lucide-react"
import React from "react"
import { Link } from "react-router-dom"

const NotFound: React.FC = () => {
	return (
		<div className="container mx-auto flex flex-col items-center justify-center min-h-[80vh] px-4 py-16">
			<motion.div 
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
				className="text-center max-w-md"
			>
				<div className="flex justify-center mb-8">
					<div className="relative">
						<Car className="h-24 w-24 text-muted-foreground" />
						<div className="absolute -top-2 -right-2 bg-destructive rounded-full p-2">
							<AlertCircle className="h-6 w-6 text-destructive-foreground" />
						</div>
					</div>
				</div>

				<h1 className="text-3xl md:text-4xl font-bold mb-4">ไม่พบหน้าที่คุณต้องการ</h1>
        
				<p className="text-muted-foreground mb-8">
					ดูเหมือนว่าคุณกำลังมองหาหน้าที่ไม่มีอยู่ในระบบ 
					หรืออาจมีการเปลี่ยนเส้นทาง กรุณาตรวจสอบ URL หรือกลับไปยังหน้าหลัก
				</p>

				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Button asChild size="lg" className="gap-2">
						<Link to="/">
							<Home className="h-4 w-4" /> กลับไปยังหน้าหลัก
						</Link>
					</Button>
					<Button asChild variant="outline" size="lg" className="gap-2">
						<Link to="/prediction">
							<Car className="h-4 w-4" /> ไปยังหน้าทำนาย
						</Link>
					</Button>
				</div>
			</motion.div>
		</div>
	)
}

export default NotFound