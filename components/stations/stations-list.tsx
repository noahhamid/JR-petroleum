"use client";

import { useState } from "react";
import { ScrollAnimation } from "@/components/scroll-animation";
import { StationsFilter } from "./stations-filter";
import {
  MapPin,
  Phone,
  Clock,
  Fuel,
  Droplets,
  Car,
  CheckCircle,
  XCircle,
  Navigation,
} from "lucide-react";

const stations = [
  {
    id: 1,
    name: "Jr Petroleum - Bole",
    location: "Bole Road, Near Bole International Airport",
    city: "Addis Ababa",
    phone: "+251 11 234 5678",
    hours: "24/7",
    status: "in-stock",
    services: ["gasoline", "diesel", "car-wash"],
    image: "/modern-fuel-station-bole-addis-ababa-sunny-day.jpg",
  },
  {
    id: 2,
    name: "Jr Petroleum - Piassa",
    location: "Piassa, Near National Theatre",
    city: "Addis Ababa",
    phone: "+251 11 234 5679",
    hours: "6AM - 11PM",
    status: "in-stock",
    services: ["gasoline", "diesel"],
    image: "/gas-station-city-center-piassa-ethiopia.jpg",
  },
  {
    id: 3,
    name: "Jr Petroleum - Kazanchis",
    location: "Kazanchis, Behind Sheraton Hotel",
    city: "Addis Ababa",
    phone: "+251 11 234 5680",
    hours: "24/7",
    status: "out-of-stock",
    services: ["gasoline", "diesel", "car-wash"],
    image: "/fuel-station-kazanchis-night-lights.jpg",
  },
  {
    id: 4,
    name: "Jr Petroleum - Megenagna",
    location: "Megenagna Square",
    city: "Addis Ababa",
    phone: "+251 11 234 5681",
    hours: "24/7",
    status: "in-stock",
    services: ["gasoline", "diesel", "lubricants"],
    image: "/modern-petrol-station-megenagna-busy-traffic.jpg",
  },
  {
    id: 5,
    name: "Jr Petroleum - Bahir Dar",
    location: "Main Road, Near Lake Tana",
    city: "Bahir Dar",
    phone: "+251 58 220 1234",
    hours: "6AM - 10PM",
    status: "in-stock",
    services: ["gasoline", "diesel"],
    image: "/gas-station-bahir-dar-ethiopia-lakeside.jpg",
  },
  {
    id: 6,
    name: "Jr Petroleum - Hawassa",
    location: "Hawassa Main Street",
    city: "Hawassa",
    phone: "+251 46 220 5678",
    hours: "24/7",
    status: "out-of-stock",
    services: ["gasoline", "diesel", "car-wash"],
    image: "/fuel-station-hawassa-rift-valley.jpg",
  },
  {
    id: 7,
    name: "Jr Petroleum - Adama",
    location: "Adama Industrial Zone",
    city: "Adama",
    phone: "+251 22 111 2345",
    hours: "24/7",
    status: "in-stock",
    services: ["gasoline", "diesel", "lubricants", "car-wash"],
    image: "/industrial-gas-station-adama-nazret.jpg",
  },
  {
    id: 8,
    name: "Jr Petroleum - Dire Dawa",
    location: "Near Railway Station",
    city: "Dire Dawa",
    phone: "+251 25 111 8901",
    hours: "6AM - 11PM",
    status: "in-stock",
    services: ["gasoline", "diesel"],
    image: "/petrol-station-dire-dawa-railway.jpg",
  },
  {
    id: 9,
    name: "Jr Petroleum - Jimma",
    location: "Jimma Town Center",
    city: "Jimma",
    phone: "+251 47 111 3456",
    hours: "6AM - 10PM",
    status: "out-of-stock",
    services: ["gasoline", "diesel"],
    image: "/gas-station-jimma-coffee-region-ethiopia.jpg",
  },
  {
    id: 10,
    name: "Jr Petroleum - Mekelle",
    location: "Mekelle Business District",
    city: "Mekelle",
    phone: "+251 34 440 1234",
    hours: "24/7",
    status: "in-stock",
    services: ["gasoline", "diesel", "lubricants"],
    image: "/modern-fuel-station-mekelle-tigray.jpg",
  },
  {
    id: 11,
    name: "Jr Petroleum - Gondar",
    location: "Near Fasil Castle",
    city: "Gondar",
    phone: "+251 58 111 7890",
    hours: "6AM - 10PM",
    status: "in-stock",
    services: ["gasoline", "diesel"],
    image: "/gas-station-gondar-historic-area.jpg",
  },
  {
    id: 12,
    name: "Jr Petroleum - Airport Hub",
    location: "Bole International Airport",
    city: "Addis Ababa",
    phone: "+251 11 234 9999",
    hours: "24/7",
    status: "in-stock",
    services: ["aviation-fuel", "gasoline", "diesel"],
    image: "/airport-fuel-station-ethiopian-airlines-jets.jpg",
    featured: true,
  },
];

const serviceIcons: Record<string, { icon: typeof Fuel; label: string }> = {
  gasoline: { icon: Fuel, label: "Gasoline" },
  diesel: { icon: Droplets, label: "Diesel" },
  "car-wash": { icon: Car, label: "Car Wash" },
  lubricants: { icon: Droplets, label: "Lubricants" },
  "aviation-fuel": { icon: Fuel, label: "Jet Fuel" },
};

export function StationsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredStations = stations.filter((station) => {
    const matchesSearch =
      station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "in-stock" && station.status === "in-stock") ||
      (filterStatus === "out-of-stock" && station.status === "out-of-stock");

    return matchesSearch && matchesStatus;
  });

  const inStockCount = stations.filter((s) => s.status === "in-stock").length;
  const outOfStockCount = stations.filter(
    (s) => s.status === "out-of-stock"
  ).length;

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-23">
        {/* Header */}
        <ScrollAnimation direction="up">
          <div className="text-center mb-12">
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider">
              Our Network
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              Station Locations
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Find real-time fuel availability at all our stations. Plan your
              journey with confidence.
            </p>
          </div>
        </ScrollAnimation>

        {/* Stats */}
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

        {/* Filter */}
        <StationsFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStations.map((station, index) => (
            <ScrollAnimation
              key={station.id}
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
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={station.image || "/placeholder.svg"}
                    alt={station.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    {station.status === "in-stock" ? (
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-lg">
                        <CheckCircle className="w-3.5 h-3.5" />
                        In Stock
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
                        <XCircle className="w-3.5 h-3.5" />
                        Out of Stock
                      </span>
                    )}
                  </div>

                  {/* Featured Badge */}
                  {station.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-amber-400 text-[#0a1628] text-xs font-bold rounded-full shadow-lg">
                        Aviation Hub
                      </span>
                    </div>
                  )}

                  {/* City */}
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-lg">
                      {station.city}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-amber-500 transition-colors">
                    {station.name}
                  </h3>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-2 text-muted-foreground text-sm">
                      <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{station.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{station.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{station.hours}</span>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {station.services.map((service) => {
                      const ServiceIcon = serviceIcons[service]?.icon || Fuel;
                      return (
                        <span
                          key={service}
                          className="flex items-center gap-1.5 px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                        >
                          <ServiceIcon className="w-3 h-3" />
                          {serviceIcons[service]?.label || service}
                        </span>
                      );
                    })}
                  </div>

                  {/* Action */}
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0a1628] text-white font-medium rounded-lg hover:bg-amber-500 hover:text-[#0a1628] transition-all group/btn">
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </button>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Empty State */}
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
