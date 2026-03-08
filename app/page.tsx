"use client"
import { useEffect, useState, useRef } from "react"
import Sidebar from "./components/Sidebar"
import ValueCard from "./components/ValueCard"
import TrendChart from "./components/TrendChart"
import SummaryPanel from "./components/SummaryPanel"
import { fetchBlynkData, type SmartMeterData, setRelayState, getRelayState } from "../lib/blynk"

type DataPoint = SmartMeterData & { timestamp: string }

export default function HomePage() {
  const [data, setData] = useState<SmartMeterData | null>(null)
  const [history, setHistory] = useState<DataPoint[]>([])
  const [relayState, setRelayStateLocal] = useState<boolean>(false)
  const historyRef = useRef<DataPoint[]>([])

  useEffect(() => {
    const interval = setInterval(async () => {
      const newData = await fetchBlynkData()
      const rState = await getRelayState()

      if (newData) {
        setData(newData)
        setRelayStateLocal(rState === 1)

        const point: DataPoint = {
          ...newData,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        }
        const updated = [...historyRef.current.slice(-29), point]
        historyRef.current = updated
        setHistory(updated)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const toggleRelay = async () => {
    const newState = !relayState
    setRelayStateLocal(newState)
    await setRelayState(newState ? 1 : 0)
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar relayState={relayState} onToggleRelay={toggleRelay} />

      <main className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#2c3e6b]">
              Meter Data Management System
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Real-time monitoring and analysis
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm text-gray-600">Live</span>
          </div>
        </div>

        {/* Top Row: Power value + Voltage value */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <ValueCard label="Power" value={data?.V2 ?? "--"} unit="W" color="#06b6d4" />
          <ValueCard label="Voltage" value={data?.V0 ?? "--"} unit="V" color="#a78bfa" />
          <ValueCard label="Current" value={data?.V1 ?? "--"} unit="A" color="#34d399" />
        </div>

        {/* Middle Row: Power Trend + Voltage Trend */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <TrendChart
            title="Power"
            dataKey="V2"
            color="#06b6d4"
            data={history}
            unit="W"
          />
          <TrendChart
            title="Voltage"
            dataKey="V0"
            color="#a78bfa"
            data={history}
            unit="V"
          />
        </div>

        {/* Bottom Row: Current Trend + Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TrendChart
            title="Current"
            dataKey="V1"
            color="#34d399"
            data={history}
            unit="A"
          />
          <SummaryPanel data={data} />
        </div>
      </main>
    </div>
  )
}
