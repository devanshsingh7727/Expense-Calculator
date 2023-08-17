import { Divider, Grid } from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MDBox from '../../components/MDBox';
import DefaultStatisticsCard from '../../examples/Cards/StatisticsCards/DefaultStatisticsCard';
import CategoriesList from '../../examples/Lists/CategoriesList/CustomToday';
import MDTypography from '/components/MDTypography';
function Today({ LastMonthSpend }) {
  const [Data, setData] = useState([]);
  const [TotalAmount, setTotalAmount] = useState();
  const [LastMonthData, setLastMonthData] = useState([]);
  function percentage(val1, val2) {
    return Math.ceil(((val1 - val2) / ((val1 + val2) / 2)) * 100);
  }
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let DataMain = localStorage.getItem('data');
      if (DataMain) {
        let FinalData = JSON.parse(DataMain).filter(
          (rep) =>
            dayjs(rep.SelectedDate).format('YYYY-MM-DD') ===
            dayjs(new Date()).format('YYYY-MM-DD')
        );
        let LastMonth = JSON.parse(DataMain).filter(
          (rep) =>
            dayjs(rep.SelectedDate).format('MM') ===
            dayjs(new Date()).subtract(1, 'month').format('MM')
        );
        setLastMonthData(LastMonth);
        setData(FinalData);
      }
    }
  }, []);
  const Spend = (val) => {
    console.log('vall', val);
    let initialValue = 0;
    return val.reduce(
      (accumulator, currentValue) =>
        accumulator + parseInt(currentValue.Amount),
      initialValue
    );
  };
  useEffect(() => {
    let initialValue = 0;
    setTotalAmount(
      Data.reduce(
        (accumulator, currentValue) =>
          accumulator + parseInt(currentValue.Amount),
        initialValue
      )
    );
  }, [Data]);
  const handleClear = (id) => {
    localStorage.setItem(
      'data',
      JSON.stringify(Data.filter((rep) => rep.id !== id))
    );
    setData(Data.filter((rep) => rep.id !== id));
    toast.success('Deleted!');
  };
  console.log(Spend(LastMonthData), TotalAmount);
  return (
    <MDBox py={3} px={3}>
      <ToastContainer position='bottom-right' theme='dark' />
      <Grid container spacing={3}>
        {
          <Grid item xs={12} sm={4}>
            {Spend(LastMonthData) === 0 || TotalAmount === 0 ? (
              <DefaultStatisticsCard
                title='spend today'
                count={`Rs${TotalAmount}`}
              />
            ) : (
              <DefaultStatisticsCard
                title='spend today'
                count={`${TotalAmount?.toLocaleString('en-IN', {
                  maximumFractionDigits: 2,
                  style: 'currency',
                  currency: 'INR',
                })}`}
                percentage={{
                  color: `${
                    Spend(LastMonthData) > TotalAmount ? 'error' : 'success'
                  }`,
                  value: `${Spend(LastMonthData) > TotalAmount ? '' : '+ '}${
                    percentage(TotalAmount, Spend(LastMonthData))
                      ? percentage(TotalAmount, Spend(LastMonthData))
                      : 0
                  }% `,
                  label: 'since last month',
                }}
              />
            )}
          </Grid>
        }

        <Grid item xs={12} sm={4} mb={8}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <MDTypography variant='h5' fontWeight='bold' color='text'>
              Today
            </MDTypography>
            <MDTypography variant='h5' fontWeight='regular' color='text'>
              {TotalAmount?.toLocaleString('en-IN', {
                maximumFractionDigits: 2,
                style: 'currency',
                currency: 'INR',
              })}
            </MDTypography>
          </div>
          <Divider />
          <CategoriesList
            title='Items'
            handleClear={handleClear}
            categories={Data ? Data : []}
          />
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Today;
