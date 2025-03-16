import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import React from "react"

const About: React.FC = () => {
	return (
		<div className="pt-24 md:pt-32 pb-20 md:pb-40">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="max-w-3xl mx-auto w-full"
			>
				<h1 className="text-3xl md:text-4xl font-bold text-center mb-6">เกี่ยวกับระบบทำนาย AI</h1>
				<p className="text-muted-foreground text-center mb-12">
					ระบบใช้เทคโนโลยี AI ในการวิเคราะห์และทำนายข้อมูล ทั้งการจำแนกประเภทรถยนต์และการประเมินความเสี่ยงโรคอ้วน
				</p>

				<div className="grid grid-cols-1 w-full">
					<Tabs defaultValue="cartype" className="mb-12 w-full max-w-3xl">
						<TabsList className="grid w-full grid-cols-4 tabs-no-border">
							<TabsTrigger value="cartype" className="hover:cursor-pointer">ระบบจำแนกรถยนต์</TabsTrigger>
							<TabsTrigger value="obesity" className="hover:cursor-pointer">ระบบทำนายโรคอ้วน</TabsTrigger>
							<TabsTrigger value="data" className="hover:cursor-pointer">ข้อมูลที่ใช้</TabsTrigger>
							<TabsTrigger value="usage" className="hover:cursor-pointer">การใช้งาน</TabsTrigger>
						</TabsList>
					
						<TabsContent value="cartype" className="mt-6 w-full">
							<Card className="!w-full ">
								<CardHeader>
									<CardTitle>โมเดล EfficientNet-B3</CardTitle>
									<CardDescription>
										โมเดลที่ใช้ในการจำแนกประเภทรถยนต์
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<p>
										โครงการนี้ใช้โมเดล <strong>EfficientNet-B3</strong> ซึ่งเป็นโมเดล Convolutional Neural Network (CNN) 
										ที่มีประสิทธิภาพสูงในการจำแนกรูปภาพ โดยเป็นโมเดลที่ได้รับการพัฒนาโดย Google Research
									</p>
							
									<h3 className="text-lg font-medium mt-4 mb-2">สถาปัตยกรรมโมเดล</h3>
									<ul className="list-disc pl-5 space-y-1">
										<li>ใช้ EfficientNet-B3 เป็นโมเดลพื้นฐาน</li>
										<li>เพิ่มชั้น Dropout เพื่อป้องกัน Overfitting</li>
										<li>ปรับแต่งชั้น Classifier เพื่อให้เหมาะกับการจำแนก 7 ประเภทรถยนต์</li>
										<li>ใช้เทคนิค Transfer Learning โดยการโหลดค่าน้ำหนักจาก ImageNet</li>
									</ul>

									<h3 className="text-lg font-medium mt-4 mb-2">การฝึกฝนโมเดล</h3>
									<ul className="list-disc pl-5 space-y-1">
										<li>ใช้ Adam Optimizer ด้วย Learning Rate เริ่มต้นที่ 0.001</li>
										<li>ใช้ Learning Rate Scheduler แบบ ReduceLROnPlateau</li>
										<li>ฝึกฝนเป็นเวลา 30 epochs</li>
										<li>ใช้ Data Augmentation เพื่อเพิ่มความหลากหลายของข้อมูล</li>
										<li>บันทึกโมเดลที่ให้ความแม่นยำสูงสุดกับชุดข้อมูล Validation</li>
									</ul>

									<h3 className="text-lg font-medium mt-4 mb-2">การเตรียมข้อมูล</h3>
									<p>
										ข้อมูลได้รับการเตรียมโดยใช้เทคนิค Data Augmentation ต่างๆ ได้แก่:
									</p>
									<ul className="list-disc pl-5 space-y-1">
										<li>การหมุนรูปภาพ (Rotation)</li>
										<li>การพลิกภาพในแนวนอน (Horizontal Flip)</li>
										<li>การปรับขนาดและตัดภาพแบบสุ่ม (Random Resized Crop)</li>
										<li>การปรับความสว่าง ความคมชัด ความอิ่มตัว และโทนสี (Color Jitter)</li>
									</ul>

									<h3 className="text-lg font-medium mt-4 mb-2">ประสิทธิภาพ</h3>
									<p>
										โมเดลนี้มีความแม่นยำมากกว่า 90% ในการจำแนกประเภทรถยนต์ทั้ง 7 ประเภท
										โดยมีประสิทธิภาพสูงในการจำแนกประเภทรถยนต์ที่มีลักษณะแตกต่างกันชัดเจน เช่น Sedan, SUV, และ Pick-Up
									</p>
									
								</CardContent>
							</Card>
						</TabsContent>
                          
						<TabsContent value="obesity" className="mt-6 w-full">
							<Card className="!w-full ">
								<CardHeader>
									<CardTitle>โมเดล SVM และ KNN Ensemble</CardTitle>
									<CardDescription>
									โมเดลที่ใช้ในการทำนายความเสี่ยงต่อภาวะโรคอ้วน
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<p>
									ระบบทำนายความเสี่ยงโรคอ้วนใช้การผสมผสานระหว่างโมเดล <strong>Support Vector Machine (SVM)</strong> และ 
										<strong> K-Nearest Neighbors (KNN)</strong> ในรูปแบบ Ensemble Learning เพื่อเพิ่มความแม่นยำในการทำนาย
									</p>
							
									<h3 className="text-lg font-medium mt-4 mb-2">โมเดลที่ใช้</h3>
									<ul className="list-disc pl-5 space-y-1">
										<li>SVM ด้วย Linear Kernel สำหรับการแบ่งประเภทข้อมูลที่ซับซ้อน</li>
										<li>KNN โดยใช้ค่า k=5 เพื่อจัดกลุ่มข้อมูลตามความใกล้เคียง</li>
										<li>Voting Classifier แบบ Hard Voting ที่ผสมผสานการทำนายจากทั้งสองโมเดล</li>
										<li>ใช้ StandardScaler ในการปรับสเกลข้อมูลให้เหมาะสมก่อนนำเข้าโมเดล</li>
									</ul>

									<h3 className="text-lg font-medium mt-4 mb-2">ผลลัพธ์การทำนาย</h3>
									<p>โมเดลจะแบ่งความเสี่ยงต่อภาวะโรคอ้วนออกเป็น 5 ระดับ:</p>
									<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
										<div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
											<span className="font-medium text-green-600 dark:text-green-400">N - ปกติ (Normal)</span>
										</div>
										<div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
											<span className="font-medium text-red-600 dark:text-red-400">O - อ้วน</span>
										</div>
									</div>

									<h3 className="text-lg font-medium mt-4 mb-2">การฝึกฝนโมเดล</h3>
									<ul className="list-disc pl-5 space-y-1">
										<li>แบ่งข้อมูลออกเป็น Training Set (80%) และ Test Set (20%)</li>
										<li>ใช้ Cross-Validation เพื่อหาค่าพารามิเตอร์ที่เหมาะสมที่สุด</li>
										<li>ปรับแต่งพารามิเตอร์ของโมเดลด้วย Grid Search</li>
										<li>วัดประสิทธิภาพด้วย Accuracy, Precision, Recall, และ F1-score</li>
									</ul>

									<h3 className="text-lg font-medium mt-4 mb-2">ประสิทธิภาพ</h3>
									<p>
									โมเดลมีความแม่นยำประมาณ 95% ในการทำนายความเสี่ยงต่อภาวะโรคอ้วน โดยใช้ตัวชี้วัดเชิงปริมาณและพฤติกรรม
									นอกจากนี้ โมเดลยังแสดงความสำคัญของปัจจัยต่างๆ ที่มีผลต่อการทำนาย ทำให้ผู้ใช้เข้าใจถึงปัจจัยที่มีผลต่อความเสี่ยง
									</p>
								</CardContent>
							</Card>
						</TabsContent>
					
						<TabsContent value="data" className="mt-6 w-full">
							<Card className="!w-full grid grid-cols-1 w-full">
								<CardHeader>
									<CardTitle>ข้อมูลที่ใช้ฝึกฝนโมเดล</CardTitle>
									<CardDescription>
										รายละเอียดเกี่ยวกับชุดข้อมูลที่ใช้ในการฝึกฝนโมเดล
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<Tabs defaultValue="car-data" className="w-full">
										<TabsList className="w-full grid grid-cols-2 tabs-no-border">
											<TabsTrigger value="car-data">ข้อมูลรถยนต์</TabsTrigger>
											<TabsTrigger value="obesity-data">ข้อมูลโรคอ้วน</TabsTrigger>
										</TabsList>
                                        
										<TabsContent value="car-data" className="mt-4">
											<h3 className="text-lg font-medium mb-2">ประเภทรถยนต์ที่รองรับ</h3>
											<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
												<div className="bg-primary/10 p-3 rounded-lg">
													<span className="font-medium">Sedan</span>
												</div>
												<div className="bg-primary/10 p-3 rounded-lg">
													<span className="font-medium">SUV</span>
												</div>
												<div className="bg-primary/10 p-3 rounded-lg">
													<span className="font-medium">Hatchback</span>
												</div>
												<div className="bg-primary/10 p-3 rounded-lg">
													<span className="font-medium">Pick-Up</span>
												</div>
												<div className="bg-primary/10 p-3 rounded-lg">
													<span className="font-medium">Coupe</span>
												</div>
												<div className="bg-primary/10 p-3 rounded-lg">
													<span className="font-medium">Convertible</span>
												</div>
												<div className="bg-primary/10 p-3 rounded-lg">
													<span className="font-medium">VAN</span>
												</div>
											</div>

											<h3 className="text-lg font-medium mt-4 mb-2">รายละเอียดชุดข้อมูล</h3>
											<ul className="list-disc pl-5 space-y-1">
												<li>จำนวนรูปภาพทั้งหมด: 7,500+ รูปภาพ</li>
												<li>อัตราส่วนการแบ่งข้อมูล: 70% สำหรับฝึกฝน, 20% สำหรับตรวจสอบ, 10% สำหรับทดสอบ</li>
												<li>รูปภาพมีความละเอียดและมุมมองหลากหลาย</li>
												<li>ทุกรูปภาพถูกปรับขนาดเป็น 224x224 พิกเซล สำหรับการฝึกฝนโมเดล</li>
											</ul>
										</TabsContent>
                                        
										<TabsContent value="obesity-data" className="mt-4">
											<h3 className="text-lg font-medium mb-2">ข้อมูลที่ใช้ในการทำนายความเสี่ยงโรคอ้วน</h3>
											<ul className="list-disc pl-5 space-y-1">
												<li>ใช้ชุดข้อมูลสุขภาพจำนวน 1,000+ รายการ</li>
												<li>ข้อมูลประกอบด้วยตัวแปรทั้งทางกายภาพและพฤติกรรม</li>
												<li>มีการทำความสะอาดข้อมูลและจัดการค่าสูญหาย</li>
												<li>มีการ Normalize ข้อมูลเชิงตัวเลขให้อยู่ในช่วงที่เหมาะสม</li>
												<li>แบ่งข้อมูลเป็นชุดสำหรับฝึกฝน (80%) และชุดสำหรับทดสอบ (20%)</li>
											</ul>

											<h3 className="text-lg font-medium mt-4 mb-2">ตัวแปรที่ใช้ในการทำนาย</h3>
											<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
												<div className="bg-primary/10 p-3 rounded-lg">
													<span className="font-medium">Age</span> - อายุ (ปี)
												</div>
												<div className="bg-primary/10 p-3 rounded-lg">
													<span className="font-medium">Gender</span> - เพศ
												</div>
												<div className="bg-primary/10 p-3 rounded-lg">
													<span className="font-medium">Height</span> - ส่วนสูง (เมตร)
												</div>
												<div className="bg-primary/10 p-3 rounded-lg">
													<span className="font-medium">Weight</span> - น้ำหนัก (กิโลกรัม)
												</div>
												<div className="bg-primary/10 p-3 rounded-lg">
													<span className="font-medium">BMI</span> - ดัชนีมวลกาย
												</div>
												<div className="bg-primary/10 p-3 rounded-lg">
													<span className="font-medium">Daily Calories</span> - แคลอรี่ที่ได้รับต่อวัน
												</div>
												<div className="bg-primary/10 p-3 rounded-lg">
													<span className="font-medium">Exercise Frequency</span> - ความถี่ในการออกกำลังกาย
												</div>
												<div className="bg-primary/10 p-3 rounded-lg">
													<span className="font-medium">Family History</span> - ประวัติโรคอ้วนในครอบครัว
												</div>
												<div className="bg-primary/10 p-3 rounded-lg">
													<span className="font-medium">Junk Food Intake</span> - การบริโภคอาหารขยะ
												</div>
												<div className="bg-primary/10 p-3 rounded-lg">
													<span className="font-medium">Medical Condition</span> - โรคประจำตัว
												</div>
											</div>
										</TabsContent>
									</Tabs>
								</CardContent>
							</Card>
						</TabsContent>
							
						<TabsContent value="usage" className="mt-6 !w-full">
							<Card className="!w-full grid grid-cols-1 w-full">
								<CardHeader>
									<CardTitle>วิธีการใช้งาน</CardTitle>
									<CardDescription>
									คำแนะนำในการใช้งานระบบทำนาย AI
									</CardDescription>
								</CardHeader>
								<CardContent>
									<Tabs defaultValue="car-usage" className="w-full">
										<TabsList className="w-full grid grid-cols-2 tabs-no-border">
											<TabsTrigger value="car-usage">การใช้งานระบบจำแนกรถยนต์</TabsTrigger>
											<TabsTrigger value="obesity-usage">การใช้งานระบบทำนายโรคอ้วน</TabsTrigger>
										</TabsList>
                                        
										<TabsContent value="car-usage" className="mt-4">
											<h3 className="text-lg font-medium mb-3">วิธีใช้งานระบบจำแนกรถยนต์</h3>
											<ol className="list-decimal pl-5 space-y-3 mb-6">
												<li>
													<strong>เข้าสู่หน้าทำนาย</strong> - คลิกที่ปุ่ม "เริ่มทำนายเลย" หรือไปที่เมนู "ทำนาย {">"} ประเภทรถยนต์" ในแถบนำทาง
												</li>
												<li>
													<strong>อัปโหลดรูปภาพ</strong> - คลิกที่พื้นที่อัปโหลดหรือลากรูปภาพรถยนต์มาวางเพื่ออัปโหลด
												</li>
												<li>
													<strong>ประมวลผล</strong> - กดปุ่ม "ทำนายประเภทรถยนต์" เพื่อเริ่มการทำนาย
												</li>
												<li>
													<strong>ดูผลลัพธ์</strong> - ระบบจะแสดงประเภทรถยนต์ที่ทำนายได้พร้อมค่าความเชื่อมั่น
												</li>
											</ol>

											<h3 className="text-lg font-medium mb-3">คำแนะนำสำหรับการใช้งาน</h3>
											<Accordion type="single" collapsible className="mb-4">
												<AccordionItem value="tips-1">
													<AccordionTrigger>เลือกรูปภาพที่เหมาะสม</AccordionTrigger>
													<AccordionContent>
														<ul className="list-disc pl-5 space-y-1">
															<li>รูปภาพควรแสดงรถยนต์เป็นวัตถุหลักในภาพ</li>
															<li>ควรเห็นรูปทรงของรถยนต์ชัดเจน เช่น ถ่ายจากด้านข้าง หรือด้านหน้าเฉียง</li>
															<li>หลีกเลี่ยงรูปภาพที่มีความสว่างน้อยเกินไปหรือมีแสงสะท้อนมากเกินไป</li>
															<li>รูปภาพควรมีคุณภาพดี ไม่เบลอหรือมีความละเอียดต่ำเกินไป</li>
														</ul>
													</AccordionContent>
												</AccordionItem>
											</Accordion>
										</TabsContent>
                                        
										<TabsContent value="obesity-usage" className="mt-4">
											<h3 className="text-lg font-medium mb-3">วิธีใช้งานระบบทำนายความเสี่ยงโรคอ้วน</h3>
											<ol className="list-decimal pl-5 space-y-3 mb-6">
												<li>
													<strong>เข้าสู่หน้าทำนาย</strong> - คลิกที่ปุ่ม "เริ่มทำนายเลย" หรือไปที่เมนู "ทำนาย {">"} ความเสี่ยงโรคอ้วน" ในแถบนำทาง
												</li>
												<li>
													<strong>กรอกข้อมูล</strong> - กรอกข้อมูลส่วนตัวและสุขภาพของคุณให้ครบถ้วน
												</li>
												<li>
													<strong>ประมวลผล</strong> - กดปุ่ม "วิเคราะห์ความเสี่ยง" เพื่อเริ่มการวิเคราะห์
												</li>
												<li>
													<strong>ดูผลลัพธ์</strong> - ระบบจะแสดงผลการวิเคราะห์ความเสี่ยงพร้อมคำแนะนำเบื้องต้น
												</li>
											</ol>

											<h3 className="text-lg font-medium mb-3">คำแนะนำสำหรับการใช้งาน</h3>
											<Accordion type="single" collapsible className="mb-4">
												<AccordionItem value="tips-1">
													<AccordionTrigger>ข้อมูลที่ต้องเตรียม</AccordionTrigger>
													<AccordionContent>
														<ul className="list-disc pl-5 space-y-1">
															<li>ข้อมูลส่วนตัว: อายุ, เพศ</li>
															<li>ข้อมูลร่างกาย: ส่วนสูง (เมตร), น้ำหนัก (กก.)</li>
															<li>ข้อมูลสุขภาพ: ปริมาณแคลอรี่ที่บริโภคต่อวัน, ความถี่ในการออกกำลังกาย</li>
															<li>ประวัติสุขภาพ: ประวัติโรคอ้วนในครอบครัว, การมีโรคประจำตัว</li>
															<li>พฤติกรรม: ความถี่ในการรับประทานอาหารขยะ</li>
														</ul>
													</AccordionContent>
												</AccordionItem>

												<AccordionItem value="tips-2">
													<AccordionTrigger>ข้อจำกัดของการทำนาย</AccordionTrigger>
													<AccordionContent>
														<ul className="list-disc pl-5 space-y-1">
															<li>ผลการทำนายเป็นเพียงการประเมินความเสี่ยงเบื้องต้น ไม่ใช่การวินิจฉัยทางการแพทย์</li>
															<li>ควรปรึกษาแพทย์เพื่อรับคำแนะนำที่เหมาะสมสำหรับสถานการณ์ของคุณ</li>
															<li>ปัจจัยอื่นๆ ที่ไม่ได้อยู่ในแบบประเมินอาจมีผลต่อความเสี่ยงโรคอ้วนของคุณ</li>
															<li>ค่า BMI จะคำนวณโดยอัตโนมัติจากส่วนสูงและน้ำหนัก</li>
														</ul>
													</AccordionContent>
												</AccordionItem>
											</Accordion>
										</TabsContent>
									</Tabs>

									<h3 className="text-lg font-medium mb-3 mt-6">คำถามที่พบบ่อย (FAQ)</h3>
									<Accordion type="single" collapsible>
										<AccordionItem value="faq-1">
											<AccordionTrigger>ระบบรองรับไฟล์รูปภาพประเภทใดบ้าง?</AccordionTrigger>
											<AccordionContent>
								ระบบรองรับไฟล์รูปภาพประเภท JPG, JPEG และ PNG เท่านั้น ไฟล์ขนาดใหญ่อาจใช้เวลาในการอัปโหลดและประมวลผลมากขึ้น
											</AccordionContent>
										</AccordionItem>

										<AccordionItem value="faq-2">
											<AccordionTrigger>ผลการทำนายมีความแม่นยำมากน้อยเพียงใด?</AccordionTrigger>
											<AccordionContent>
								โมเดลที่ใช้ในระบบมีความแม่นยำประมาณ 90-95% จากการทดสอบกับชุดข้อมูลทดสอบ 
								อย่างไรก็ตาม ความแม่นยำในการใช้งานจริงอาจแตกต่างกันไปขึ้นอยู่กับคุณภาพของข้อมูลที่ป้อนเข้าสู่ระบบ
											</AccordionContent>
										</AccordionItem>

										<AccordionItem value="faq-3">
											<AccordionTrigger>ข้อมูลของฉันจะถูกเก็บไว้หรือไม่?</AccordionTrigger>
											<AccordionContent>
								ระบบจะไม่จัดเก็บข้อมูลส่วนตัวหรือรูปภาพของคุณหลังจากการประมวลผลเสร็จสิ้น ข้อมูลจะถูกใช้เพียงเพื่อการทำนายเท่านั้น
								และจะถูกลบออกจากเซิร์ฟเวอร์โดยอัตโนมัติหลังจากการประมวลผลเสร็จสิ้น
											</AccordionContent>
										</AccordionItem>

										<AccordionItem value="faq-4">
											<AccordionTrigger>ระบบทำนายโรคอ้วนสามารถใช้แทนการปรึกษาแพทย์ได้หรือไม่?</AccordionTrigger>
											<AccordionContent>
								ไม่ได้ ระบบนี้ออกแบบมาเพื่อเป็นเครื่องมือช่วยในการประเมินความเสี่ยงเบื้องต้นเท่านั้น ไม่ใช่การวินิจฉัยทางการแพทย์
								หากคุณมีความกังวลเกี่ยวกับสุขภาพหรือน้ำหนักของคุณ ควรปรึกษาแพทย์หรือผู้เชี่ยวชาญด้านโภชนาการ
								เพื่อรับคำแนะนำและการดูแลที่เหมาะสมกับสถานการณ์ของคุณ
											</AccordionContent>
										</AccordionItem>

										<AccordionItem value="faq-5">
											<AccordionTrigger>ฉันสามารถใช้ระบบนี้ได้บ่อยแค่ไหน?</AccordionTrigger>
											<AccordionContent>
								คุณสามารถใช้ระบบได้ไม่จำกัดจำนวนครั้ง ทั้งการทำนายประเภทรถยนต์และการประเมินความเสี่ยงโรคอ้วน 
								ระบบออกแบบมาให้รองรับการใช้งานได้อย่างต่อเนื่องและมีประสิทธิภาพ
											</AccordionContent>
										</AccordionItem>
									</Accordion>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</div>

				<div className="mt-12">
					<h2 className="text-2xl font-bold text-center mb-6">ทีมผู้พัฒนา</h2>
					<Card>
						<CardContent>
							<div className="text-center space-y-4">
								<p>
								ระบบนี้พัฒนาโดย <strong>ณัฐพล วัฒนเดช</strong> 
								</p>
								<p>
								Email : s6404062610413@email.kmutnb.ac.th
								</p>
								<p>KING MONGKUT'S UNIVERSITY OF TECHNOLOGY NORTH BANGKOK</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</motion.div>
		</div>
	)
}

export default About