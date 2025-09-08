"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

const kpis = [
	{ label: "FRA Title Distribution Rate", value: 49.02, target: 75, trend: "improving" },
	{ label: "Document Digitization Progress", value: 23.4, target: 100, trend: "steady" },
	{ label: "Scheme Convergence Rate", value: 34.7, target: 85, trend: "improving" },
	{ label: "Village Atlas Coverage", value: 63.2, target: 100, trend: "rapid" },
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

export default function Home() {
	return (
		<div className="container mx-auto px-4 py-6">
			<div className="mb-6">
				<h1 className="h3 m-0">FRA Implementation Dashboard</h1>
				<p className="text-muted m-0 mt-2">AI-Powered Forest Rights Act Monitoring System</p>
			</div>

			<div className="row g-3 mb-4">
				{kpis.map((kpi, idx) => (
					<div className="col-12 col-md-6 col-lg-3" key={idx}>
						<Card>
							<CardHeader>
								<CardTitle className="fs-6">{kpi.label}</CardTitle>
								<CardDescription>Target: {kpi.target}%</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="d-flex align-items-center justify-content-between">
									<div className="display-6 fw-bold">{kpi.value}%</div>
									<Badge variant="secondary">{kpi.trend}</Badge>
								</div>
							</CardContent>
						</Card>
					</div>
				))}
			</div>

			<div className="row g-3">
				<div className="col-12 col-lg-8">
					<Card>
						<CardHeader>
							<CardTitle className="fs-6">State-wise FRA Implementation Progress</CardTitle>
							<CardDescription>Claims received vs titles distributed</CardDescription>
						</CardHeader>
						<CardContent>
							<div style={{height: 400}}>
								<Bar data={stateBarData} options={stateBarOptions} />
							</div>
						</CardContent>
					</Card>
				</div>
				<div className="col-12 col-lg-4">
					<Card>
						<CardHeader>
							<CardTitle className="fs-6">Claims Distribution</CardTitle>
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
		</div>
	);
}
