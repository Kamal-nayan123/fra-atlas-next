"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { useTheme } from '@/components/ui/theme-provider';
import { useMemo } from "react";
import { villageData } from "@/lib/village-data";
import { Landmark } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend);

// Note: Timeline data is static as it represents historical trends.
const timelineData = {
    labels: ['2020', '2021', '2022', '2023', '2024'],
    datasets: [{
        label: 'Title Distribution Progress',
        data: [25.3, 32.1, 38.7, 44.2, 49.02],
        borderColor: 'rgb(79, 112, 255)',
        backgroundColor: 'rgba(79, 112, 255, 0.1)',
        fill: true,
        tension: 0.4
    }]
};

export default function AnalyticsPage() {
    const { theme } = useTheme();

    const analytics = useMemo(() => {
        const totalVillages = villageData.length;
        const ifrVillages = villageData.filter(v => v.type === 'ifr').length;
        const cfrVillages = villageData.filter(v => v.type === 'cfr').length;
        const cfrrVillages = villageData.filter(v => v.type === 'cfrr').length;

        const coverageByState = villageData.reduce((acc, v) => {
            acc[v.state] = (acc[v.state] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return {
            kpiData: [
                { indicator: "Total Villages Tracked", value: totalVillages, unit: "" },
                { indicator: "IFR Villages", value: ((ifrVillages / totalVillages) * 100).toFixed(2), unit: "%" },
                { indicator: "CFR Villages", value: ((cfrVillages / totalVillages) * 100).toFixed(2), unit: "%" },
                { indicator: "CFRR Villages", value: ((cfrrVillages / totalVillages) * 100).toFixed(2), unit: "%" },
            ],
            coverageData: {
                labels: Object.keys(coverageByState),
                datasets: [{
                    label: 'Number of Villages',
                    data: Object.values(coverageByState),
                    backgroundColor: [
                        'rgb(86, 137, 255)',
                        'rgb(0, 158, 110)',
                        'rgb(238, 125, 0)',
                        'rgb(255, 0, 159)',
                        'rgb(0, 162, 185)',
                        'rgb(86, 137, 255)'
                    ]
                }]
            }
        };
    }, []);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: theme === 'dark' ? 'white' : 'black' } } },
        scales: {
            y: {
                ticks: { color: theme === 'dark' ? 'white' : 'black' },
                grid: { color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }
            },
            x: {
                ticks: { color: theme === 'dark' ? 'white' : 'black' },
                grid: { color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }
            }
        }
    };

	return (
		<div className="container mx-auto px-4 py-6">
			<div className="mb-6">
				<h1 className="text-2xl font-bold">Monitoring & Analytics</h1>
				<p className="text-muted-foreground">Comprehensive FRA implementation tracking and insights</p>
			</div>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Key Performance Indicators</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {analytics.kpiData.map((kpi, idx) => (
                            <div key={idx} className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm text-center flex flex-col items-center justify-center">
                                <Landmark className="h-6 w-6 text-muted-foreground mb-2" />
                                <p className="text-sm text-muted-foreground">{kpi.indicator}</p>
                                <p className="text-3xl font-bold my-1">{kpi.value}{kpi.unit}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Implementation Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div style={{height: 300}}>
                            <Line data={timelineData} options={chartOptions} />
                        </div>
                    </CardContent>
                </Card>
				<Card>
                    <CardHeader>
                        <CardTitle>Village Distribution by State</CardTitle>
                    </CardHeader>
					<CardContent>
						<div style={{height: 300}}>
							<Bar data={analytics.coverageData} options={chartOptions} />
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
