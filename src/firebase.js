import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { getFirestore } from 'firebase/firestore';
import { child, get, getDatabase, ref, remove, set } from 'firebase/database'
import { v4 as uuidV4 } from 'uuid';
import { postSnapshotToPost, postsSnapshotToArray } from "./utils/snapshot";
import { useEffect, useState } from "react";

const {
  REACT_APP_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_DATABASE_URL,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_MESSAGING_SENDER_ID,
  REACT_APP_APP_ID,
  REACT_APP_MEASUREMENT_ID,
  REACT_APP_ADMINS

} = process.env

const config = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  databaseURL: REACT_APP_DATABASE_URL,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
  appId: REACT_APP_APP_ID,
  measurementId: REACT_APP_MEASUREMENT_ID
}

const app = initializeApp(config)
const db = getFirestore(app);
const auth = getAuth(app)
const database = getDatabase()

const isAdmin = (user) => {
  return user?.uid &&
    REACT_APP_ADMINS.split(',')
      .filter(uid => uid.trim() === user?.uid)
      .length > 0 ? true : false

}

const isAuthenticated = (user) => {
  return user && user?.email ? true : false
}

// custom hook
const useAuth = () => {
  const [user, setUser] = useState({ isAuthenticated: false })

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser({ ...user, isAuthenticated: isAuthenticated(user), isAdmin: isAdmin(user) })
    })
    return unsub
  }, [])

  return user
}

const login = (username, password) => {
  return signInWithEmailAndPassword(auth, username, password)
}

const logout = () => {
  return signOut(auth)
}

const fetchPosts = () => {
  const fetch = async () => {
    const dbRef = ref(database);
    const postsSnapshot = await get(child(dbRef, "posts"))
    return postsSnapshotToArray(postsSnapshot)
  }
  return fetch()
}

const fetchPost = (key) => {
  const fetch = async (key) => {
    const dbRef = ref(database)
    const postSnapshot = await get(child(dbRef, "posts/" + key))
    if (postSnapshot) {
      return postSnapshotToPost(postSnapshot)
    }
    return undefined
  }
  return fetch(key)
}

const addPost = (post) => {
  const postKey = uuidV4()
  post.createdOn = Date.now()
  post.key = postKey
  return set(ref(database, 'posts/' + postKey), post)
}

const savePost = (post) => {
  return set(ref(database, 'posts/' + post.key), post)
}


const removePost = (key) => {
  const dbRef = ref(database, "posts/" + key)
  return remove(dbRef)
}

export { database, auth, app, db, fetchPost, fetchPosts, addPost, savePost, login, logout, removePost, useAuth }





