"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { ArrowUp, Minus, ArrowDown } from 'lucide-react';
import { useTheme } from '@/components/ui/theme-provider';
import { villages } from '@/lib/data';
import { useMemo } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend);

const TrendIcon = ({ trend }: { trend: string }) => {
    if (trend === 'improving' || trend === 'rapid') return <ArrowUp className="h-4 w-4 text-green-500" />;
    if (trend === 'steady') return <Minus className="h-4 w-4 text-gray-500" />;
    return <ArrowDown className="h-4 w-4 text-red-500" />;
};

export default function AnalyticsPage() {
    const { theme } = useTheme();

    const kpiData = useMemo(() => {
        const totalClaims = villages.reduce((acc, v) => acc + v.ifr_pattas + v.cfr_pattas, 0);
        const titlesDistributed = villages.reduce((acc, v) => acc + v.ifr_pattas, 0);
        const distributionRate = (titlesDistributed / totalClaims) * 100;
        return [
            { indicator: "FRA Title Distribution Rate", target: 75, current: distributionRate.toFixed(2), trend: "improving" },
            { indicator: "Document Digitization Progress", target: 100, current: 23.4, trend: "steady" },
            { indicator: "Scheme Convergence Rate", target: 85, current: 34.7, trend: "improving" },
            { indicator: "Village Atlas Coverage", target: 100, current: ((villages.length / 200) * 100).toFixed(2), trend: "rapid" },
        ];
    }, []);

    const timelineData = {
        labels: ['2020', '2021', '2022', '2023', '2024'],
        datasets: [{
            label: 'Title Distribution Progress',
            data: [25.3, 32.1, 38.7, 44.2, 49.02],
            borderColor: '#1FB8CD',
            backgroundColor: 'rgba(31, 184, 205, 0.1)',
            fill: true,
            tension: 0.4
        }]
    };

    const coverageData = useMemo(() => {
        const states = [...new Set(villages.map(v => v.state))];
        const coverage = states.map(s => villages.filter(v => v.state === s).length);
        return {
            labels: states,
            datasets: [{
                label: 'Village Coverage',
                data: coverage,
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#8EA2C6', '#2E4A62']
            }]
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
                        {kpiData.map((kpi, idx) => (
                            <div key={idx} className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm text-center">
                                <p className="text-sm text-muted-foreground">{kpi.indicator}</p>
                                <p className="text-3xl font-bold my-2">{kpi.current}%</p>
                                <p className="text-xs text-muted-foreground">Target: {kpi.target}%</p>
                                <div className="flex items-center justify-center gap-1 mt-1">
                                    <TrendIcon trend={kpi.trend} />
                                    <span className="text-xs capitalize">{kpi.trend}</span>
                                </div>
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
                        <CardTitle>Village Coverage by State</CardTitle>
                    </CardHeader>
					<CardContent>
						<div style={{height: 300}}>
							<Bar data={coverageData} options={chartOptions} />
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
} 