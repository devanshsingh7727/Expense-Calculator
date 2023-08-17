import Link from 'next/link';

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// @mui material components
import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';
import ClearIcon from '@mui/icons-material/Clear';

import MDBox from '/components/MDBox';
import MDTypography from '/components/MDTypography';
import { IconButton } from '@mui/material';
import dayjs from 'dayjs';

function CategoriesList({ title, categories, handleClear }) {
  const renderItems = categories.map(
    ({ catIcon, catSelected, Note, Amount, id, SelectedDate }, key) => (
      <MDBox
        key={catSelected}
        component='li'
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        borderRadius='lg'
        py={1}
        pr={2}
        mb={categories.length - 1 === key ? 0 : 1}
      >
        <MDBox display='flex' alignItems='center'>
          <MDBox
            display='grid'
            alignItems='center'
            justifyContent='center'
            bgColor={'dark'}
            borderRadius='lg'
            shadow='md'
            color='white'
            width='2rem'
            height='2rem'
            mr={2}
            variant='gradient'
            fontSize='0.875rem'
          >
            <Icon
              sx={{
                display: 'grid',
                placeItems: 'center',
              }}
            >
              {catIcon}
            </Icon>
          </MDBox>
          <MDBox display='flex' flexDirection='column'>
            <MDTypography
              variant='button'
              color={'dark'}
              fontWeight='medium'
              gutterBottom
            >
              {catSelected}
            </MDTypography>
            <MDTypography variant='caption' color='text'>
              {Note}
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox display='flex'>
          <MDTypography
            sx={{
              display: 'grid',
              placeItems: 'center',
            }}
            variant='button'
            color={'white'}
            // sx={{
            //   lineHeight: 0,
            //   transition: 'all 0.2s cubic-bezier(.34,1.61,.7,1.3)',
            //   p: 0.5,

            //   '&:hover, &:focus': {
            //     transform: 'translateX(5px)',
            //   },
            // }}
          >
            {/* <Icon sx={{ fontWeight: 'bold' }}>chevron_right</Icon> */}
            {parseInt(Amount)?.toLocaleString('en-IN', {
              maximumFractionDigits: 2,
              style: 'currency',
              currency: 'INR',
            })}
          </MDTypography>
          <IconButton
            color='error'
            sx={{
              display: 'grid',
              placeItems: 'center',
            }}
            onClick={() => handleClear(id)}
          >
            <ClearIcon />
          </IconButton>

          {/* <MDTypography
            component={Link}
            variant='button'
            color={color}
            href={route ? route : ''}
            sx={{
              lineHeight: 0,
              transition: 'all 0.2s cubic-bezier(.34,1.61,.7,1.3)',
              p: 0.5,

              '&:hover, &:focus': {
                transform: 'translateX(5px)',
              },
            }}
            passHref
          >
            <Icon sx={{ fontWeight: 'bold' }}>chevron_right</Icon>
          </MDTypography> */}
        </MDBox>
      </MDBox>
    )
  );

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
        <MDBox component='ul' display='flex' flexDirection='column' p={0} m={0}>
          {renderItems}
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
