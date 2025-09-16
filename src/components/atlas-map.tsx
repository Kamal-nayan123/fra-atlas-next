"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Village } from "@/lib/types";

const createIcon = (color: string) => new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const blueIcon = createIcon('blue');
const greenIcon = createIcon('green');
const orangeIcon = createIcon('orange');

const getIcon = (type: Village['type']) => {
    switch (type) {
        case 'ifr':
            return blueIcon;
        case 'cfr':
            return greenIcon;
        case 'cfrr':
            return orangeIcon;
        default:
            return blueIcon;
    }
};

export default function AtlasMap({ villages }: { villages: Village[] }) {
    return (
        <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{height: "100%", width: "100%"}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />
            {villages.map((v: Village) => (
                <Marker position={[v.lat, v.lng]} key={v.id} icon={getIcon(v.type)}>
                    <Popup>
                        <div>
                            <h3 className="font-bold text-primary">{v.name}</h3>
                            <p>State: {v.state}</p>
                            <p>District: {v.district}</p>
                            <p>IFR Pattas: {v.ifr_pattas}</p>
                            <p>CFR Pattas: {v.cfr_pattas}</p>
                            <p>CFRR Pattas: {v.cfrr_pattas}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
