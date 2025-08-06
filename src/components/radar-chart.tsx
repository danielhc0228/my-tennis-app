"use client";
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from "recharts";

const data = [
    { subject: "Power", value: 85 },
    { subject: "Accuracy", value: 72 },
    { subject: "Speed", value: 66 },
    { subject: "Strategy", value: 90 },
    { subject: "Stamina", value: 78 },
];

export default function PlayerRadarChart() {
    return (
        <div className='w-full max-w-md mx-auto mt-8'>
            <h2 className='text-xl font-semibold text-center mb-4 text-slate-700'>
                Performance Overview
            </h2>
            <ResponsiveContainer width='100%' height={300}>
                <RadarChart cx='50%' cy='50%' outerRadius='80%' data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey='subject' />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                        name='Stats'
                        dataKey='value'
                        stroke='#6366F1'
                        fill='#6366F1'
                        fillOpacity={0.6}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
