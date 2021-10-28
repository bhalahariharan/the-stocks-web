import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import styled from '@emotion/styled';

import StocksEtfsTable from './StocksEtfsTable';

const StyledTitle = styled.div`
  margin: 16px 0;
  color: #333333;
  font-size: 20px;
  font-weight: 500;
`;

const TAB_URL_POSITION_MAP: { [key: string]: number } = {
  '/stocks': 0,
  '/etfs': 1,
};
const TABS = [
  {
    path: '/stocks',
    label: 'Stocks',
  },
  {
    path: '/etfs',
    label: 'ETFs',
  },
];

function Home() {
  const { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState(TAB_URL_POSITION_MAP[pathname] || 0);

  function handleTabChange(event: React.SyntheticEvent, newValue: number) {
    setActiveTab(newValue);
  }

  function getActiveTabComponent(value: number) {
    switch (value) {
      case 0:
        return (
          <>
            <StyledTitle>All Stocks</StyledTitle>
            <StocksEtfsTable equityType="STOCK" />
          </>
        );
      case 1:
        return (
          <>
            <StyledTitle>All ETFs</StyledTitle>
            <StocksEtfsTable equityType="ETF" />
          </>
        );
      default:
        return <p>Unknown Tab</p>;
    }
  }

  return (
    <Container maxWidth="lg">
      <Tabs value={activeTab} onChange={handleTabChange}>
        {TABS.map((tab, i) => (
          <Tab key={i} component={Link} to={tab.path} label={tab.label} />
        ))}
      </Tabs>
      <Divider />
      {getActiveTabComponent(activeTab)}
    </Container>
  );
}

export default Home;
