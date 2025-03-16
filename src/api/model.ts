import Axios from "@/configs/axios"
import { ObesityPredictionInput, ObesityPredictionResponse, PredictionResponse } from "@/types/prediction"

export const postModelCarTypePrediction = async (file: File): Promise<PredictionResponse> => {
	const formData = new FormData()
	formData.append("file", file)
  
	const response = await Axios.post("model/cartype/predict", formData, {
		headers: {
			"Content-Type": "multipart/form-data"
		}
	})
  
	return response.data
}

export const postObesityPrediction = async (data: ObesityPredictionInput): Promise<ObesityPredictionResponse> => {
	const response = await Axios.post("model/obesity/predict", data)
	return response.data
}