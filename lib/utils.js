import connection from "./Connection";
export const SaveObjectToDb = async (data) => {
  try {
    const response = await connection.post("/Expense", data);
    return response.data;
  } catch (err) {
    if (err.response) {
      console.error(
        "Server responded with an error:",
        err.response.status,
        err.response.data
      );
    } else if (err.request) {
      console.error("No response received:", err.request);
    } else {
      console.error("Error setting up the request:", err.message);
    }
    throw err;
  }
};
export const deleteExpenseObject = async (data) => {
  try {
    const response = await connection.put("/Expense", data);
    return response.data;
  } catch (err) {
    if (err.response) {
      console.error(
        "Server responded with an error:",
        err.response.status,
        err.response.data
      );
    } else if (err.request) {
      console.error("No response received:", err.request);
    } else {
      console.error("Error setting up the request:", err.message);
    }
    throw err;
  }
};
