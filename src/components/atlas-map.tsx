"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Village } from "@/lib/types";

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

export default function AtlasMap({ villages }: { villages: Village[] }) {
    return (
        <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{height: "100%", width: "100%"}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />
            {villages.map((v: Village) => (
                <Marker position={[v.lat, v.lng]} key={v.id}>
                    <Popup>
                        <div>
                            <h3 className="font-bold text-primary">{v.name}</h3>
                            <p>State: {v.state}</p>
                            <p>District: {v.district}</p>
                            <p>IFR Pattas: {v.ifr_pattas}</p>
                            <p>CFR Pattas: {v.cfr_pattas}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
