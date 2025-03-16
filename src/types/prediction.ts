export interface ClassProbability {
	name: string
	prob: number
}

export interface PredictionResponse {
	class_name: string
	confidence: number
	class_probabilities: ClassProbability[]
	processing_time: number
}

export interface ObesityPredictionInput {
	Age: number
	Gender: "Male" | "Female"
	Height: number
	Weight: number
	BMI: number
	Daily_Calories: number
	Exercise_Frequency: number
	Family_Obesity_History: "Yes" | "No"
	Junk_Food_Intake: "High" | "Medium" | "Low"
	Medical_Condition: "Yes" | "No"
  }
  
export interface FeatureImportance {
	[key: string]: number
}
  
export interface ObesityPredictionResponse {
	obesity_level: string
	probability: number
	features_importance: FeatureImportance
	processing_time: number
  }