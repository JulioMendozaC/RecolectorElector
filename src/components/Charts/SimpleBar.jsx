import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";


const SimpleBar = ({ data, label1, label2, color }) => {

  const renderCustomizedLabel = (props) => {
    const { x, y, width, height, value } = props;
    const radius = 10;
  
    return (
      <g>
       
        <text x={x + width / 2} y={y - radius} fill="#fff" textAnchor="middle" dominantBaseline="middle">
          {value.split('-')[1]}
        </text>
      </g>
    );
  };

  
  return (
    <>
      {
        data ?
          <BarChart
            width={1500}
            height={300}
            data={data}
            label
            margin={{
              top: 20,
              right: 20,
              left: 20,
              bottom: 5
            }
            }
          >
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            {
              label1 ?
                <Bar dataKey={label1} fill={color} >
                  <LabelList dataKey="name" content={renderCustomizedLabel} />
                </Bar>
                :
                label2 ?
                  <Bar dataKey={label2} fill="#8884d8" />
                  :
                  null
            }

          </BarChart >
          :
          null
      }
    </>
  );
}

export default SimpleBar