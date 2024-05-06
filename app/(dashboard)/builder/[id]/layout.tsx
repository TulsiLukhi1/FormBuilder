import React, { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return <div style={{ display: 'flex', width: '100%', flexGrow: 1, marginLeft: 'auto', marginRight: 'auto' }}>{children}</div>;
}

export default Layout;
