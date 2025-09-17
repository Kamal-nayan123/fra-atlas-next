import { Village } from './types';

export const dajguaSchemes = [
    { name: "PM-KISAN", description: "Direct income support to farmers" },
    { name: "Jal Jeevan Mission", description: "Piped water supply to every rural household" },
    { name: "MGNREGA", description: "Employment guarantee scheme" },
    { name: "PM Awas Yojana", description: "Housing for all rural households" },
    { name: "Ayushman Bharat", description: "Health insurance coverage" },
    { name: "PM Ujjwala", description: "LPG connections to women from BPL households" },
    { name: "Digital India", description: "Improving online infrastructure and internet connectivity" },
    { name: "Van Dhan Vikas Yojana", description: "Training and capacity building for tribal forest produce gatherers" },
    { name: "Eklavya Model Residential Schools (EMRS)", description: "Quality education for tribal students" },
    { name: "National Rural Livelihood Mission (NRLM)", description: "Creating efficient and effective institutional platforms for the rural poor" },
    { name: "Pradhan Mantri Gram Sadak Yojana (PMGSY)", description: "Good all-weather road connectivity to unconnected villages" },
    { name: "Swachh Bharat Mission (Gramin)", description: "To achieve universal sanitation coverage in rural areas" },
    { name: "National Health Mission (NHM)", description: "Providing effective healthcare to rural population" },
];

const schemes = dajguaSchemes.map(s => s.name);

const getRandomSchemes = () => {
    const numSchemes = Math.floor(Math.random() * 3) + 2;
    const shuffled = schemes.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numSchemes);
}

export const villages: Village[] = Array.from({ length: 200 }, (_, i) => {
    const state = ["Maharashtra", "Tamil Nadu", "West Bengal", "Karnataka"][i % 4];
    const district = ["Dhule", "Ariyalur", "Purba Bardhaman", "Kolar"][i % 4];
    return {
        id: i + 1,
        name: `Village ${i + 1}`,
        state,
        district,
        ifr_pattas: Math.floor(Math.random() * 100) + 10,
        cfr_pattas: Math.floor(Math.random() * 10) + 1,
        total_population: Math.floor(Math.random() * 2000) + 500,
        lat: 20 + Math.random() * 5,
        lng: 74 + Math.random() * 5,
        type: ["ifr", "cfr", "community_forest_resource", "pending"][i % 4],
        schemes_eligible: getRandomSchemes(),
        priority_interventions: ["Water infrastructure", "Road connectivity", "Healthcare facility", "Skill development"].slice(0, Math.floor(Math.random() * 2) + 1),
    }
});
