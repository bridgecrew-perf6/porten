import {
  signInWithEmailAndPassword,
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

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
  arrayRemove,
} from "firebase/firestore";

function me() {
return getAuth();
}
function db() {
  return getFirestore();
}

export const authAPI = {
  signIn(email, password) {
    return signInWithEmailAndPassword(me(), email, password)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  },


  logOut() {
    return signOut(me())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  },
};

export const initAPI = {
  getCategories() {
    const docRef = doc(db(), "initApp/defaultCategories");

    return getDoc(docRef).then((response) => {
      if (response.exists()) {
        return { ...response.data() };
      } else {
        return response.error;
      }
    });
  },

  setCategories(userId, categories) {
    let resultArray = [];

    for (let key in categories) {
      resultArray = [...resultArray, categories[key]];
    }

    return setDoc(doc(db(), `users/${userId}`), {
      transactions: arrayUnion(),
      categories: arrayUnion(...resultArray),
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  },
};

export const userActionsAPI = {

  updateUserName(newUserName) {
    updateProfile(me().currentUser, {
      displayName: newUserName,
    });
  },

  getAllTransactions(userId) {
    return getDoc(doc(db(), `users/${userId}`)).then((response) => {
      if (response.exists()) {
        const transactions = response.data().transactions;

        transactions.forEach((transaction) => {
          transaction.date = transaction.date.seconds;
        });

        return transactions;
      } else {
        return response.error;
      }
    });
  },

  getAllCategories(userId) {
    return getDoc(doc(db(), `users/${userId}`)).then((response) => {
      if (response.exists()) {
        const categories = response.data().categories;

        return categories;
      } else {
        return response.error;
      }
    });
  },

  addTransaction(transaction) {
    const userId = me().currentUser.uid;

    return updateDoc(doc(db(), `users/${userId}`), {
      transactions: arrayUnion(transaction),
    })
  },

  addNewCategory(category) {
    const userId = me().currentUser.uid;

    return updateDoc(doc(db(), `users/${userId}`), {
      categories: arrayUnion({ category, isMine: true, img: "" }),
    })
  },

  updateCategories(category) {
    const userId = me().currentUser.uid;
    let categoriesArray = [];
    const userDataRef = doc(db(), `users/${userId}`);

    return getDoc(userDataRef).then((data) => {
      if (data.exists()) {
        const categories = data.data().categories;
        categoriesArray = [...categories];

        updateDoc(userDataRef, {
          categories: categoriesArray.filter(
            (item) => item.category !== category
          ),
        })

        this.addNewCategory(category)
      }
    });
  },
};
