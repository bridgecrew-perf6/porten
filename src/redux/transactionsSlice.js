// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const transactionSlice = createSlice({
//   name: "transactions",
//   initialState: {
//     allTransactions: null,
//   },
//   reducers: {

//   },
//   extraReducers: (builder) => {
//     builder
//       // Вызывается прямо перед выполнением запроса
//       .addCase(fetchUserTransactionsById.pending, (state) => {
//       })
//       // Вызывается в том случае если запрос успешно выполнился
//       .addCase(fetchUserTransactionsById.fulfilled, (state, action) => {

//         state.allTransactions = action.payload
//       })
//       .addCase(addTransaction.fulfilled, (state, action) => {
//         const newTrans = action.payload;

//         if (newTrans.isSpend) {
//           state.allTransactions.push({
//             id: state.allTransactions.length,
//             category: newTrans.category,
//             date: newTrans.date,
//             description: newTrans.description,
//             amount: newTrans.amount,
//             isSpend: newTrans.isSpend
//           })
//         } else {
//           state.allTransactions.push({
//             id: state.allTransactions.length,
//             date: newTrans.date,
//             description: newTrans.description,
//             amount: newTrans.amount,
//             isSpend: newTrans.isSpend
//           })
//         }
//       })
//       // Вызывается в случае ошибки
//       .addCase(fetchUserTransactionsById.rejected, (state, action) => {
//         // state.loading = 'failed';
//         // state.error = action.error;
//       });
//   },
// });







// export const fetchUserTransactionsById = createAsyncThunk(
//   "users/fetchUserTransactionsById",
//   async(userId) => {
//     //axios
//     //return data

//     return [
//       {
//         id: 0,
//         category: "car",
//         date: new Date(2022, 3, 18, 11, 35).toLocaleString(),
//         description: "asdasdhf",
//         amount: 150,
//         isSpend: true,
//       },
//       {
//         id: 1,
//         date: new Date(2022, 3, 27, 19, 15).toLocaleString(),
//         description: "asdasdhf",
//         amount: 500,
//         isSpend: false,
//       },
//       {
//         id: 2,
//         category: "food",
//         date: new Date(2022, 3, 11, 10, 30).toLocaleString(),
//         description: "asdasdhf",
//         amount: 150,
//         isSpend: true,
//       },
//     ]
//   }
// );

// export const addTransaction = createAsyncThunk(
//   "users/addTransaction",
//   async(transaction) => {
//     //axios
//     //return data

//     return transaction
//   }
// );



// // export const {} = transactionSlice.actions;


// export default transactionSlice.reducer;