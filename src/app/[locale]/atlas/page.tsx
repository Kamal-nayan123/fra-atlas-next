"use client";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { villageData } from "@/lib/village-data";

const AtlasMap = dynamic(() => import("@/components/atlas-map"), {
    ssr: false,
    loading: () => <p>Loading map...</p>,
});

export default function AtlasPage() {
	const [stateFilter, setStateFilter] = useState<string>("");
    const [districtFilter, setDistrictFilter] = useState<string>("");
	const [search, setSearch] = useState<string>("");
    const [showIFR, setShowIFR] = useState<boolean>(true);
    const [showCFR, setShowCFR] = useState<boolean>(true);
    const [showCFRR, setShowCFRR] = useState<boolean>(true);

	const states = useMemo(() => Array.from(new Set(villageData.map(v => v.state))), []);
    const districts = useMemo(() => {
        if (!stateFilter) return [];
        return Array.from(new Set(villageData.filter(v => v.state === stateFilter).map(v => v.district)))
    }, [stateFilter]);

	const filteredVillages = useMemo(() => {
		return villageData.filter(v =>
            (showIFR && v.type === 'ifr') ||
            (showCFR && v.type === 'cfr') ||
            (showCFRR && v.type === 'cfrr')
        ).filter(v =>
            (!stateFilter || v.state === stateFilter) &&
            (!districtFilter || v.district === districtFilter) &&
            (!search || v.name.toLowerCase().includes(search.toLowerCase()))
        );
	}, [stateFilter, districtFilter, search, showIFR, showCFR, showCFRR]);

	return (
		<div className="flex h-screen">
            <div className="w-1/4 bg-background border-r p-4 overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">FRA Atlas Controls</h2>

                <div className="mb-4">
                    <h3 className="font-semibold mb-2">Map Layers</h3>
                    <div className="flex items-center">
                        <input type="checkbox" id="ifrLayer" className="mr-2" checked={showIFR} onChange={(e) => setShowIFR(e.target.checked)} />
                        <label htmlFor="ifrLayer">Individual Forest Rights (IFR)</label>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" id="cfrLayer" className="mr-2" checked={showCFR} onChange={(e) => setShowCFR(e.target.checked)} />
                        <label htmlFor="cfrLayer">Community Forest Rights (CFR)</label>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" id="cfrrLayer" className="mr-2" checked={showCFRR} onChange={(e) => setShowCFRR(e.target.checked)} />
                        <label htmlFor="cfrrLayer">Community Forest Resource Rights (CFRR)</label>
                    </div>
                </div>

                <div className="mb-4">
                    <h3 className="font-semibold mb-2">Search Villages</h3>
                    <input
                        type="text"
                        placeholder="Enter village name..."
                        className="w-full p-2 border rounded-md bg-background"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <h3 className="font-semibold mb-2">Filters</h3>
                    <select
                        className="w-full p-2 border rounded-md mb-2 bg-background"
                        value={stateFilter}
                        onChange={(e) => {
                            setStateFilter(e.target.value);
                            setDistrictFilter("");
                        }}
                    >
                        <option value="">All States</option>
                        {states.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <select
                        className="w-full p-2 border rounded-md bg-background"
                        value={districtFilter}
                        onChange={(e) => setDistrictFilter(e.target.value)}
                        disabled={!stateFilter}
                    >
                        <option value="">All Districts</option>
                        {districts.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">Legend</h3>
                    <div className="flex items-center mb-1">
                        <span className="w-4 h-4 bg-blue-500 rounded-sm mr-2"></span>
                        <small>IFR Villages</small>
                    </div>
                    <div className="flex items-center mb-1">
                        <span className="w-4 h-4 bg-green-500 rounded-sm mr-2"></span>
                        <small>CFR Villages</small>
                    </div>
                    <div className="flex items-center">
                        <span className="w-4 h-4 bg-orange-500 rounded-sm mr-2"></span>
                        <small>CFRR Villages</small>
                    </div>
                </div>
            </div>
            <div className="w-3/4">
                <AtlasMap villages={filteredVillages} />
            </div>
		</div>
	);
}
