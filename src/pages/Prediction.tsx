import { postModelCarTypePrediction } from "@/api/model"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { AlertCircle, BarChart, Check, RefreshCw, Upload } from "lucide-react"
import React, { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"

interface ClassProbability {
  name: string
  prob: number
}

interface PredictionResponse {
  class_name: string
  confidence: number
  class_probabilities: ClassProbability[]
  processing_time: number
}

const Prediction: React.FC = () => {
	const [file, setFile] = useState<File | null>(null)
	const [preview, setPreview] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [prediction, setPrediction] = useState<PredictionResponse | null>(null)
	const [activeTab, setActiveTab] = useState("upload")

	const onDrop = useCallback((acceptedFiles: File[]) => {
		if (acceptedFiles.length > 0) {
			const selectedFile = acceptedFiles[0]
			setFile(selectedFile)
			const previewUrl = URL.createObjectURL(selectedFile)
			setPreview(previewUrl)
			setPrediction(null)
			setError(null)
		}
	}, [])

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"image/*": [".jpeg", ".jpg", ".png"]
		},
		maxFiles: 1
	})

	const handleSubmit = async () => {
		if (!file) {
			setError("กรุณาเลือกไฟล์รูปภาพก่อน")
			return
		}

		setLoading(true)
		setError(null)

		try {
			setPrediction(await postModelCarTypePrediction(file))
			setActiveTab("result")
		} catch (err) {
			console.error("Error predicting car type:", err)
			setError("เกิดข้อผิดพลาดในการทำนาย กรุณาลองใหม่อีกครั้ง")
		} finally {
			setLoading(false)
		}
	}

	const resetForm = () => {
		setFile(null)
		setPreview(null)
		setPrediction(null)
		setError(null)
		setActiveTab("upload")
	}

	const getColorClass = (carType: string): string => {
		const colors: Record<string, string> = {
			"SUV": "bg-blue-500",
			"Sedan": "bg-green-500",
			"Pick-Up": "bg-yellow-500",
			"Hatchback": "bg-purple-500",
			"Coupe": "bg-pink-500", 
			"Convertible": "bg-orange-500",
			"VAN": "bg-teal-500"
		}
    
		return colors[carType] || "bg-gray-500"
	}

	const getProgressStyle = (carType: string) => {
		const colors: Record<string, string> = {
			"SUV": "rgb(59, 130, 246)",
			"Sedan": "rgb(34, 197, 94)",
			"Pick-Up": "rgb(234, 179, 8)",
			"Hatchback": "rgb(168, 85, 247)",
			"Coupe": "rgb(236, 72, 153)", 
			"Convertible": "rgb(249, 115, 22)",
			"VAN": "rgb(20, 184, 166)"
		}
    
		return { backgroundColor: colors[carType] || "rgb(107, 114, 128)" }
	}

	return (
		<div className="pt-24 md:pt-32 pb-20 md:pb-40">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="max-w-3xl mx-auto"
			>
				<h1 className="text-3xl md:text-4xl font-bold text-center mb-8">ทำนายประเภทรถยนต์</h1>
				<div className="text-muted-foreground text-center mx-auto mb-12">
					อัปโหลดรูปภาพรถยนต์เพื่อให้ระบบทำนายประเภทรถยนต์ ระบบรองรับการทำนาย 7 ประเภท 
					ได้แก่ Sedan, SUV, Pick-Up, Hatchback, Coupe, Convertible และ VAN
				</div>
				<Card className="max-w-3xl">
					<CardHeader>
						<CardTitle>ทำนายประเภทรถยนต์ด้วย AI</CardTitle>
						<CardDescription>
             				 อัปโหลดรูปภาพรถยนต์ที่ต้องการทำนาย (รองรับไฟล์ .jpg, .jpeg, .png)
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Tabs value={activeTab} onValueChange={setActiveTab}>
							<TabsList className="grid w-full grid-cols-2 tabs-no-border">
								<TabsTrigger value="upload" >อัปโหลดรูปภาพ</TabsTrigger>
								<TabsTrigger value="result" disabled={!prediction}>ผลการทำนาย</TabsTrigger>
							</TabsList>
              
							<TabsContent value="upload" className="mt-4">
								<div
									{...getRootProps()}
									className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
										isDragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary"
									}`}
								>
									<input {...getInputProps()} />
                  
									{preview ? (
										<div className="flex flex-col items-center">
											<img 
												src={preview} 
												alt="Preview" 
												className="max-h-64 max-w-full object-contain mb-4 rounded-md" 
											/>
											<p className="text-sm text-muted-foreground">คลิกหรือลากไฟล์เพื่อเปลี่ยนรูปภาพ</p>
										</div>
									) : (
										<div className="flex flex-col items-center">
											<Upload className="h-12 w-12 text-gray-400 mb-4" />
											<p className="text-lg mb-2">คลิกหรือลากไฟล์รูปภาพมาที่นี่</p>
											<p className="text-sm text-muted-foreground">รองรับไฟล์ JPG, JPEG, PNG</p>
										</div>
									)}
								</div>

								{error && (
									<Alert variant="destructive" className="mt-4">
										<AlertCircle className="h-4 w-4" />
										<AlertTitle>ข้อผิดพลาด</AlertTitle>
										<AlertDescription>{error}</AlertDescription>
									</Alert>
								)}

								<div className="flex justify-center mt-6">
									<Button 
										onClick={handleSubmit} 
										disabled={!file || loading}
										className="w-full md:w-auto"
									>
										{loading ? (
											<>
												<RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        						กำลังประมวลผล...
											</>
										) : (
											<>ทำนายประเภทรถยนต์</>
										)}
									</Button>
								</div>
							</TabsContent>
              
							<TabsContent value="result" className="mt-4">
								{prediction && (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ duration: 0.3 }}
									>
										<div className="flex flex-col md:flex-row gap-6">
											<div className="md:w-1/3">
												{preview && (
													<img 
														src={preview} 
														alt="Car" 
														className="w-full h-auto rounded-md border" 
													/>
												)}
											</div>
											<div className="md:w-2/3">
												<div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
													<div className="flex items-center justify-between mb-2">
														<h3 className="text-lg font-medium">ผลการทำนาย</h3>
														<span className="text-xs text-muted-foreground">
                              								ใช้เวลา {prediction.processing_time.toFixed(2)} วินาที
														</span>
													</div>
                          
													<div className="flex items-center gap-2 mb-4">
														<div className={`w-3 h-3 rounded-full ${getColorClass(prediction.class_name)}`}></div>
														<span className="text-xl font-semibold">{prediction.class_name}</span>
														<span className="text-muted-foreground ml-auto">
                              								ความเชื่อมั่น {(prediction.confidence * 100).toFixed(2)}%
														</span>
													</div>
												</div>
                        
												<div>
													<div className="flex items-center mb-2">
														<BarChart className="h-4 w-4 mr-2" />
														<h3 className="font-medium">ความน่าจะเป็นของแต่ละประเภท</h3>
													</div>
													<div className="space-y-3">
														{prediction.class_probabilities
															.sort((a, b) => b.prob - a.prob)
															.map((item) => (
																<div key={item.name}>
																	<div className="flex justify-between text-sm mb-1">
																		<div className="flex items-center">
																			<div className={`w-2 h-2 rounded-full ${getColorClass(item.name)} mr-2`}></div>
																			<span>{item.name}</span>
																		</div>
																		<span>{(item.prob * 100).toFixed(2)}%</span>
																	</div>
																	<div className={"w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"}>
																		<div 
																			className="h-full rounded-full" 
																			style={{
																				...getProgressStyle(item.name),
																				width: `${item.prob * 100}%`
																			}}
																		></div>
																	</div>
																</div>
															))}
													</div>
												</div>
											</div>
										</div>
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
								<Check className="mr-2 h-4 w-4" /> ทำนายสำเร็จ
							</Button>
						)}
					</CardFooter>
				</Card>
			</motion.div>
		</div>
	)
}

export default Prediction