import Link from 'next/link';

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// @mui material components
import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';

import MDBox from '/components/MDBox';
import MDTypography from '/components/MDTypography';
import { Grid } from '@mui/material';
import { render } from 'react-dom/cjs/react-dom.production.min';

function CategoriesList({ title, categories, catSelected, catChange }) {
  const renderItems = categories.map(({ color, icon, name }, key) => (
    <Grid
      item
      xs={4}
      sm={4}
      onClick={() => catChange(name, icon)}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
      my={1}
    >
      <MDBox
        display='grid'
        alignItems='center'
        justifyContent='center'
        bgColor={catSelected === name ? 'success' : color}
        borderRadius='lg'
        shadow='md'
        color='white'
        width='2rem'
        height='2rem'
        variant='gradient'
        fontSize='0.875rem'
      >
        <Icon
          sx={{
            display: 'grid',
            placeItems: 'center',
          }}
        >
          {icon}
        </Icon>
      </MDBox>
      <MDTypography
        my={1}
        style={{ fontSize: '8px' }}
        fontWeight='regular'
        color='text'
      >
        {name}
      </MDTypography>
    </Grid>
  ));

  return (
    <Card>
      <MDBox pt={2} px={2}>
        <MDTypography
          variant='h6'
          fontWeight='medium'
          textTransform='capitalize'
          color='text'
        >
          {title}
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <MDBox>
          <Grid container>{renderItems}</Grid>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Typechecking props for the CategoriesList
CategoriesList.propTypes = {
  title: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CategoriesList;
