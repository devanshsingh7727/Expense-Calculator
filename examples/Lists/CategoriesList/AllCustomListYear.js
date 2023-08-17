import Link from 'next/link';

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// @mui material components
import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';
import ClearIcon from '@mui/icons-material/Clear';

import MDBox from '/components/MDBox';
import MDTypography from '/components/MDTypography';
import { Collapse, IconButton } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';

function CategoriesList({ title, categories, handleClear }) {
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
          {Object?.entries(categories)?.map((rep, i) => {
            const [open, setopen] = useState(false);

            return (
              <>
                <MDBox
                  key={i}
                  component='li'
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                  borderRadius='lg'
                  //   py={1}
                  //   pr={2}
                  //   mb={categories.length - 1 === i ? 0 : 1}
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
                        {rep?.[1]?.[0]?.['catIcon']}
                      </Icon>
                    </MDBox>
                    <MDBox display='flex' flexDirection='column'>
                      <MDTypography
                        variant='button'
                        color={'dark'}
                        fontWeight='medium'
                        gutterBottom
                      >
                        {rep?.[0]}
                      </MDTypography>
                      <MDTypography variant='caption' color='text'>
                        {rep?.[1]?.length} entries
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                  <MDTypography
                    variant='button'
                    color={'text'}
                    onClick={() => setopen(!open)}
                    // sx={{
                    //   lineHeight: 0,
                    //   transition: 'all 0.2s cubic-bezier(.34,1.61,.7,1.3)',
                    //   p: 0.5,

                    //   '&:hover, &:focus': {
                    //     transform: 'translateX(5px)',
                    //   },
                    // }}
                  >
                    <Icon sx={{ fontWeight: 'bold' }}>
                      {open ? 'expand_less_icon' : 'expand_more_icon'}
                    </Icon>
                  </MDTypography>
                </MDBox>
                <Collapse in={open} timeout='auto' unmountOnExit>
                  {rep?.[1].map((kk, id) => (
                    <MDBox
                      component='li'
                      display='flex'
                      justifyContent='space-between'
                      alignItems='center'
                      borderRadius='lg'
                      pl={5}
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
                            {kk?.catIcon}
                          </Icon>
                        </MDBox>
                        <MDBox display='flex' flexDirection='column'>
                          <MDTypography variant='caption' color='text'>
                            {kk?.Note}
                          </MDTypography>
                          <MDTypography
                            variant='button'
                            color={'dark'}
                            fontWeight='small'
                            gutterBottom
                          >
                            {kk?.catSelected}
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
                        >
                          {parseInt(kk.Amount)?.toLocaleString('en-IN', {
                            maximumFractionDigits: 2,
                            style: 'currency',
                            currency: 'INR',
                          })}
                        </MDTypography>
                      </MDBox>
                    </MDBox>
                  ))}
                </Collapse>
              </>
            );
          })}
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
