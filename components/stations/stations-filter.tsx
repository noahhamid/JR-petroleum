"use client"

import { ScrollAnimation } from "@/components/scroll-animation"
import { Search, Filter } from "lucide-react"

interface StationsFilterProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  filterStatus: string
  setFilterStatus: (status: string) => void
}

export function StationsFilter({ searchTerm, setSearchTerm, filterStatus, setFilterStatus }: StationsFilterProps) {
  return (
    <ScrollAnimation direction="up" className="mb-12">
      <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by station name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <div className="flex gap-2">
              {["all", "in-stock", "out-of-stock"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    filterStatus === status
                      ? "bg-amber-400 text-[#0a1628]"
                      : "bg-background border border-border text-foreground hover:bg-muted"
                  }`}
                >
                  {status === "all" ? "All Stations" : status === "in-stock" ? "In Stock" : "Out of Stock"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ScrollAnimation>
  )
}
