"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { SatelliteDish } from "lucide-react";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const accuracyCards = [
    { label: "Agricultural Land Detection", value: "96.3%", color: "text-green-500" },
    { label: "Forest Cover Classification", value: "94.7%", color: "text-green-500" },
    { label: "Water Bodies Detection", value: "98.1%", color: "text-green-500" },
    { label: "Infrastructure Mapping", value: "91.5%", color: "text-yellow-500" },
];

const radarData = {
  labels: ['Agricultural Land', 'Forest Cover', 'Water Bodies', 'Infrastructure', 'Homesteads'],
  datasets: [
    {
      label: 'Detection Accuracy %',
      data: [96.3, 94.7, 98.1, 91.5, 93.2],
      backgroundColor: 'rgba(31, 184, 205, 0.2)',
      borderColor: '#1FB8CD',
      borderWidth: 2,
      pointBackgroundColor: '#1FB8CD',
    },
  ],
};

const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        r: {
            beginAtZero: true,
            max: 100,
            ticks: {
                stepSize: 20
            }
        }
    }
};

export default function AssetsPage() {
	return (
		<div className="container mx-auto px-4 py-6">
			<div className="mb-6">
				<h1 className="text-2xl font-bold">AI-Powered Asset Mapping</h1>
				<p className="text-muted-foreground">Satellite imagery analysis and land-use classification for FRA villages</p>
			</div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {accuracyCards.map((card, idx) => (
                    <Card key={idx}>
                        <CardContent className="p-4 text-center">
                            <h4 className={`text-3xl font-bold ${card.color}`}>{card.value}</h4>
                            <small className="text-muted-foreground">{card.label}</small>
                        </CardContent>
                    </Card>
                ))}
            </div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Satellite Image Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-muted rounded-md p-8 text-center flex flex-col items-center justify-center h-full">
                            <SatelliteDish className="h-16 w-16 text-muted-foreground mb-4" />
                            <p className="text-muted-foreground">Satellite Image Processing</p>
                        </div>
                    </CardContent>
                </Card>
				<Card>
                    <CardHeader>
                        <CardTitle>AI Classification Results</CardTitle>
                    </CardHeader>
					<CardContent>
						<div style={{height: 300}}>
							<Radar data={radarData} options={radarOptions} />
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
} 