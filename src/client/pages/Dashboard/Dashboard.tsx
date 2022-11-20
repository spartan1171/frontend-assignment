import React, { FC, useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import Map from '../../components/Map/Map';
import LineChart, { ChartData } from '../../components/LineChart/LineChart';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import ValueDisplay from '../../components/ValueDisplay/ValueDisplay';
import WsData from '../../api/WsData';
import Checkbox from '../../components/Checkbox/Checkbox';
import { getLngLatFromString } from '../../utils/utils';

const MAX_CHART_DATA = 20;
const MAX_SPEED = 150;

const StyledDashboardHeader = styled.div`
  padding: 6px 24px;
  background-color: #e9d293;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
`;

const StyledDashboardBody = styled.div`
  padding: 24px;
`;

const Dashboard: FC = () => {
  const [wsData, setWsData] = useState<WsData[]>([]);
  const [currentWsData, setCurrentWsData] = useState<WsData>();
  const [latestWsData, setLatestWsData] = useState<WsData>();
  const [initialCenter, setInitialCenter] =
    useState<google.maps.LatLngLiteral>();
  const [currentCoordinates, setCurrentCoordinates] =
    useState<google.maps.LatLngLiteral>();
  const [isRealtime, setIsRealtime] = useState<boolean>(true);

  const url = 'ws://localhost:3001';
  const connection = useRef<WebSocket>();

  useEffect(() => {
    connection.current = new WebSocket(url);

    connection.current.onopen = () => {
      console.log('WebSocket connection open');
    };

    connection.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    connection.current.onerror = (error) => {
      console.log(`WebSocket error: ${error.target}`);
    };

    connection.current.onmessage = (e) => {
      const data = JSON.parse(e.data) as WsData;

      setLatestWsData(data);
    };

    return () => {
      connection.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!initialCenter && latestWsData) {
      const latLng = getLngLatFromString(latestWsData.gps);

      setInitialCenter(latLng);
    }

    if (isRealtime && latestWsData) {
      setCurrentWsData(latestWsData);
      setCurrentCoordinates(getLngLatFromString(latestWsData.gps));
      setWsData([...wsData.slice(-(MAX_CHART_DATA - 1)), latestWsData]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestWsData, initialCenter]);

  const getDataSetFromWsData = function <T extends keyof WsData>(
    key: T,
    color: { r: number; g: number; b: number }
  ): ChartData {
    return {
      label: key,
      data:
        wsData[0] && typeof wsData[0][key] === 'number'
          ? wsData.map((data) => ({
              x: new Date(data.time * 1000).toLocaleString(),
              y: data[key] as number,
            }))
          : [{ x: '', y: 0 }],
      borderColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
      backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 0.5)`,
    };
  };

  return (
    <div>
      <StyledDashboardHeader>
        <h1>Dashboard</h1>
      </StyledDashboardHeader>
      <StyledDashboardBody>
        <GridContainer spacing={2}>
          <GridItem size={12}>
            <Checkbox
              label="Real time data"
              isChecked={isRealtime}
              onChange={() => setIsRealtime(!isRealtime)}
            />
          </GridItem>
          <GridItem size={4}>
            <Map
              center={initialCenter}
              currentCoordinates={currentCoordinates}
            />
          </GridItem>
          <GridContainer spacing={2} size={8}>
            <GridItem size={12}>
              <ProgressBar
                title="Current Speed"
                progress={currentWsData?.speed ?? 0}
                maxValue={MAX_SPEED}
                unitOfMeasure="km/h"
              />
            </GridItem>
            <GridItem size={12}>
              <ProgressBar
                title="State of Charge"
                progress={currentWsData?.soc ?? 0}
                maxValue={100}
              />
            </GridItem>
            <GridItem size={4}>
              <ValueDisplay
                title="Energy"
                value={`${currentWsData?.energy ?? 0} kw`}
              />
            </GridItem>
            <GridItem size={4}>
              <ValueDisplay
                title="Odometer"
                value={`${currentWsData?.odo ?? 0} km`}
              />
            </GridItem>
          </GridContainer>
          <GridItem size={12}>
            <LineChart
              title="Speed Profile"
              yAxisTitle="Speed"
              xAxisTitle="Time"
              data={getDataSetFromWsData('speed', { r: 53, g: 162, b: 235 })}
            />
          </GridItem>
          <GridItem size={12}>
            <LineChart
              title="State of Charge Profile"
              yAxisTitle="Soc"
              xAxisTitle="Time"
              data={getDataSetFromWsData('soc', { r: 235, g: 25, b: 53 })}
            />
          </GridItem>
        </GridContainer>
      </StyledDashboardBody>
    </div>
  );
};

export default Dashboard;
