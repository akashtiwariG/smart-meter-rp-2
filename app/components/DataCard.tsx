"use client"
import type React from "react"

interface DataCardProps {
  label: string
  value: string | number
  unit?: string
  color?: "blue" | "teal" | "emerald" | "amber" | "violet" | "rose"
}

const colorClasses = {
  blue: "from-blue-500 to-blue-600 shadow-blue-500/30",
  teal: "from-teal-500 to-teal-600 shadow-teal-500/30",
  emerald: "from-emerald-500 to-emerald-600 shadow-emerald-500/30",
  amber: "from-amber-500 to-amber-600 shadow-amber-500/30",
  violet: "from-violet-500 to-violet-600 shadow-violet-500/30",
  rose: "from-rose-500 to-rose-600 shadow-rose-500/30",
}

const DataCard: React.FC<DataCardProps> = ({ label, value, unit, color = "blue" }) => {
  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
      <div className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${colorClasses[color]} shadow-lg mb-4`}>
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">{label}</h2>
      </div>
      <p className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white font-mono">
        {value}
        {unit && <span className="text-2xl text-gray-600 dark:text-gray-400 ml-2 font-sans">{unit}</span>}
      </p>
    </div>
  )
}

export default DataCard
