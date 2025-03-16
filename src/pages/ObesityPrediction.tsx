import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Axios from "@/configs/axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Activity, AlertCircle, BarChart, Check, Info, RefreshCw } from "lucide-react"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

// Define the schema for form validation
const formSchema = z.object({
	Age: z.number().min(1).max(120),
	Gender: z.enum(["Male", "Female"]),
	Height: z.number().min(0.5).max(2.5),
	Weight: z.number().min(20).max(300),
	BMI: z.number().min(10).max(70),
	Daily_Calories: z.number().min(500).max(5000),
	Exercise_Frequency: z.number().min(0).max(7),
	Family_Obesity_History: z.enum(["Yes", "No"]),
	Junk_Food_Intake: z.enum(["High", "Medium", "Low"]),
	Medical_Condition: z.enum(["Yes", "No"]),
})

type FormValues = z.infer<typeof formSchema>

interface FeatureImportance {
  [key: string]: number
}

interface ObesityPredictionResponse {
  obesity_level: string
  probability: number
  features_importance: FeatureImportance
  processing_time: number
}

const ObesityPrediction: React.FC = () => {
	const [activeTab, setActiveTab] = useState("form")
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [prediction, setPrediction] = useState<ObesityPredictionResponse | null>(null)

	// Initialize form with default values
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			Age: 35,
			Gender: "Male",
			Height: 1.75,
			Weight: 75,
			BMI: 24.5, // This will be calculated automatically
			Daily_Calories: 2200,
			Exercise_Frequency: 3,
			Family_Obesity_History: "No",
			Junk_Food_Intake: "Medium",
			Medical_Condition: "No",
		},
	})

	// Calculate BMI when height or weight changes
	React.useEffect(() => {
		const subscription = form.watch((value, { name }) => {
			if ((name === "Height" || name === "Weight") && value.Height && value.Weight) {
				const height = value.Height
				const weight = value.Weight
				const calculatedBMI = weight / (height * height)
        
				// Only update if it's a valid number and within reasonable range
				if (!isNaN(calculatedBMI) && isFinite(calculatedBMI) && calculatedBMI > 0) {
					form.setValue("BMI", parseFloat(calculatedBMI.toFixed(2)))
				}
			}
		})
    
		return () => subscription.unsubscribe()
	}, [form])

	const onSubmit = async (data: FormValues) => {
		setLoading(true)
		setError(null)

		try {
			const response = await Axios.post("model/obesity/predict", data)
			setPrediction(response.data)
			setActiveTab("result")
		} catch  {
			setError("เกิดข้อผิดพลาดในการทำนาย กรุณาลองใหม่อีกครั้ง")
		} finally {
			setLoading(false)
		}
	}

	const resetForm = () => {
		form.reset()
		setPrediction(null)
		setError(null)
		setActiveTab("form")
	}

	const getObesityLevelColor = (level: string): string => {
		const colors: Record<string, string> = {
			"O": "bg-red-500", // Obese
			"OO": "bg-red-700", // Extremely Obese
			"OW": "bg-orange-500", // Overweight
			"N": "bg-green-500", // Normal
			"UW": "bg-yellow-500", // Underweight
		}
    
		return colors[level] || "bg-gray-500"
	}

	const getObesityLevelText = (level: string): string => {
		const meanings: Record<string, string> = {
			"O": "อ้วน (Obese)",
			"OO": "อ้วนอันตราย (Extremely Obese)",
			"OW": "น้ำหนักเกิน (Overweight)",
			"N": "ปกติ (Normal)",
			"UW": "น้ำหนักต่ำกว่าเกณฑ์ (Underweight)",
		}
    
		return meanings[level] || level
	}

	const getFeatureBarStyle = (value: number) => {
		return {
			width: `${value}%`,
			backgroundColor: `hsl(${value * 2}, 70%, 50%)`,
		}
	}

	return (
		<div className="pt-24 md:pt-32 pb-20 md:pb-40">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="max-w-3xl mx-auto"
			>
				<h1 className="text-3xl md:text-4xl font-bold text-center mb-8">ทำนายความเสี่ยงภาวะโรคอ้วน</h1>
				<div className="text-muted-foreground text-center mx-auto mb-12">
          กรอกข้อมูลของคุณเพื่อให้ระบบวิเคราะห์และประเมินความเสี่ยงต่อภาวะโรคอ้วน 
          โดยใช้เทคโนโลยี Machine Learning เพื่อให้ผลลัพธ์ที่แม่นยำ
				</div>

				<Card className="max-w-3xl">
					<CardHeader>
						<CardTitle>วิเคราะห์ความเสี่ยงภาวะโรคอ้วน</CardTitle>
						<CardDescription>
              กรอกข้อมูลสุขภาพของคุณเพื่อรับการวิเคราะห์ความเสี่ยงต่อภาวะโรคอ้วน
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
							<TabsList className="grid w-full grid-cols-2 tabs-no-border">
								<TabsTrigger value="form">ข้อมูลสุขภาพ</TabsTrigger>
								<TabsTrigger value="result" disabled={!prediction}>ผลการวิเคราะห์</TabsTrigger>
							</TabsList>
              
							<TabsContent value="form" className="mt-4">
								<Form {...form}>
									<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											{/* Age */}
											<FormField
												control={form.control}
												name="Age"
												render={({ field }) => (
													<FormItem>
														<FormLabel>อายุ (ปี)</FormLabel>
														<FormControl>
															<Input 
																type="number" 
																{...field} 
																onChange={(e) => field.onChange(parseFloat(e.target.value))}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											{/* Gender */}
											<FormField
												control={form.control}
												name="Gender"
												render={({ field }) => (
													<FormItem>
														<FormLabel>เพศ</FormLabel>
														<Select 
															onValueChange={field.onChange} 
															defaultValue={field.value}
														>
															<FormControl>
																<SelectTrigger>
																	<SelectValue placeholder="เลือกเพศ" />
																</SelectTrigger>
															</FormControl>
															<SelectContent>
																<SelectItem value="Male">ชาย</SelectItem>
																<SelectItem value="Female">หญิง</SelectItem>
															</SelectContent>
														</Select>
														<FormMessage />
													</FormItem>
												)}
											/>

											{/* Height */}
											<FormField
												control={form.control}
												name="Height"
												render={({ field }) => (
													<FormItem>
														<FormLabel>ส่วนสูง (เมตร)</FormLabel>
														<FormControl>
															<Input 
																type="number" 
																step="0.01" 
																{...field} 
																onChange={(e) => field.onChange(parseFloat(e.target.value))}
															/>
														</FormControl>
														<FormDescription>ตัวอย่าง: 1.75 เมตร</FormDescription>
														<FormMessage />
													</FormItem>
												)}
											/>

											{/* Weight */}
											<FormField
												control={form.control}
												name="Weight"
												render={({ field }) => (
													<FormItem>
														<FormLabel>น้ำหนัก (กิโลกรัม)</FormLabel>
														<FormControl>
															<Input 
																type="number" 
																step="0.1" 
																{...field} 
																onChange={(e) => field.onChange(parseFloat(e.target.value))}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											{/* BMI - Calculated automatically */}
											<FormField
												control={form.control}
												name="BMI"
												render={({ field }) => (
													<FormItem>
														<FormLabel>ดัชนีมวลกาย (BMI)</FormLabel>
														<FormControl>
															<Input 
																type="number" 
																step="0.01" 
																{...field} 
																onChange={(e) => field.onChange(parseFloat(e.target.value))}
																disabled
															/>
														</FormControl>
														<FormDescription>คำนวณอัตโนมัติจากส่วนสูงและน้ำหนัก</FormDescription>
														<FormMessage />
													</FormItem>
												)}
											/>

											{/* Daily Calories */}
											<FormField
												control={form.control}
												name="Daily_Calories"
												render={({ field }) => (
													<FormItem>
														<FormLabel>แคลอรี่ที่ได้รับต่อวัน</FormLabel>
														<FormControl>
															<Input 
																type="number" 
																{...field} 
																onChange={(e) => field.onChange(parseFloat(e.target.value))}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											{/* Exercise Frequency */}
											<FormField
												control={form.control}
												name="Exercise_Frequency"
												render={({ field }) => (
													<FormItem>
														<FormLabel>ความถี่ในการออกกำลังกาย (วัน/สัปดาห์)</FormLabel>
														<FormControl>
															<div className="pt-5">
																<Slider
																	min={0}
																	max={7}
																	step={1}
																	defaultValue={[field.value]}
																	onValueChange={(values) => field.onChange(values[0])}
																/>
															</div>
														</FormControl>
														<FormDescription>จำนวนวันที่ออกกำลังกายต่อสัปดาห์: {field.value} วัน</FormDescription>
														<FormMessage />
													</FormItem>
												)}
											/>

											{/* Family Obesity History */}
											<FormField
												control={form.control}
												name="Family_Obesity_History"
												render={({ field }) => (
													<FormItem>
														<FormLabel>ประวัติโรคอ้วนในครอบครัว</FormLabel>
														<Select 
															onValueChange={field.onChange} 
															defaultValue={field.value}
														>
															<FormControl>
																<SelectTrigger>
																	<SelectValue placeholder="เลือกคำตอบ" />
																</SelectTrigger>
															</FormControl>
															<SelectContent>
																<SelectItem value="Yes">มี</SelectItem>
																<SelectItem value="No">ไม่มี</SelectItem>
															</SelectContent>
														</Select>
														<FormMessage />
													</FormItem>
												)}
											/>

											{/* Junk Food Intake */}
											<FormField
												control={form.control}
												name="Junk_Food_Intake"
												render={({ field }) => (
													<FormItem>
														<FormLabel>ความถี่ในการรับประทานอาหารขยะ</FormLabel>
														<Select 
															onValueChange={field.onChange} 
															defaultValue={field.value}
														>
															<FormControl>
																<SelectTrigger>
																	<SelectValue placeholder="เลือกความถี่" />
																</SelectTrigger>
															</FormControl>
															<SelectContent>
																<SelectItem value="High">สูง (บ่อยมาก)</SelectItem>
																<SelectItem value="Medium">ปานกลาง (บางครั้ง)</SelectItem>
																<SelectItem value="Low">ต่ำ (นานๆ ครั้ง)</SelectItem>
															</SelectContent>
														</Select>
														<FormMessage />
													</FormItem>
												)}
											/>

											{/* Medical Condition */}
											<FormField
												control={form.control}
												name="Medical_Condition"
												render={({ field }) => (
													<FormItem>
														<FormLabel>มีโรคประจำตัว</FormLabel>
														<Select 
															onValueChange={field.onChange} 
															defaultValue={field.value}
														>
															<FormControl>
																<SelectTrigger>
																	<SelectValue placeholder="เลือกคำตอบ" />
																</SelectTrigger>
															</FormControl>
															<SelectContent>
																<SelectItem value="Yes">มี</SelectItem>
																<SelectItem value="No">ไม่มี</SelectItem>
															</SelectContent>
														</Select>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>

										{error && (
											<Alert variant="destructive">
												<AlertCircle className="h-4 w-4" />
												<AlertTitle>ข้อผิดพลาด</AlertTitle>
												<AlertDescription>{error}</AlertDescription>
											</Alert>
										)}

										<div className="flex justify-center">
											<Button 
												type="submit" 
												disabled={loading}
												className="w-full md:w-auto"
											>
												{loading ? (
													<>
														<RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            กำลังประมวลผล...
													</>
												) : (
													<>วิเคราะห์ความเสี่ยง</>
												)}
											</Button>
										</div>
									</form>
								</Form>
							</TabsContent>
              
							<TabsContent value="result" className="mt-4">
								{prediction && (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ duration: 0.3 }}
										className="space-y-6"
									>
										<div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
											<div className="flex items-center justify-between mb-4">
												<h3 className="text-lg font-medium">ผลการวิเคราะห์</h3>
												<span className="text-xs text-muted-foreground">
                          ใช้เวลา {prediction.processing_time.toFixed(2)} วินาที
												</span>
											</div>
                      
											<div className="flex flex-col items-center gap-4 mb-6">
												<div className={`w-16 h-16 rounded-full flex items-center justify-center ${getObesityLevelColor(prediction.obesity_level)}`}>
													<Activity className="h-8 w-8 text-white" />
												</div>
												<div className="text-center">
													<h4 className="text-2xl font-bold mb-1">{getObesityLevelText(prediction.obesity_level)}</h4>
													<p className="text-muted-foreground">
                            ความเชื่อมั่น {(prediction.probability * 100).toFixed(2)}%
													</p>
												</div>
											</div>
                      
											<div className="border-t pt-4">
												<div className="flex items-center mb-3">
													<Info className="h-4 w-4 mr-2" />
													<h3 className="font-medium">คำแนะนำเบื้องต้น</h3>
												</div>
                        
												{prediction.obesity_level === "N" && (
													<p className="text-sm mb-2">คุณมีน้ำหนักอยู่ในเกณฑ์ปกติ ควรรักษาสุขภาพด้วยการออกกำลังกายสม่ำเสมอและรับประทานอาหารที่มีประโยชน์</p>
												)}
                        
												{prediction.obesity_level === "UW" && (
													<p className="text-sm mb-2">คุณมีน้ำหนักต่ำกว่าเกณฑ์ ควรปรึกษาแพทย์เพื่อวางแผนการรับประทานอาหารที่เหมาะสมและเพิ่มน้ำหนักอย่างถูกวิธี</p>
												)}
                        
												{(prediction.obesity_level === "OW" || prediction.obesity_level === "O" || prediction.obesity_level === "OO") && (
													<p className="text-sm mb-2">คุณมีความเสี่ยงต่อภาวะโรคอ้วน ควรปรับเปลี่ยนพฤติกรรมการรับประทานอาหาร เพิ่มการออกกำลังกาย และปรึกษาแพทย์เพื่อรับคำแนะนำที่เหมาะสม</p>
												)}
                        
												<Alert className="mt-4">
													<AlertCircle className="h-4 w-4" />
													<AlertTitle>คำเตือน</AlertTitle>
													<AlertDescription>
                            ผลการทำนายนี้ไม่ใช่การวินิจฉัยทางการแพทย์ ควรปรึกษาแพทย์หรือผู้เชี่ยวชาญเพื่อคำแนะนำที่เหมาะสม
													</AlertDescription>
												</Alert>
											</div>
										</div>
                    
										{prediction.features_importance && Object.keys(prediction.features_importance).length > 0 && (
											<div>
												<div className="flex items-center mb-4">
													<BarChart className="h-4 w-4 mr-2" />
													<h3 className="font-medium">ปัจจัยที่มีผลต่อการวิเคราะห์</h3>
												</div>
                        
												<div className="space-y-3">
													{Object.entries(prediction.features_importance)
														.sort(([, a], [, b]) => b - a)
														.map(([feature, importance]) => (
															<div key={feature} className="space-y-1">
																<div className="flex justify-between text-sm">
																	<span>{feature}</span>
																	<span>{importance.toFixed(2)}%</span>
																</div>
																<div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
																	<div 
																		className="h-full rounded-full" 
																		style={getFeatureBarStyle(importance)}
																	></div>
																</div>
															</div>
														))}
												</div>
											</div>
										)}
									</motion.div>
								)}
							</TabsContent>
						</Tabs>
					</CardContent>
					<CardFooter className="flex justify-between">
						<Button variant="outline" onClick={resetForm}>
              รีเซ็ตและเริ่มใหม่
						</Button>
						{prediction && (
							<Button variant="secondary" disabled={!prediction}>
								<Check className="mr-2 h-4 w-4" /> วิเคราะห์สำเร็จ
							</Button>
						)}
					</CardFooter>
				</Card>
			</motion.div>
		</div>
	)
}

export default ObesityPrediction