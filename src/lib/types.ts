export interface Village {
    id: number;
    name: string;
    state: string;
    district: string;
    block: string;
    tribal_population: number;
    total_population: number;
    ifr_pattas: number;
    cfr_pattas: number;
    cfrr_pattas: number;
    lat: number;
    lng: number;
    type: 'ifr' | 'cfr' | 'cfrr';
    schemes_eligible: string[];
    priority_interventions: string[];
}
