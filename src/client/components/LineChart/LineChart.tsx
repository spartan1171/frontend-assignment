import React, { FC } from 'react';
import styled from '@emotion/styled';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export type ChartData = {
  label: string;
  data: {
    x: string;
    y: number;
  }[];
  borderColor?: string;
  backgroundColor?: string;
};

const StyledLine = styled(Line)`
  height: 450px;
`;

interface LineChartProps {
  title: string;
  yAxisTitle: string;
  xAxisTitle: string;
  data: ChartData;
}

const LineChart: FC<LineChartProps> = (props: LineChartProps) => {
  const { data, xAxisTitle, yAxisTitle } = props;
  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          maxRotation: 90,
          minRotation: 90,
        },
        title: {
          display: true,
          text: xAxisTitle,
        },
      },
      y: {
        title: {
          display: true,
          text: yAxisTitle,
        },
      },
    },
  };

  return <StyledLine data={{ datasets: [data] }} options={options} />;
};

export default LineChart;
