import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  doc,
  serverTimestamp,
  getDocs,
  getDoc,
  updateDoc,
  arrayUnion, 
  arrayRemove
} from "firebase/firestore";

const allCategoriesSlice = createSlice({
  name: "categories",
  initialState: {
    allCategories: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // builder
      // .addCase(fetchAllCategoriesById.fulfilled, (state, action) => {
      //   // state.allCategories = action.payload.categories
      // })
      // .addCase(getDefaultCategories.fulfilled, (state, action) => {
      //   state.allCategories = action.payload.data;
      // })
      // .addCase(addNewCategory.fulfilled, (state, action) => {
      //   state.allCategories.push({
      //     category: action.payload,
      //     id: state.allCategories.length,
      //     img: null,
      //     isMine: true,
      //   });
      // })
      // .addCase(updateCategories.fulfilled, (state, action) => {
      //   let isOur = state.allCategories.some(
      //     (item) => item.category === action.payload && item.isMine
      //   );

      //   if (!isOur) {
      //     state.allCategories = state.allCategories.map((item) =>
      //       item.category === action.payload ? { ...item, isMine: true } : item
      //     );
      //   }
      // });
  },
});



// export const fetchAllCategoriesById = createAsyncThunk(
//   "fetchAllCategoriesById",
//   async (userId) => {
//     const db = getFirestore();

//     const response = await getDoc(doc(db, `users/${userId}`))

//     if(response.exists()) {
//       return {...response.data()}
//     } else {
//       return response.error
//     }


//     // return [
//     //   {
//     //     category: "food",
//     //     id: 0,
//     //     img: null,
//     //     isMine: true,
//     //   },
//     //   {
//     //     category: "car",
//     //     id: 1,
//     //     img: null,
//     //     isMine: true,
//     //   },
//     //   {
//     //     category: "pets",
//     //     id: 2,
//     //     img: null,
//     //     isMine: false,
//     //   },
//     //   {
//     //     category: "network",
//     //     id: 3,
//     //     img: null,
//     //     isMine: false,
//     //   },
//     //   {
//     //     category: "party",
//     //     id: 4,
//     //     img: null,
//     //     isMine: false,
//     //   },
//     // ];
//   }
// );

// export const setAllCategories = createAsyncThunk(
//   "setAllCategories",
//   async ({userId, categories}) => {
//     const db = getFirestore();
//     let resultArray = [];

//     for(let key in categories) {
//       resultArray = [...resultArray, categories[key]]
//     }

//     const response = await setDoc(doc(db, `users/${userId}`), {
//       transactions: arrayUnion(),
//       categories: arrayUnion(...resultArray)
//     })

//     // const response = await updateDoc(doc(db, `users/${userId}`), {
//     //   categories: arrayUnion(...resultArray)
//     // })
    


//   }
// );

// export const getDefaultCategories = createAsyncThunk(
//   "getDefaultCategories",
//   async (userId) => {
//     const db = getFirestore()
//     const docRef = doc(db, "initApp/defaultCategories")


//     const response = await getDoc(docRef);
//     if (response.exists()) {

//       return {...response.data()}
//     } else {
//       debugger
//       return response.error
//     }
    
//     // .then((snap) => {
//     //   snap.docs.forEach((category) => {
//     //     defaultCategories.push({ ...category.data() });
//     //   });
//     //   console.log(defaultCategories);
//     // })
//     // .catch((err) => {
//     //   console.log(err);
//     // });
//   }
// );

export const updateCategories = createAsyncThunk(
  "updateCategories",
  async (userId, data) => {}
);

export const addNewCategory = createAsyncThunk(
  "addNewCategory",
  async (newCategory) => {
    //axios

    return newCategory;
  }
);

export default allCategoriesSlice.reducer;