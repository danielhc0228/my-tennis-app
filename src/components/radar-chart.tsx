"use client";
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from "recharts";

interface IStat {
    power: number;
    serve: number;
    accuracy: number;
    volley: number;
    agility: number;
}

export default function PlayerRadarChart({
    power,
    serve,
    agility,
    accuracy,
    volley,
}: IStat) {
    const data = [
        { subject: "PWR", value: power },
        { subject: "SRV", value: serve },
        { subject: "ACC", value: accuracy },
        { subject: "AGL", value: agility },
        { subject: "VLY", value: volley },
    ];
    return (
        <div className='w-full max-w-md mx-auto mt-8'>
            <h2 className='text-xl font-semibold text-center mb-4 text-slate-700'>
                Performance Overview
            </h2>
            <ResponsiveContainer width='100%' height={300}>
                <RadarChart cx='50%' cy='50%' outerRadius='80%' data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey='subject' />
                    <PolarRadiusAxis angle={30} domain={[0, 10]} />
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
