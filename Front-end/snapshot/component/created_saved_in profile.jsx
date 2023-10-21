
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Card from './card';

export default function Usertab() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'white' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" centered style={{color:'black'}}>
            <Tab label="Created" value="1" />
            <Tab label="Saved" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">Nothing to show...yet! Pins you create will live here.</TabPanel>
        <TabPanel value="2"><Card/></TabPanel>
      </TabContext>
    </Box>
  );
}

