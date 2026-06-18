import Link from "next/link"

const metrics = {
  regression: ['mae', 'rmse', 'rSquared'],
  classification: ['precision', 'recall', 'f1', 'auc-roc'],
  clustering: ['silhouette', 'davies-bouldin'],
}

const descriptions: Record<string, string> = {
  mae: 'Mean Absolute Error',
  rmse: 'Root Mean Squared Error',
  rSquared: 'R-Squared',
  precision: 'Precision',
  recall: 'Recall',
  f1: 'F1 Score',
  'auc-roc': 'AUC-ROC Curve',
  silhouette: 'Silhouette Score',
  'davies-bouldin': 'Davies-Bouldin Index',
}

const categories = [
  { key: 'regression', label: 'Regression', description: 'Predicting continuous values' },
  { key: 'classification', label: 'Classification', description: 'Predicting categories' },
  { key: 'clustering', label: 'Clustering', description: 'Grouping unlabeled data' },
] as const

export default function Page() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <div className="max-w-2xl mx-auto px-6 py-16">

        <div className="mb-12">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">v1.0</p>
          <h1 className="text-4xl font-semibold tracking-tight mb-3">MetricsLab</h1>
          <p className="text-muted-foreground text-base">
            Learn ML evaluation metrics by playing with real data.
            Edit values, watch results change instantly.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {categories.map((cat) => (
            <section key={cat.key}>
              <div className="flex items-baseline gap-3 mb-4">
                <h2 className="text-sm font-medium uppercase tracking-widest">{cat.label}</h2>
                <span className="text-xs text-muted-foreground">{cat.description}</span>
              </div>
              <div className="flex flex-col gap-1">
                {metrics[cat.key].map((metric) => (
                  <Link
                    key={metric}
                    href={`/metrics/${cat.key}/${metric}`}
                    className="group flex items-center justify-between py-3 px-4 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border"
                  >
                    <div>
                      <span className="font-mono text-sm font-medium">{metric}</span>
                      <span className="text-muted-foreground text-sm ml-3">{descriptions[metric]}</span>
                    </div>
                    <span className="text-muted-foreground text-sm opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground font-mono">MetricsLab — built to learn</p>
        </div>

      </div>
    </div>
  )
}