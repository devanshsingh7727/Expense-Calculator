import { Grid, TextField } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import MDBox from "../../components/MDBox";
import MDInput from "../../components/MDInput";
import CategoriesList from "../../examples/Lists/CategoriesList/Custom";
import MDButton from "../../components/MDButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SaveObjectToDb } from "../../lib/utils";
import { useSession } from "next-auth/react";

function Today({ mutate, Expenses }) {
  const [CatArray, setCatArray] = useState([]);
  const [FormValue, setFormValue] = useState({
    SelectedDate: dayjs(new Date()),
  });
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      Router.push("/Access");
    },
  });

  const catChange = (val, icon) => {
    setFormValue({ ...FormValue, catSelected: val, catIcon: icon });
  };

  useEffect(() => {
    setCatArray([
      {
        color: "dark",
        icon: "local_grocery_store ",
        name: "Grocery",
      },
      {
        color: "dark",
        icon: "local_gas_station_icon",
        name: "Petrol",
      },
      {
        color: "dark",
        icon: "account_balance_icon ",
        name: "Bills",
      },
      {
        color: "dark",
        icon: "bakery_dining_icon ",
        name: "Dining",
      },
      {
        color: "dark",
        icon: "school_icon",
        name: "Education",
      },
      {
        color: "dark",
        icon: "price_check_icon ",
        name: "Emi",
      },

      {
        color: "dark",
        icon: "devices_other_icon ",
        name: "Gadgets",
      },
      {
        color: "dark",
        icon: "home_mini_icon ",
        name: "Grooming",
      },
      {
        color: "dark",
        icon: "health_and_safety_icon ",
        name: "Health",
      },
      {
        color: "dark",
        icon: "house_icon",
        name: "Household",
      },
      {
        color: "dark",
        icon: "bedroom_parent_icon",
        name: "House Rent",
      },
      {
        color: "dark",
        icon: "point_of_sale_icon",
        name: "Investment",
      },
      {
        color: "dark",
        icon: "family_restroom_icon ",
        name: "kids",
      },
      {
        color: "dark",
        icon: "currency_yuan_icon ",
        name: "Leisure",
      },
      {
        color: "dark",
        icon: "business_icon",
        name: "Office",
      },
      {
        color: "dark",
        icon: "shopping_cart_icon",
        name: "Shopping",
      },
      {
        color: "dark",
        icon: "airport_shuttle_icon",
        name: "Travel",
      },
      {
        color: "dark",
        icon: "miscellaneous_services_icon",
        name: "Misc",
      },
    ]);
  }, []);
  const handleChangeValue = (name, value) => {
    setFormValue({ ...FormValue, [name]: value });
  };
  const handleChange = (newValue) => {
    setFormValue({ ...FormValue, SelectedDate: newValue });
  };
  const saveData = async () => {
    const { Amount, Note, SelectedDate, catSelected } = FormValue;
    if (Amount && Note && SelectedDate && catSelected) {
      let FinalValue = { id: "id" + new Date().getTime(), ...FormValue };
      // window.localStorage.setItem(
      //   "data",
      //   JSON.stringify([, ...totalData, FinalValue])
      // );

      await SaveObjectToDb({ ...FinalValue, userId: session?.user?._id });
      await mutate();

      setFormValue({
        SelectedDate: dayjs(new Date()),
        Amount: "",
        Note: "",
        catIcon: "",
        catSelected: "",
      });
      window.scrollTo(0, 0);
      toast.success("Expense added");
      return;
    }
    toast.error("Please Enter all value!");
  };
  return (
    <MDBox py={3} px={3}>
      <ToastContainer position="bottom-right" theme="dark" />

      <Grid container spacing={3} pb={5}>
        <Grid item xs={12} sm={4}>
          <MDInput
            variant="standard"
            name="Amount"
            fullWidth
            type="number"
            label="Amount"
            value={FormValue?.Amount}
            onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MDInput
            variant="standard"
            fullWidth
            name="Note"
            type="text"
            label="Add Note"
            value={FormValue?.Note}
            onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4} style={{ textAlign: "center" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              variant="standard"
              label="Date&Time picker"
              name="selectedDate"
              value={FormValue?.SelectedDate}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={4} style={{ textAlign: "center" }}>
          <CategoriesList
            catChange={catChange}
            catSelected={FormValue?.catSelected}
            title="Types"
            categories={CatArray}
          />
        </Grid>
        <Grid item xs={12} sm={4} style={{ textAlign: "center" }} mb={3}>
          <MDButton
            variant="gradient"
            color="dark"
            fullWidth
            onClick={saveData}
          >
            Save
          </MDButton>
          <MDButton
            style={{ margin: "20px 0" }}
            variant="gradient"
            color="dark"
            fullWidth
            onClick={() =>
              setFormValue({
                SelectedDate: dayjs(new Date()),
                Amount: "",
                Note: "",
                catIcon: "",
                catSelected: "",
              })
            }
          >
            Clear
          </MDButton>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Today;
