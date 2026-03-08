"use client"
import { useEffect, useState, useRef } from "react"
import { fetchBlynkData, type SmartMeterData, getRelayState, setRelayState } from "@/lib/blynk"
import Sidebar from "../components/Sidebar"
import TrendChart from "../components/TrendChart"
import ValueCard from "../components/ValueCard"

type DataPoint = SmartMeterData & { timestamp: string }

export default function AnalyticsPage() {
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
    }, 3000)

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
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#2c3e6b]">Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">
            Detailed real-time energy consumption trends
          </p>
        </div>

        {/* Value cards row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <ValueCard label="Voltage" value={data?.V0 ?? "--"} unit="V" color="#a78bfa" />
          <ValueCard label="Current" value={data?.V1 ?? "--"} unit="A" color="#34d399" />
          <ValueCard label="Power" value={data?.V2 ?? "--"} unit="W" color="#06b6d4" />
          <ValueCard label="Energy" value={data?.V3 ?? "--"} unit="kWh" color="#fbbf24" />
          <ValueCard label="Frequency" value={data?.V4 ?? "--"} unit="Hz" color="#f472b6" />
          <ValueCard label="PF" value={data?.V5 ?? "--"} color="#fb923c" />
        </div>

        {/* Charts grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <TrendChart title="Voltage" dataKey="V0" color="#a78bfa" data={history} unit="V" />
          <TrendChart title="Current" dataKey="V1" color="#34d399" data={history} unit="A" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <TrendChart title="Power" dataKey="V2" color="#06b6d4" data={history} unit="W" />
          <TrendChart title="Energy" dataKey="V3" color="#fbbf24" data={history} unit="kWh" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TrendChart title="Frequency" dataKey="V4" color="#f472b6" data={history} unit="Hz" />
          <TrendChart title="Power Factor" dataKey="V5" color="#fb923c" data={history} unit="" />
        </div>
      </main>
    </div>
  )
}
