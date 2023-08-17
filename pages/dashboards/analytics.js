import Router from 'next/router';
import React, { useEffect } from 'react';

function analytics() {
  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();
          Router.push('/Landingpage');
        }}
      >
        go
      </button>
    </div>
  );
}

export default analytics;
