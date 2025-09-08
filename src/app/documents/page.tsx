"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DocumentsPage() {
	return (
		<div className="container mx-auto px-4 py-6">
			<div className="mb-3">
				<h1 className="h3 m-0">Document AI</h1>
				<p className="text-muted m-0 mt-2">OCR and NER for FRA document digitization</p>
			</div>
			<Card>
				<CardHeader>
					<CardTitle className="fs-6">Processing & Extracted Information</CardTitle>
					<CardDescription>Upload FRA documents to extract fields</CardDescription>
				</CardHeader>
				<CardContent>
					<div style={{height: "80vh"}}>
						<iframe src="/legacy-index.html#documents" title="Document AI" style={{border: 0, width: "100%", height: "100%"}} />
					</div>
				</CardContent>
			</Card>
		</div>
	);
} 