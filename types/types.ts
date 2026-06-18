export type BinaryLabel = 0 | 1

export interface PredictionInputData {
  y_true: number[]
  y_pred: number[]
}

export interface ClassificationInputData {
  y_true: BinaryLabel[]
  y_pred: BinaryLabel[]
}