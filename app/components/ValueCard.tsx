"use client"
import type React from "react"

interface ValueCardProps {
  label: string
  value: string | number
  unit?: string
  color: string
}

const ValueCard: React.FC<ValueCardProps> = ({ label, value, unit, color }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col justify-between shadow-sm">
      <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
        {label}
      </span>
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-bold font-mono" style={{ color }}>
          {value}
        </span>
        {unit && (
          <span className="text-lg text-gray-400 font-medium">{unit}</span>
        )}
      </div>
    </div>
  )
}

export default ValueCard
