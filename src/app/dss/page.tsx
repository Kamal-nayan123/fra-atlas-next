"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DSSPage() {
	return (
		<div className="container mx-auto px-4 py-6">
			<div className="mb-3">
				<h1 className="h3 m-0">Decision Support</h1>
				<p className="text-muted m-0 mt-2">AI-powered recommendations and interventions</p>
			</div>
			<Card>
				<CardHeader>
					<CardTitle className="fs-6">Village Profile & Recommendations</CardTitle>
					<CardDescription>Select a village to view results</CardDescription>
				</CardHeader>
				<CardContent>
					<div style={{height: "80vh"}}>
						<iframe src="/legacy-index.html#dss" title="Decision Support" style={{border: 0, width: "100%", height: "100%"}} />
					</div>
				</CardContent>
			</Card>
		</div>
	);
} 