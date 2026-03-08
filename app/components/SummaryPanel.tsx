"use client"
import type React from "react"
import type { SmartMeterData } from "@/lib/blynk"

interface SummaryPanelProps {
  data: SmartMeterData | null
}

const SummaryPanel: React.FC<SummaryPanelProps> = ({ data }) => {
  const rows = [
    { label: "Voltage", value: data?.V0 ?? "--", unit: "V" },
    { label: "Current", value: data?.V1 ?? "--", unit: "A" },
    { label: "Power", value: data?.V2 ?? "--", unit: "W" },
    { label: "Energy Consumed", value: data?.V3 ?? "--", unit: "kWh" },
    { label: "Frequency", value: data?.V4 ?? "--", unit: "Hz" },
    { label: "Power Factor", value: data?.V5 ?? "--", unit: "" },
  ]

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Summary</h3>
      <div className="flex flex-col gap-3">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0"
          >
            <span className="text-sm text-gray-500">{row.label}</span>
            <span className="text-sm font-semibold text-gray-800 font-mono">
              {row.value} {row.unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SummaryPanel
