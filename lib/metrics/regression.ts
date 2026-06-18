
import { PredictionInputData } from '@/types/types';


export function mae(data: PredictionInputData): number {
  let totalError = 0

  for (let i = 0; i < data.y_true.length; i++) {
    const error = data.y_pred[i] - data.y_true[i]  //  subtract y_pred from y_true
    totalError += Math.abs(error)    //  add the absolute error to total
  }

  return totalError / data.y_true.length   //  divide totalError by how many items
}

export function rmse(data:PredictionInputData) {
    let totalError = 0 

    for (let i = 0; i < data.y_true.length; i++) {
        const error = data.y_pred[i] - data.y_true[i] 
        totalError += error **2
        
    }
    return Math.sqrt(totalError / data.y_true.length)
}

export function rSquared(data: PredictionInputData): number {
  // step 1: calculate mean of y_true
    let sum = 0 

    for (let i = 0; i < data.y_true.length; i++) {
        sum += data.y_true[i];
        
    }

    const mean = sum / data.y_true.length

    let ssRes = 0 
    
    for (let i = 0; i < data.y_true.length; i++) {
        ssRes += (data.y_true[i] - data.y_pred[i]) **2;
    }

    let ssTot = 0

    for (let i = 0; i < data.y_true.length; i++) {
        ssTot += (data.y_true[i] - mean) **2  
    }

   return 1 - (ssRes / ssTot)
}
