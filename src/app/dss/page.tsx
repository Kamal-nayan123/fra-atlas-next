"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Village } from "@/lib/types";

const villages: Village[] = [
    { id: 1, name: "Jhirkapur", state: "Madhya Pradesh", district: "Dindori", block: "Karanjia", tribal_population: 890, total_population: 1200, ifr_pattas: 45, cfr_pattas: 2, schemes_eligible: ["PM-KISAN", "Jal Jeevan Mission", "MGNREGA"], priority_interventions: ["Water infrastructure", "Road connectivity"] },
    { id: 2, name: "Bamungaon", state: "Tripura", district: "Khowai", block: "Kalyanpur", tribal_population: 567, total_population: 743, ifr_pattas: 34, cfr_pattas: 1, schemes_eligible: ["PM-KISAN", "PM Awas Yojana", "Ayushman Bharat"], priority_interventions: ["Healthcare facility", "Skill development"] },
    { id: 3, name: "Kendumundi", state: "Odisha", district: "Mayurbhanj", block: "Jashipur", tribal_population: 1234, total_population: 1567, ifr_pattas: 78, cfr_pattas: 3, schemes_eligible: ["PM-KISAN", "MGNREGA", "PM Ujjwala"], priority_interventions: ["Forest protection", "Livelihood enhancement"] },
    { id: 4, name: "Kondapuram", state: "Telangana", district: "Adilabad", block: "Utnoor", tribal_population: 789, total_population: 1045, ifr_pattas: 56, cfr_pattas: 2, schemes_eligible: ["PM-KISAN", "Jal Jeevan Mission", "Digital India"], priority_interventions: ["Digital connectivity", "Agricultural extension"] },
];

const dajguaSchemes = [
    { name: "PM-KISAN", description: "Direct income support to farmers" },
    { name: "Jal Jeevan Mission", description: "Piped water supply to every rural household" },
    { name: "MGNREGA", description: "Employment guarantee scheme" },
    { name: "PM Awas Yojana", description: "Housing for all rural households" },
    { name: "Ayushman Bharat", description: "Health insurance coverage" },
    { name: "PM Ujjwala", description: "LPG connections to women from BPL households" },
    { name: "Digital India", description: "Improving online infrastructure and internet connectivity" },
];

export default function DSSPage() {
    const [selectedState, setSelectedState] = useState("");
    const [selectedVillage, setSelectedVillage] = useState("");
    const [recommendations, setRecommendations] = useState<Village | null>(null);

    const states = useMemo(() => Array.from(new Set(villages.map(v => v.state))), []);
    const availableVillages = useMemo(() => {
        if (!selectedState) return [];
        return villages.filter(v => v.state === selectedState);
    }, [selectedState]);

    const handleShowRecommendations = () => {
        const village = villages.find(v => v.id === parseInt(selectedVillage));
        setRecommendations(village);
    };

	return (
		<div className="container mx-auto px-4 py-6">
			<div className="mb-6">
				<h1 className="text-2xl font-bold">Decision Support System</h1>
				<p className="text-muted-foreground">AI-enhanced scheme convergence and intervention prioritization</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Village Selection</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="state" className="block text-sm font-medium text-muted-foreground mb-1">State</label>
                                    <select id="state" value={selectedState} onChange={e => {setSelectedState(e.target.value); setSelectedVillage(""); setRecommendations(null);}} className="w-full p-2 border rounded-md bg-background">
                                        <option value="">Select State</option>
                                        {states.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="village" className="block text-sm font-medium text-muted-foreground mb-1">Village</label>
                                    <select id="village" value={selectedVillage} onChange={e => setSelectedVillage(e.target.value)} className="w-full p-2 border rounded-md bg-background" disabled={!selectedState}>
                                        <option value="">Select Village</option>
                                        {availableVillages.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                                    </select>
                                </div>
                                <Button onClick={handleShowRecommendations} disabled={!selectedVillage} className="w-full">
                                    <Search className="h-4 w-4 mr-2" />
                                    Get Recommendations
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Village Profile & Recommendations</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {recommendations ? (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-semibold text-lg">{recommendations.name} Profile</h3>
                                        <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                                            <p><strong>District:</strong> {recommendations.district}</p>
                                            <p><strong>Block:</strong> {recommendations.block}</p>
                                            <p><strong>Total Population:</strong> {recommendations.total_population}</p>
                                            <p><strong>Tribal Population:</strong> {recommendations.tribal_population}</p>
                                            <p><strong>IFR Pattas:</strong> {recommendations.ifr_pattas}</p>
                                            <p><strong>CFR Pattas:</strong> {recommendations.cfr_pattas}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">AI Recommended Schemes</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                            {recommendations.schemes_eligible.map((schemeName: string) => {
                                                const scheme = dajguaSchemes.find(s => s.name === schemeName);
                                                return scheme ? (
                                                    <div key={scheme.name} className="p-3 border rounded-md bg-muted/50">
                                                        <p className="font-semibold text-primary">{scheme.name}</p>
                                                        <p className="text-xs text-muted-foreground">{scheme.description}</p>
                                                    </div>
                                                ) : null;
                                            })}
                                        </div>
                                    </div>
                                     <div>
                                        <h3 className="font-semibold text-lg">Priority Interventions</h3>
                                        <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                                            {recommendations.priority_interventions.map((intervention: string) => (
                                                <li key={intervention}>{intervention}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center text-muted-foreground py-12">
                                    <p>Select a village to view AI-powered recommendations</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
			</div>
		</div>
	);
} 