"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { ScrollAnimation } from "@/components/scroll-animation";
import { StationsFilter } from "./stations-filter";
import {
  MapPin,
  Phone,
  Clock,
  Fuel,
  Droplets,
  Navigation,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Plane,
} from "lucide-react";

type Station = {
  id: string;
  name: string;
  location: string;
  city: string;
  phone: string;
  hours: string;
  image: string;
  gasoline: "available" | "low" | "out";
  diesel: "available" | "low" | "out";
  lubricants: "available" | "low" | "out";
  jetFuel: "available" | "low" | "out";
  featured: boolean;
};

export function StationsList() {
  const [stations, setStations] = useState<Station[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "stations"), (snapshot) => {
      setStations(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Station))
      );
    });
    return () => unsub();
  }, []);

  // Compute stock logic for the stats header
  const getStatus = (station: Station) =>
    station.gasoline !== "out" || station.diesel !== "out"
      ? "in-stock"
      : "out-of-stock";

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case "low":
        return <AlertCircle className="w-4 h-4 text-amber-500" />;
      case "out":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusLabelClass = (status: string) => {
    switch (status) {
      case "available":
        return "text-emerald-600";
      case "low":
        return "text-amber-600";
      case "out":
        return "text-red-600 line-through opacity-60";
      default:
        return "text-gray-500";
    }
  };

  const filteredStations = stations.filter((station) => {
    const status = getStatus(station);
    const matchesSearch =
      station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.city.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterStatus === "in-stock")
      return status === "in-stock" && matchesSearch;
    if (filterStatus === "out-of-stock")
      return status === "out-of-stock" && matchesSearch;
    return matchesSearch;
  });

  const inStockCount = stations.filter(
    (s) => getStatus(s) === "in-stock"
  ).length;
  const outOfStockCount = stations.filter(
    (s) => getStatus(s) === "out-of-stock"
  ).length;

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-23">
        {/* Header Animation */}
        <ScrollAnimation direction="up">
          <div className="text-center mb-12">
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider">
              Our Network
            </span>
            <h2 className="text-4xl font-bold mt-2">Station Locations</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Find real-time fuel availability at all our stations. Plan your
              journey with confidence.
            </p>
          </div>
        </ScrollAnimation>

        {/* Stats Animation */}
        <ScrollAnimation direction="up" delay={100}>
          <div className="flex justify-center gap-8 mb-12">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-foreground font-medium">
                {inStockCount} In Stock
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="text-foreground font-medium">
                {outOfStockCount} Out of Stock
              </span>
            </div>
          </div>
        </ScrollAnimation>

        <StationsFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {filteredStations.map((station, index) => (
            <ScrollAnimation
              key={station.id}
              // Multi-directional animation logic
              direction={
                index % 3 === 0 ? "left" : index % 3 === 1 ? "up" : "right"
              }
              delay={index * 50}
            >
              <div
                className={`group bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                  station.featured ? "ring-2 ring-amber-400" : ""
                }`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={station.image || "/placeholder.svg"}
                    alt={station.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* City Badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-bold rounded-full">
                      {station.city}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4 group-hover:text-amber-500 transition-colors">
                    {station.name}
                  </h3>

                  {/* PRODUCTS STATUS LIST */}
                  <div className="bg-muted/40 rounded-xl p-4 mb-6 space-y-3">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">
                      Product Availability
                    </p>

                    {[
                      {
                        key: "gasoline",
                        label: "Gasoline",
                        icon: <Fuel className="w-3.5 h-3.5" />,
                      },
                      {
                        key: "diesel",
                        label: "Diesel",
                        icon: <Droplets className="w-3.5 h-3.5" />,
                      },
                      {
                        key: "lubricants",
                        label: "Lubricants",
                        icon: (
                          <Droplets className="w-3.5 h-3.5 text-blue-500" />
                        ),
                      },
                      {
                        key: "jetFuel",
                        label: "Jet Fuel",
                        icon: <Plane className="w-3.5 h-3.5 text-sky-500" />,
                      },
                    ].map((item) => {
                      const status = (station as any)[item.key] || "out";
                      return (
                        <div
                          key={item.key}
                          className="flex items-center justify-between border-b border-border/20 last:border-0 pb-2 last:pb-0"
                        >
                          <div className="flex items-center gap-2">
                            {getStatusIcon(status)}
                            <div className="flex items-center gap-1.5">
                              <span className="opacity-50">{item.icon}</span>
                              <span
                                className={`font-medium text-sm ${getStatusLabelClass(
                                  status
                                )}`}
                              >
                                {item.label}
                              </span>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold opacity-40 uppercase">
                            {status}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-amber-500" />{" "}
                      {station.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-amber-500" />{" "}
                      {station.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-500" />{" "}
                      {station.hours}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Empty State Animation */}
        {filteredStations.length === 0 && (
          <ScrollAnimation direction="up">
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No Stations Found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          </ScrollAnimation>
        )}
      </div>
    </section>
  );
}
