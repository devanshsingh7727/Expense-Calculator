import AddIcon from '@mui/icons-material/Add';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import TodayIcon from '@mui/icons-material/Today';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import Add from './Screens/Add';
import All from './Screens/All';
import Today from './Screens/Today';
function Landingpage() {
  const [BottomNavigationState, setBottomNavigationState] = useState('TODAY');
  console.log('devanh singh test', process.env.Test);
  console.log('devanh singh FINAL', process.env.FINAL);

  return (
    <>
      {BottomNavigationState === 'TODAY' && <Today />}

      {BottomNavigationState === 'ALL' && <All />}
      {BottomNavigationState === 'ADD' && <Add />}

      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={BottomNavigationState}
          onChange={(event, newValue) => {
            setBottomNavigationState(newValue);
          }}
        >
          <BottomNavigationAction
            label='TODAY'
            value='TODAY'
            icon={<TodayIcon />}
          />
          <BottomNavigationAction
            label='ALL'
            value='ALL'
            icon={<AllInboxIcon />}
          />
          <BottomNavigationAction label='ADD' value='ADD' icon={<AddIcon />} />
        </BottomNavigation>
      </Paper>
    </>
  );
}

export default Landingpage;
