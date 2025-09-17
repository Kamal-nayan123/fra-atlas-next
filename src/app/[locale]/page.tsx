"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { FileText, BadgeCheck, Clock, Users, Download, Leaf, Home as HomeIcon, Users2 } from "lucide-react";
import { useTheme } from "@/components/ui/theme-provider";
import { useMemo } from "react";
import { villageData } from "@/lib/village-data";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const dajguaSchemes = [
    { name: "PM-KISAN", description: "Direct income support to farmers", benefit: "Rs. 6000 per year" },
    { name: "Jal Jeevan Mission", description: "Piped water supply to every rural household", benefit: "Functional household tap connections" },
    { name: "MGNREGA", description: "Employment guarantee scheme", benefit: "100 days guaranteed employment" },
    { name: "PM Awas Yojana", description: "Housing for all rural households", benefit: "Rs. 1.2 lakh for plains, Rs. 1.3 lakh for hilly areas" },
    { name: "Ayushman Bharat", description: "Health insurance coverage", benefit: "Rs. 5 lakh annual coverage" }
];

export default function Home() {
    const { theme } = useTheme();

    const analytics = useMemo(() => {
        const totalVillages = villageData.length;
        const totalIfr = villageData.reduce((sum, v) => sum + v.ifr_pattas, 0);
        const totalCfr = villageData.reduce((sum, v) => sum + v.cfr_pattas, 0);
        const totalCfrr = villageData.reduce((sum, v) => sum + v.cfrr_pattas, 0);

        const stateBreakdown = villageData.reduce((acc, v) => {
            if (!acc[v.state]) {
                acc[v.state] = { ifr: 0, cfr: 0, cfrr: 0 };
            }
            if (v.type === 'ifr') acc[v.state].ifr++;
            if (v.type === 'cfr') acc[v.state].cfr++;
            if (v.type === 'cfrr') acc[v.state].cfrr++;
            return acc;
        }, {} as Record<string, { ifr: number, cfr: number, cfrr: number }>);

        return {
            metricCards: [
                { label: "Villages Mapped", value: totalVillages.toLocaleString(), icon: HomeIcon, color: "text-chart-1" },
                { label: "IFR Titles", value: totalIfr.toLocaleString(), icon: Users2, color: "text-chart-2" },
                { label: "CFR Titles", value: totalCfr.toLocaleString(), icon: Users, color: "text-chart-3" },
                { label: "CFRR Titles", value: totalCfrr.toLocaleString(), icon: Leaf, color: "text-chart-4" },
            ],
            stateBarData: {
                labels: Object.keys(stateBreakdown),
                datasets: [
                    { label: 'IFR Villages', data: Object.values(stateBreakdown).map(s => s.ifr), backgroundColor: 'var(--color-chart-2)' },
                    { label: 'CFR Villages', data: Object.values(stateBreakdown).map(s => s.cfr), backgroundColor: 'var(--color-chart-3)' },
                    { label: 'CFRR Villages', data: Object.values(stateBreakdown).map(s => s.cfrr), backgroundColor: 'var(--color-chart-4)' },
                ]
            },
            claimsDoughnutData: {
                labels: ["IFR", "CFR", "CFRR"],
                datasets: [{
                    data: [totalIfr, totalCfr, totalCfrr],
                    backgroundColor: ['var(--color-chart-2)', 'var(--color-chart-3)', 'var(--color-chart-4)'],
                    borderWidth: 4,
                }],
            }
        };
    }, []);

    const chartOptions = (darkColor: string, lightColor: string) => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "top" as const, labels: { color: theme === 'dark' ? darkColor : lightColor } } },
        scales: {
            y: { beginAtZero: true, ticks: { color: theme === 'dark' ? darkColor : lightColor }, grid: { color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' } },
            x: { ticks: { color: theme === 'dark' ? darkColor : lightColor }, grid: { color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' } }
        },
    });

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex justify-between items-start mb-8">
				<div>
					<h1 className="text-3xl font-bold">FRA Dashboard</h1>
					<p className="text-muted-foreground">High-level overview of Forest Rights Act implementation.</p>
				</div>
				<button className="btn btn-primary inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-sm hover:bg-primary/90 transition-colors">
					<Download className="h-4 w-4" />
					Export Report
				</button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
				{analytics.metricCards.map((metric, idx) => (
					<Card key={idx}>
						<CardContent className="p-6 flex items-center space-x-4">
                            <div className={`p-3 rounded-lg bg-primary/10 ${metric.color}`}>
                                <metric.icon className="h-6 w-6" />
                            </div>
							<div>
								<p className="text-sm text-muted-foreground">{metric.label}</p>
								<p className="text-2xl font-bold">{metric.value}</p>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
				<div className="lg:col-span-3">
					<Card>
						<CardHeader>
							<CardTitle>State-wise Village Distribution</CardTitle>
						</CardHeader>
						<CardContent>
							<div style={{height: 350}}>
								<Bar data={analytics.stateBarData} options={chartOptions('#FFF', '#000')} />
							</div>
						</CardContent>
					</Card>
				</div>
				<div className="lg:col-span-2">
					<Card>
						<CardHeader>
							<CardTitle>Claim Types Distribution</CardTitle>
						</CardHeader>
						<CardContent>
							<div style={{height: 350}}>
								<Doughnut data={{...analytics.claimsDoughnutData, datasets: analytics.claimsDoughnutData.datasets.map(ds => ({...ds, borderColor: theme === 'dark' ? 'oklch(0.15 0.02 240)' : 'oklch(1 0 0)'}))}} options={{...chartOptions('#FFF', '#000'), plugins: { legend: { position: "bottom" as const }}}} />
							</div>
						</CardContent>
					</Card>
				</div>
			</div>

            <Card>
                <CardHeader>
                    <CardTitle>DAJGUA Scheme Convergence</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                        {dajguaSchemes.map((scheme, idx) => (
                            <div key={idx} className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="font-semibold text-primary">{scheme.name}</h3>
                                <p className="text-sm text-muted-foreground mt-1 h-16">{scheme.description}</p>
                                <p className="text-sm font-medium mt-2"><strong>Benefit:</strong> {scheme.benefit}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
		</div>
	);
}
