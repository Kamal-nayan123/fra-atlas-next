"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	ArcElement,
	Tooltip,
	Legend,
	PointElement,
	LineElement,
	RadialLinearScale,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { FileText, BadgeCheck, Clock, Users, Download } from "lucide-react";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	ArcElement,
	Tooltip,
	Legend,
	PointElement,
	LineElement,
	RadialLinearScale
);

const metricCards = [
  { label: "Total Claims", value: "5,123,104", icon: FileText, color: "bg-blue-500" },
  { label: "Titles Distributed", value: "2,511,375", icon: BadgeCheck, color: "bg-green-500" },
  { label: "Pending Cases", value: "14.63%", icon: Clock, color: "bg-yellow-500" },
  { label: "Villages Mapped", value: "63.2%", icon: Users, color: "bg-indigo-500" },
];

const stateBarData = {
	labels: ["Madhya Pradesh", "Odisha", "Telangana", "Tripura"],
	datasets: [
		{
			label: "Claims Received",
			data: [627000, 720000, 655000, 128032],
			backgroundColor: "#1FB8CD",
		},
		{
			label: "Titles Distributed",
			data: [294000, 461013, 230735, 127931],
			backgroundColor: "#FFC185",
		},
	],
};

const stateBarOptions = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: { legend: { position: "top" as const } },
	scales: {
		y: {
			beginAtZero: true,
			ticks: {
				callback: function(value: number | string) {
					const v = typeof value === "string" ? parseFloat(value) : value;
					return `${Math.round((v as number) / 1000)}K`;
				},
			},
		},
	},
};

const claimsDoughnutData = {
	labels: ["Individual Claims", "Community Claims"],
	datasets: [
		{
			data: [4911495, 211609],
			backgroundColor: ["#1FB8CD", "#FFC185"],
			borderWidth: 2,
			borderColor: "#fff",
		},
	],
};

const claimsDoughnutOptions = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: { legend: { position: "bottom" as const } },
};

const dajguaSchemes = [
    { name: "PM-KISAN", description: "Direct income support to farmers", benefit: "Rs. 6000 per year" },
    { name: "Jal Jeevan Mission", description: "Piped water supply to every rural household", benefit: "Functional household tap connections" },
    { name: "MGNREGA", description: "Employment guarantee scheme", benefit: "100 days guaranteed employment" },
    { name: "PM Awas Yojana", description: "Housing for all rural households", benefit: "Rs. 1.2 lakh for plains, Rs. 1.3 lakh for hilly areas" },
    { name: "Ayushman Bharat", description: "Health insurance coverage", benefit: "Rs. 5 lakh annual coverage" }
];


export default function Home() {
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
						<option value="madhya_pradesh">Madhya Pradesh</option>
						<option value="odisha">Odisha</option>
						<option value="telangana">Telangana</option>
						<option value="tripura">Tripura</option>
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
							<CardDescription>Claims received vs titles distributed</CardDescription>
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
							<CardDescription>Individual vs Community claims</CardDescription>
						</CardHeader>
						<CardContent>
							<div style={{height: 400}}>
								<Doughnut data={claimsDoughnutData} options={claimsDoughnutOptions} />
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
                                <p className="text-sm font-medium mt-2"><strong>Benefit:</strong> {scheme.benefit}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
		</div>
	);
}
