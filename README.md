# MetricsLab

A hands-on ML metrics playground built with Next.js and TypeScript.  
Edit real datasets, watch evaluation metrics update instantly, and understand what each number actually means.

> Built as a study project for the AWS AI Practitioner exam and ML fundamentals.

---

## What is this?

Most people learn ML metrics by memorizing formulas. This project takes a different approach — you interact with real data and see how metrics respond to changes in predictions.

Make one prediction very wrong. Watch RMSE spike while MAE barely moves. That's the lesson.

---

## Metrics covered

**Regression** — predicting continuous values

| Metric | Question it answers |
|---|---|
| MAE | How far off am I on average? |
| RMSE | How far off am I, penalizing large errors more? |
| R² | How much of the variance in the data does the model explain? |

**Classification** — predicting categories

| Metric | Question it answers |
|---|---|
| Precision | When the model predicts positive, how often is it correct? |
| Recall | Out of all real positives, how many did we find? |
| F1 Score | How balanced are precision and recall? |
| AUC-ROC | How well can the model separate positives from negatives? |

**Clustering** — grouping unlabeled data

| Metric | Question it answers |
|---|---|
| Silhouette Score | Are the clusters well separated? |
| Davies-Bouldin Index | Are the clusters compact and well separated? |

---

## Key concepts

### Confusion Matrix

The foundation of all classification metrics.

```
Actual \ Predicted   Positive   Negative
Positive             TP         FN
Negative             FP         TN
```

- **TP** — predicted positive, was correct
- **TN** — predicted negative, was correct  
- **FP** — predicted positive, was wrong (false alarm)
- **FN** — predicted negative, was wrong (missed it)

In high-stakes domains like medicine or fraud detection, **FN is often the most dangerous mistake** — missing a real positive.

### Why accuracy can be misleading

A fraud detection model on 10,000 transactions (9,950 normal, 50 fraud) that predicts everything as normal achieves 99.5% accuracy — but catches zero fraud cases. This is why Precision, Recall, and F1 exist.

### MAE vs RMSE

```
predictions A: off by 10, off by 10  →  MAE = 10, RMSE = 10
predictions B: off by 1,  off by 19  →  MAE = 10, RMSE = 13
```

Same MAE — but RMSE catches that prediction B had one terrible outlier. Use RMSE when large errors are especially costly.

### The ML training loop

```
data → model → predictions → metrics
        ↑                        |
        └──────── adjust ────────┘
```

The metrics you see in this app are the feedback signal the model uses to adjust its internal weights during training. Lower error = better model.

---

## Tech stack

- [Next.js 15](https://nextjs.org) — App Router
- [TypeScript](https://www.typescriptlang.org) — strict typing throughout
- [Tailwind CSS](https://tailwindcss.com) — utility-first styling
- [shadcn/ui](https://ui.shadcn.com) — component primitives
- JSON datasets — stored in `/data`, no backend needed

---

## Project structure

```
/app
  /metrics/[category]/[metric]   ← dynamic metric pages
/data
  /regression                    ← hours-vs-score, house-prices, ice-cream-sales
  /classification                ← spam-detector, match-outcome
  /clustering                    ← customer-segments
/lib
  /metrics
    regression.ts                ← mae, rmse, rSquared
    classification.ts            ← precision, recall, f1 (coming soon)
    clustering.ts                ← silhouette, davies-bouldin (coming soon)
/types
  index.ts                       ← PredictionInputData, ClassificationInputData
```

---

## Metric functions

All metric functions are written from scratch in TypeScript — no external ML libraries.

```ts
export interface PredictionInputData {
  y_true: number[]
  y_pred: number[]
}

export type BinaryLabel = 0 | 1

export interface ClassificationInputData {
  y_true: BinaryLabel[]
  y_pred: BinaryLabel[]
}
```

---

## Running locally

```bash
git clone https://github.com/arthurreira/MetricsLab
cd MetricsLab
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Study context

This project was built alongside preparation for the **AWS Certified AI Practitioner** exam. The two tracks reinforce each other:

| MetricsLab | AWS AI Practitioner |
|---|---|
| MAE, RMSE, R² | SageMaker model evaluation |
| Classification metrics | Rekognition, Comprehend outputs |
| Training loop concept | SageMaker training jobs |
| Clustering | Unsupervised learning services |

---

*Built to learn. Not to impress.*