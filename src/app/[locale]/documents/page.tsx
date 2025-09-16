"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UploadCloud, FileSearch, Loader2 } from "lucide-react";

const ocrStats = [
    { label: "English OCR Accuracy", value: "97.8%", color: "text-green-500" },
    { label: "Hindi OCR Accuracy", value: "94.2%", color: "text-green-500" },
    { label: "Digitization Progress", value: "23.4%", color: "text-blue-500" },
];

const supportedTypes = ["FRA Applications", "Title Deeds", "Revenue Records", "Survey Records", "CFR Management Plans", "Rejection Orders"];

const simulatedExtractedData = `
    <div class="space-y-4">
        <div>
            <h6 class="font-semibold">Document: FRA_Application_001.pdf</h6>
            <div class="text-sm space-y-1 mt-1">
                <div class="flex justify-between"><span class="text-muted-foreground">Village Name:</span><span>Jhirkapur <span class="text-xs text-muted-foreground/70">(97.3%)</span></span></div>
                <div class="flex justify-between"><span class="text-muted-foreground">Applicant Name:</span><span>Ram Kumar Gond <span class="text-xs text-muted-foreground/70">(95.8%)</span></span></div>
                <div class="flex justify-between"><span class="text-muted-foreground">Land Area:</span><span>2.34 hectares <span class="text-xs text-muted-foreground/70">(92.1%)</span></span></div>
            </div>
        </div>
        <div>
            <h6 class="font-semibold">Document: Revenue_Record_002.jpg</h6>
            <div class="text-sm space-y-1 mt-1">
                <div class="flex justify-between"><span class="text-muted-foreground">Survey Number:</span><span>234/1A <span class="text-xs text-muted-foreground/70">(89.2%)</span></span></div>
                <div class="flex justify-between"><span class="text-muted-foreground">Village:</span><span>Jhirkapur <span class="text-xs text-muted-foreground/70">(94.6%)</span></span></div>
            </div>
        </div>
    </div>
`;

export default function DocumentsPage() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [extractedData, setExtractedData] = useState("");

    const handleFileUpload = () => {
        setIsProcessing(true);
        setExtractedData("");
        setTimeout(() => {
            setExtractedData(simulatedExtractedData);
            setIsProcessing(false);
        }, 2000);
    };

	return (
		<div className="container mx-auto px-4 py-6">
			<div className="mb-6">
				<h1 className="text-2xl font-bold">AI Document Processing</h1>
				<p className="text-muted-foreground">OCR and NER for FRA document digitization</p>
			</div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {ocrStats.map((stat, idx) => (
                    <Card key={idx}>
                        <CardContent className="p-4 text-center">
                            <h4 className={`text-3xl font-bold ${stat.color}`}>{stat.value}</h4>
                            <small className="text-muted-foreground">{stat.label}</small>
                        </CardContent>
                    </Card>
                ))}
            </div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Document Upload & Processing</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-8 text-center bg-muted/20">
                            <UploadCloud className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <p className="mb-2 font-semibold">Drop FRA documents here or click to upload</p>
                            <p className="text-xs text-muted-foreground mb-4">Supports PDF, JPG, PNG formats</p>
                            <Button onClick={handleFileUpload} disabled={isProcessing}>
                                {isProcessing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <UploadCloud className="h-4 w-4 mr-2" />}
                                Upload Documents
                            </Button>
                        </div>
                        <div className="mt-4">
                            <h3 className="font-semibold mb-2">Supported Document Types:</h3>
                            <div className="flex flex-wrap gap-2">
                                {supportedTypes.map(type => <Badge key={type} variant="secondary">{type}</Badge>)}
                            </div>
                        </div>
                    </CardContent>
                </Card>
				<Card>
                    <CardHeader>
                        <CardTitle>Extracted Information</CardTitle>
                    </CardHeader>
					<CardContent>
                        {isProcessing ? (
                            <div className="text-center text-muted-foreground py-12">
                                <Loader2 className="h-8 w-8 mx-auto animate-spin mb-2" />
                                <p>Processing documents...</p>
                            </div>
                        ) : extractedData ? (
                            <div dangerouslySetInnerHTML={{ __html: extractedData }} />
                        ) : (
                            <div className="text-center text-muted-foreground py-12">
                                <FileSearch className="h-8 w-8 mx-auto mb-2" />
                                <p>Upload a document to see AI extraction results</p>
                            </div>
                        )}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
