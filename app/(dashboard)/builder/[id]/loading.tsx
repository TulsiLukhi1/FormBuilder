import React from "react";
import { ImSpinner2 } from "react-icons/im";

function Loading() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
      <ImSpinner2 style={{ animation: 'spin 2s linear infinite', height: '3rem', width: '3rem' }} />
    </div>
  );
}

export default Loading;
