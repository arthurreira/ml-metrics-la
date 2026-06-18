"use client"
import { useState } from "react"
import Link from "next/link"
import hoursData from "@/data/regression/hours-vs-score.json"
import { mae, rmse, rSquared } from "@/lib/metrics/regression"

export default function Page() {
  const [rows, setRows] = useState(hoursData.rows)

  function handleEdit(rowIndex: number, colIndex: number, value: number) {
    const updated = rows.map((row, i) =>
      i === rowIndex
        ? row.map((cell, j) => (j === colIndex ? value : cell))
        : row
    )
    setRows(updated)
  }

  const y_true = rows.map(row => row[0])
  const y_pred = rows.map(row => row[1])
  const data = { y_true, y_pred }

  const metrics = [
    { label: "MAE", description: "Mean Absolute Error", value: mae(data).toFixed(2) },
    { label: "RMSE", description: "Root Mean Squared Error", value: rmse(data).toFixed(2) },
    { label: "R²", description: "R-Squared", value: rSquared(data).toFixed(2) },
  ]

  return (
    <div className="min-h-svh bg-background text-foreground p-6 md:p-10">

      <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block">
        ← back
      </Link>

      <div className="mb-8">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">Regression</p>
        <h1 className="text-3xl font-semibold tracking-tight">Hours studied vs exam score</h1>
        <p className="text-muted-foreground mt-1">Edit any cell — metrics update instantly</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">

        <div className="flex-1 overflow-x-auto  border p-0">

          <div className="max-h-[200px] overflow-y-auto">
            <table className="w-full text-sm border-collapse">
                <thead className="sticky top-0 z-10 bg-background border-b">
                <tr className="border-b border-border">
                    <th className="text-left  py-3 px-4 text-muted-foreground font-medium">y_true</th>
                    <th className="text-left  py-3 px-4 text-muted-foreground font-medium">y_pred</th>
                </tr>
                </thead>
                <tbody>
                {rows.map((row, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-1.5 px-2">
                        <input
                        type="number"
                        value={row[0]}
                        onChange={(e) => handleEdit(i, 0, Number(e.target.value))}
                        className="w-full bg-transparent px-2 py-1 rounded-md hover:bg-muted focus:bg-muted focus:outline-none font-mono text-sm transition-colors"
                        />
                    </td>
                    <td className="py-1.5 px-2">
                        <input
                        type="number"
                        value={row[1]}
                        onChange={(e) => handleEdit(i, 1, Number(e.target.value))}
                        className="w-full bg-transparent px-2 py-1 rounded-md hover:bg-muted focus:bg-muted focus:outline-none font-mono text-sm transition-colors"
                        />
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
          </div>
        </div>

        <div className="lg:w-72 flex flex-col gap-3">
          {metrics.map((m) => (
            <div key={m.label} className="rounded-xl border border-border bg-muted/30 p-5">
              <p className="text-xs text-muted-foreground font-mono mb-1">{m.description}</p>
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium">{m.label}</span>
                <span className="text-2xl font-semibold tabular-nums">{m.value}</span>
              </div>
            </div>
          ))}

          <div className="rounded-xl border border-border/50 bg-muted/10 p-4 mt-2">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Edit any cell to see how each metric responds differently to the same change.
              Try making one prediction very wrong — watch RMSE spike more than MAE.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}