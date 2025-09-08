"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMemo, useState } from "react";

// Mock villages lifted from legacy app
const villages = [
	{ id: 1, name: "Jhirkapur", state: "Madhya Pradesh", district: "Dindori", ifr_pattas: 45, cfr_pattas: 2, total_population: 1200, lat: 22.9676, lng: 81.0082 },
	{ id: 2, name: "Bamungaon", state: "Tripura", district: "Khowai", ifr_pattas: 34, cfr_pattas: 1, total_population: 743, lat: 24.0633, lng: 91.6764 },
	{ id: 3, name: "Kendumundi", state: "Odisha", district: "Mayurbhanj", ifr_pattas: 78, cfr_pattas: 3, total_population: 1567, lat: 22.1061, lng: 86.4056 },
	{ id: 4, name: "Kondapuram", state: "Telangana", district: "Adilabad", ifr_pattas: 56, cfr_pattas: 2, total_population: 1045, lat: 19.4978, lng: 79.3176 },
];

const defaultIcon = new L.Icon({
	iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
	iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
	shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

export default function AtlasPage() {
	const [stateFilter, setStateFilter] = useState<string>("");
	const [search, setSearch] = useState<string>("");

	const states = useMemo(() => Array.from(new Set(villages.map(v => v.state))), []);
	const filtered = useMemo(() => {
		return villages.filter(v => (!stateFilter || v.state === stateFilter) && (
			!search || v.name.toLowerCase().includes(search.toLowerCase()) || v.district.toLowerCase().includes(search.toLowerCase())
		));
	}, [stateFilter, search]);

	return (
		<div className="container mx-auto px-4 py-6">
			<div className="mb-3">
				<h1 className="h3 m-0">FRA Atlas</h1>
				<p className="text-muted m-0 mt-2">Interactive map of villages and rights</p>
			</div>
			<Card>
				<CardHeader>
					<CardTitle className="fs-6">Map</CardTitle>
					<CardDescription>Search and filter by state</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="row g-3 mb-3">
						<div className="col-12 col-md-6">
							<input className="form-control" placeholder="Search village or district" value={search} onChange={(e) => setSearch(e.target.value)} />
						</div>
						<div className="col-12 col-md-6">
							<select className="form-select" value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}>
								<option value="">All States</option>
								{states.map(s => <option key={s} value={s}>{s}</option>)}
							</select>
						</div>
					</div>
					<div style={{height: "70vh"}}>
						<MapContainer center={[20.5937, 78.9629]} zoom={5} style={{height: "100%", width: "100%"}}>
							<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />
							{filtered.map(v => (
								<Marker position={[v.lat, v.lng]} key={v.id}>
									<Popup>
										<div className="village-popup">
											<h6 className="m-0 mb-2 text-primary">{v.name}</h6>
											<div className="small">
												<div className="d-flex justify-content-between"><span>State:</span><span>{v.state}</span></div>
												<div className="d-flex justify-content-between"><span>District:</span><span>{v.district}</span></div>
												<div className="d-flex justify-content-between"><span>IFR Pattas:</span><span>{v.ifr_pattas}</span></div>
												<div className="d-flex justify-content-between"><span>CFR Pattas:</span><span>{v.cfr_pattas}</span></div>
												<div className="d-flex justify-content-between"><span>Population:</span><span>{v.total_population}</span></div>
											</div>
										</div>
									</Popup>
								</Marker>
							))}
						</MapContainer>
					</div>
				</CardContent>
			</Card>
		</div>
	);
} 