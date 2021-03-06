import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
  },
  {
    name: 'Page B',
    uv: 3000,
  },
  {
    name: 'Page C',
    uv: 2000,
  },
  {
    name: 'Page D',
    uv: 2780,
  },
  {
    name: 'Page E',
    uv: 1890,
  },
  {
    name: 'Page F',
    uv: 2390,
  },
  {
    name: 'Page G',
    uv: 3490,
  },
];

export default class WeeklyTemperatureTrend extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  render() {
    return (
      <ResponsiveContainer width={'100%'} height={600}>
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 65,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis
            dataKey='weeklong'
            angle={-60}
            tickMargin={40}
            position='left'
          />
          <YAxis
            dataKey='avgtemperature'
            label={{
              value: 'Temperature',
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend verticalAlign='top' height={50} />
          <ReferenceLine y={2390} label='100.4' stroke='green' />
          <Line
            type='monotone'
            dataKey='uv'
            name='Weekly Temperature Trend'
            stroke='#8884d8'
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
