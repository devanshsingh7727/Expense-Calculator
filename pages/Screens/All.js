import { Divider, Grid } from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { date } from 'yup';
import MDBox from '../../components/MDBox';
import MDButton from '../../components/MDButton';
import DefaultStatisticsCard from '../../examples/Cards/StatisticsCards/DefaultStatisticsCard';
import VerticalBarChart from '../../examples/Charts/BarCharts/VerticalBarChart';
import AllCustomListWeek from '../../examples/Lists/CategoriesList/AllCustomListWeek';
import AllCustomListMonth from '../../examples/Lists/CategoriesList/AllCustomListMonth';
import AllCustomListYear from '../../examples/Lists/CategoriesList/AllCustomListYear';

function Today() {
  const [Data, setData] = useState([]);
  const [Weekdata, setWeekdata] = useState([]);
  const [MonthData, setMonthData] = useState([]);
  const [YearData, setYearData] = useState([]);
  const [controller, setcontroller] = useState('week');
  const [TotalAmount, setTotalAmount] = useState();
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
  const Spend = (val) => {
    let initialValue = 0;
    return val.reduce(
      (accumulator, currentValue) =>
        accumulator + parseInt(currentValue.Amount),
      initialValue
    );
  };
  const CalculateWeek = (data) => {
    let FilterArray = data.reduce((groups, item) => {
      const SelectedDate = dayjs(item.SelectedDate).day();
      // console.log();
      const group = groups[SelectedDate] || [];
      if (dayjs(new Date()).isSame(item.SelectedDate, 'week')) {
        group.push(item);
        groups[SelectedDate] = group;
      }
      return groups;
    }, {});
    let CustomArray = [];
    Object.entries(FilterArray).map((rep, i) => {
      CustomArray[parseInt(rep[0])] = Spend(rep[1]);
    });
    return CustomArray;
  };
  const CalculateMonth = (data) => {
    let FilterArray = data.reduce((groups, item) => {
      const SelectedDate = dayjs(item.SelectedDate).month();
      const group = groups[SelectedDate] || [];
      group.push(item);
      groups[SelectedDate] = group;
      return groups;
    }, {});
    let CustomArray = [];
    Object.entries(FilterArray).map((rep, i) => {
      CustomArray[parseInt(rep[0])] = Spend(rep[1]);
    });
    return CustomArray;
  };
  const CalculateYear = (data) => {
    let FilterArray = data.reduce((groups, item) => {
      const SelectedDate = dayjs(item.SelectedDate).year();
      const group = groups[SelectedDate] || [];
      group.push(item);
      groups[SelectedDate] = group;
      return groups;
    }, {});
    let CustomArray = [];
    console.log('FilterArray', FilterArray);
    Object.entries(FilterArray).map((rep, i) => {
      if (parseInt(rep[0]) === 2019) {
        CustomArray[0] = Spend(rep[1]);
      } else if (parseInt(rep[0]) === 2020) {
        CustomArray[1] = Spend(rep[1]);
      } else if (parseInt(rep[0]) === 2021) {
        CustomArray[2] = Spend(rep[1]);
      } else if (parseInt(rep[0]) === 2022) {
        CustomArray[3] = Spend(rep[1]);
      } else if (parseInt(rep[0]) === 2023) {
        CustomArray[4] = Spend(rep[1]);
      }
    });
    console.log('CustomArray', CustomArray);
    return CustomArray;
  };
  useEffect(() => {
    let DataMain = localStorage.getItem('data');
    if (DataMain) {
      setData(JSON.parse(DataMain));
      let WeekFilterData = JSON.parse(DataMain)
        .filter((rep) => dayjs(new Date()).isSame(rep.SelectedDate, 'week'))
        .reduce((groups, item) => {
          const group = groups[item.catSelected] || [];
          group.push(item);
          groups[item.catSelected] = group;
          return groups;
        }, {});
      setWeekdata(WeekFilterData);

      let MonthFilterData = JSON.parse(DataMain)
        .filter((rep) => dayjs(new Date()).isSame(rep.SelectedDate, 'month'))
        .reduce((groups, item) => {
          const group = groups[item.catSelected] || [];
          group.push(item);
          groups[item.catSelected] = group;
          return groups;
        }, {});
      setMonthData(MonthFilterData);

      let YearFilterData = JSON.parse(DataMain)
        .filter((rep) => dayjs(new Date()).isSame(rep.SelectedDate, 'year'))
        .reduce((groups, item) => {
          const group = groups[item.catSelected] || [];
          group.push(item);
          groups[item.catSelected] = group;
          return groups;
        }, {});
      console.log('YearFilterData', YearFilterData);
      setYearData(YearFilterData);
    }
  }, []);
  const buttonHandler = (e) => {
    setcontroller(e.target.name);

    // SelectedDate
  };
  return (
    <MDBox py={3} px={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <DefaultStatisticsCard
            title='Total spend'
            count={`${parseInt(TotalAmount)?.toLocaleString('en-IN', {
              maximumFractionDigits: 2,
              style: 'currency',
              currency: 'INR',
            })}`}
            // percentage={{
            //   color: 'success',
            //   value: '+55%',
            //   label: 'since last month',
            // }}
            // dropdown={{
            //   action: openSalesDropdown,
            //   menu: renderMenu(salesDropdown, closeSalesDropdown),
            //   value: salesDropdownValue,
            // }}
          />
        </Grid>
        <Grid item xs={12} sm={4} my={2}>
          {controller === 'week' ? (
            <VerticalBarChart
              icon={{ color: 'dark', component: 'leaderboard' }}
              title='Statistics'
              description='Spend related to week average'
              chart={{
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [
                  {
                    label: 'Spend this week',
                    color: 'light',
                    data: CalculateWeek(Data),
                  },
                ],
              }}
            />
          ) : controller === 'month' ? (
            <VerticalBarChart
              icon={{ color: 'dark', component: 'leaderboard' }}
              title='Statistics'
              // description='Sales related to age average'
              description='Spend related to Month average'
              chart={{
                labels: [
                  'Jan',
                  'Feb',
                  'Mar',
                  'Apr',
                  'May',
                  'Jun',
                  'Jul',
                  'Aug',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec',
                ],
                datasets: [
                  {
                    label: 'Spend this month',
                    color: 'light',
                    data: CalculateMonth(Data),
                  },
                ],
              }}
            />
          ) : (
            controller === 'year' && (
              <VerticalBarChart
                icon={{ color: 'dark', component: 'leaderboard' }}
                title='Statistics'
                description='Spend related to Year average'
                chart={{
                  labels: [2019, 2020, 2021, 2022, 2023],
                  datasets: [
                    {
                      label: 'Spend this year',
                      color: 'light',
                      data: CalculateYear(Data),
                    },
                  ],
                }}
              />
            )
          )}
        </Grid>
        <Grid item xs={12} sm={4} mb={8}>
          <MDButton
            variant='outlined'
            size='small'
            style={{ margin: '0px 10px' }}
            value={controller}
            name='week'
            onClick={buttonHandler}
          >
            Week
          </MDButton>
          <MDButton
            variant='outlined'
            size='small'
            style={{ margin: '0px 10px' }}
            value={controller}
            name='month'
            onClick={buttonHandler}
          >
            Month
          </MDButton>
          <MDButton
            variant='outlined'
            size='small'
            style={{ margin: '0px 10px' }}
            value={controller}
            name='year'
            onClick={buttonHandler}
          >
            Year
          </MDButton>
          <Divider />

          {controller === 'week' ? (
            <AllCustomListWeek title='Week' categories={Weekdata} />
          ) : controller === 'month' ? (
            <AllCustomListMonth title='Month' categories={MonthData} />
          ) : (
            controller === 'year' && (
              <AllCustomListYear title='Year' categories={YearData} />
            )
          )}
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Today;
