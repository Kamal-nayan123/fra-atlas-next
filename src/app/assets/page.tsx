"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AssetsPage() {
	return (
		<div className="container mx-auto px-4 py-6">
			<div className="mb-3">
				<h1 className="h3 m-0">AI Asset Mapping</h1>
				<p className="text-muted m-0 mt-2">Satellite imagery analysis and classification</p>
			</div>
			<Card>
				<CardHeader>
					<CardTitle className="fs-6">Classification</CardTitle>
					<CardDescription>Demo accuracy and charts</CardDescription>
				</CardHeader>
				<CardContent>
					<div style={{height: "80vh"}}>
						<iframe src="/legacy-index.html#assets" title="AI Asset Mapping" style={{border: 0, width: "100%", height: "100%"}} />
					</div>
				</CardContent>
			</Card>
		</div>
	);
} 