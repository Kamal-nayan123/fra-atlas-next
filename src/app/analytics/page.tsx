"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AnalyticsPage() {
	return (
		<div className="container mx-auto px-4 py-6">
			<div className="mb-3">
				<h1 className="h3 m-0">Analytics</h1>
				<p className="text-muted m-0 mt-2">Monitoring and insights for FRA implementation</p>
			</div>
			<Card>
				<CardHeader>
					<CardTitle className="fs-6">KPI & Coverage</CardTitle>
					<CardDescription>Timeline and coverage charts</CardDescription>
				</CardHeader>
				<CardContent>
					<div style={{height: "80vh"}}>
						<iframe src="/legacy-index.html#analytics" title="Analytics" style={{border: 0, width: "100%", height: "100%"}} />
					</div>
				</CardContent>
			</Card>
		</div>
	);
} 