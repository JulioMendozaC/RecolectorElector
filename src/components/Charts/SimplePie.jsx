import { useState } from 'react';
import { PieChart, ResponsiveContainer, Pie, Tooltip, Legend, Cell } from 'recharts'




const SimplePie = ({ data }) => {




    const COLORS = ['#24c35b', '#3b82f1', '#e43b2b', '#5b24c3', '#ec5c0c', '#d500f9']

    return (
        <>
            {data ?
                <div style={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart >
                            <Tooltip />
                            <Legend />
                            <Pie
                                dataKey="value"
                                data={data}
                                innerRadius={0}
                                fill="#82ca9d"
                                labelLine={false}
                                label
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>

                    </ResponsiveContainer>
                </div>
                :
                null
            }
        </>
    )
}

export default SimplePie
