import React, {useState} from "react";

import {collection, doc, setDoc} from "firebase/filestore";
import app from "./filestore"
import {getFirestore, getDocs} from "firebase/firestore"


const Test = () => {

  const db = getFirestore(app);
  const citiesRef = collection(db, "foo");

  const [foo, setFoo] = useState()

  async function getCities(db) {
    const citiesCol = collection(db, 'foo');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    setFoo(cityList)
  }

  return <div>Yes</div>

}

export default Test

