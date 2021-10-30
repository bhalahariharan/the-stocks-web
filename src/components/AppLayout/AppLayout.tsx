import React from 'react';
import AppBar from './AppBar';

function AppLayout({ children }: { children: React.ReactElement }) {
  return (
    <>
      <AppBar />
      {children}
    </>
  );
}
export default AppLayout;
