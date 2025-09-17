"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	ArcElement,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { FileText, BadgeCheck, Clock, Users, Download } from "lucide-react";
import { useTheme } from "@/components/ui/theme-provider";
import { villages, dajguaSchemes } from "@/lib/data";
import { useMemo } from "react";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	ArcElement,
	Tooltip,
	Legend
);

export default function Home() {
    const { theme } = useTheme();

    const stats = useMemo(() => {
        const totalClaims = villages.reduce((acc, v) => acc + v.ifr_pattas + v.cfr_pattas, 0);
        const titlesDistributed = villages.reduce((acc, v) => acc + v.ifr_pattas, 0);
        const pendingCases = villages.filter(v => v.type === 'pending').length;
        const villagesMapped = villages.length;
        return {
            totalClaims,
            titlesDistributed,
            pendingCases: ((pendingCases / villagesMapped) * 100).toFixed(2) + '%',
            villagesMapped,
        }
    }, []);

    const metricCards = [
      { label: "Total Claims", value: stats.totalClaims.toLocaleString(), icon: FileText, color: "bg-blue-500" },
      { label: "Titles Distributed", value: stats.titlesDistributed.toLocaleString(), icon: BadgeCheck, color: "bg-green-500" },
      { label: "Pending Cases", value: stats.pendingCases, icon: Clock, color: "bg-yellow-500" },
      { label: "Villages Mapped", value: stats.villagesMapped.toString(), icon: Users, color: "bg-indigo-500" },
    ];

    const stateBarData = useMemo(() => {
        const states = [...new Set(villages.map(v => v.state))];
        const claimsReceived = states.map(s => villages.filter(v => v.state === s).reduce((acc, v) => acc + v.ifr_pattas + v.cfr_pattas, 0));
        const titlesDistributed = states.map(s => villages.filter(v => v.state === s).reduce((acc, v) => acc + v.ifr_pattas, 0));
        return {
            labels: states,
            datasets: [
                {
                    label: "Claims Received",
                    data: claimsReceived,
                    backgroundColor: "#1FB8CD",
                },
                {
                    label: "Titles Distributed",
                    data: titlesDistributed,
                    backgroundColor: "#FFC185",
                },
            ],
        };
    }, []);

    const claimsDoughnutData = useMemo(() => {
        const individualClaims = villages.reduce((acc, v) => acc + v.ifr_pattas, 0);
        const communityClaims = villages.reduce((acc, v) => acc + v.cfr_pattas, 0);
        return {
            labels: ["Individual Claims", "Community Claims"],
            datasets: [
                {
                    data: [individualClaims, communityClaims],
                    backgroundColor: ["#1FB8CD", "#FFC185"],
                    borderWidth: 2,
                },
            ],
        };
    }, []);

    const stateBarOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "top" as const, labels: { color: theme === 'dark' ? 'white' : 'black' } } },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value: number | string) {
                        const v = typeof value === "string" ? parseFloat(value) : value;
                        return `${Math.round((v as number) / 1000)}K`;
                    },
                    color: theme === 'dark' ? 'white' : 'black',
                },
                grid: {
                    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                }
            },
            x: {
                ticks: {
                    color: theme === 'dark' ? 'white' : 'black',
                },
                grid: {
                    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                }
            }
        },
    };

    const claimsDoughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "bottom" as const, labels: { color: theme === 'dark' ? 'white' : 'black' } } },
    };

	return (
		<div className="container mx-auto px-4 py-6">
			<div className="flex justify-between items-center mb-6">
				<div>
					<h1 className="text-2xl font-bold">FRA Implementation Dashboard</h1>
					<p className="text-muted-foreground">AI-Powered Forest Rights Act Monitoring System</p>
				</div>
				<div className="flex gap-2">
					<select className="form-select bg-background border border-input rounded-md px-3 py-2">
						<option value="">All States</option>
						{[...new Set(villages.map(v => v.state))].map(s => <option key={s} value={s.toLowerCase().replace(" ", "_")}>{s}</option>)}
					</select>
					<button className="btn btn-primary inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md">
						<Download className="h-4 w-4" />
						Export Report
					</button>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
				{metricCards.map((metric, idx) => (
					<Card key={idx}>
						<CardContent className="p-4 flex items-center">
              <div className={`p-3 rounded-full text-white ${metric.color}`}>
                <metric.icon className="h-6 w-6" />
              </div>
							<div className="ml-4">
								<p className="text-sm text-muted-foreground">{metric.label}</p>
								<p className="text-2xl font-bold">{metric.value}</p>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
				<div className="lg:col-span-2">
					<Card>
						<CardHeader>
							<CardTitle>State-wise FRA Implementation Progress</CardTitle>
						</CardHeader>
						<CardContent>
							<div style={{height: 400}}>
								<Bar data={stateBarData} options={stateBarOptions} />
							</div>
						</CardContent>
					</Card>
				</div>
				<div>
					<Card>
						<CardHeader>
							<CardTitle>Claims Distribution</CardTitle>
						</CardHeader>
						<CardContent>
							<div style={{height: 400}}>
								<Doughnut data={{...claimsDoughnutData, datasets: claimsDoughnutData.datasets.map(ds => ({...ds, borderColor: theme === 'dark' ? '#0f172a' : '#fff'}))}} options={claimsDoughnutOptions} />
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {dajguaSchemes.map((scheme, idx) => (
                            <div key={idx} className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
                                <h3 className="font-semibold text-primary">{scheme.name}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{scheme.description}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
		</div>
	);
}
