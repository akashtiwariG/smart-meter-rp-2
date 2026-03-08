"use cleint";
import React from 'react';


interface DataCardProps {
label: string;
value: string | number;
unit?: string;
}


const DataCard: React.FC<DataCardProps> = ({ label, value, unit }) => {
return (
<div className="bg-white rounded-2xl shadow p-4 hover:-translate-y-1 transition">
<h2 className="text-gray-500 text-sm font-medium">{label}</h2>
<p className="text-2xl font-semibold text-blue-600">
{value} {unit}
</p>
</div>
);
};


export default DataCard;
