"use client"
import type React from "react"

interface SidebarProps {
  relayState: boolean
  onToggleRelay: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ relayState, onToggleRelay }) => {
  return (
    <aside className="w-64 shrink-0 bg-[#2c3e6b] flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <div className="w-9 h-9 rounded-lg bg-sky-400 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <span className="font-bold text-lg text-white tracking-tight">SMMS</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        <a
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/15 text-white text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z"
            />
          </svg>
          Dashboard
        </a>
        <a
          href="/analytics"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          Analytics
        </a>
      </nav>

      {/* Loads */}
      <div className="px-4 pb-4">
        <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 px-1">
          Loads
        </h3>
        <div className="flex flex-col gap-1">
          {["Pump", "Iron", "Mini Fridge", "Water Heater"].map((load) => (
            <div
              key={load}
              className="bg-sky-600/60 hover:bg-sky-600/80 text-white text-sm font-medium py-2 px-3 rounded-lg text-center transition-colors cursor-default"
            >
              {load}
            </div>
          ))}
        </div>
      </div>

      {/* Relay Control */}
      <div className="px-4 pb-5">
        <div className="bg-white/10 rounded-xl p-4">
          <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">
            Relay Control
          </h3>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-white/80">Status</span>
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                relayState
                  ? "bg-emerald-400/20 text-emerald-300"
                  : "bg-white/10 text-white/50"
              }`}
            >
              {relayState ? "ON" : "OFF"}
            </span>
          </div>
          <button
            onClick={onToggleRelay}
            className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all ${
              relayState
                ? "bg-rose-500 hover:bg-rose-600 text-white"
                : "bg-sky-400 hover:bg-sky-500 text-white"
            }`}
          >
            {relayState ? "Turn Off" : "Turn On"}
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
