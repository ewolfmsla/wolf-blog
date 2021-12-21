import React, {useEffect, useState} from "react";
import './App.css';
import UserContext from "./context/UserContext";
import Header from "./components/Header";
import Posts from "./components/Posts";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Post from "./components/Post";
import NotFound from "./components/NotFound";
import PostForm from "./components/PostForm";
import './ignoreWarnings'
import Message from "./components/Message";
import Login from "./components/Login";
import firebase from "./firebase"
import useLocalStorageState from 'use-local-storage-state'

const App = () => {
  const [user, setUser] = useLocalStorageState('state-user', {})
  const [posts, setPosts] = useLocalStorageState('state-posts', [])
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const postsRef = firebase.database().ref("posts")
    postsRef.on("value", (snapshot) => {
        const posts = snapshot.val()
        const newStatePosts = []
        for (let post in posts) {
          console.log('post: ', post)
          newStatePosts.push({
            key: post,
            slug: posts[post].slug,
            title: posts[post].title,
            content: posts[post].content
          })
        }
        setPosts(newStatePosts)
      }
    )
  }, [setPosts])

  const displayMessage = (message) => {
    setMessage(message)
    setTimeout(() => setMessage(null), 1500)
  }

  const onLogin = (email, password) => {
    if (email && password) {
      firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => setUser({email: res.user.email, isAuthenticated: true}))
        .catch(err => console.log(`error: ${err.message}`))
    }
  }

  const onLogout = () => {
    if (user.isAuthenticated) {
      firebase.auth().signOut().then(() => setUser({email: '', isAuthenticated: false}))
        .catch(err => console.log({err}))
      displayMessage('logout')
    }
  }

  const getSlugFromTitle = (title) => {
    return encodeURIComponent(title.toLowerCase().split(" ")
      .filter(item => item !== "").join("-"))
  }

  const deletePost = (post) => {
    if (window.confirm('Are you sure?')) {
      const postRef = firebase.database().ref("posts/" + post.key)
      postRef.remove().then(() => displayMessage('deleted'))
        .catch(error => console.log({error}))
    }
  }

  const updatePost = (post) => {
    console.log("updatePost start...")
    const postRef = firebase.database().ref("posts/" + post.key)
    postRef.update({
      slug: getSlugFromTitle(post.title),
      title: post.title, content: post.content
    }).then(() => displayMessage('updated')).catch(error => console.log({error}))
    console.log("updatePost end...")
  }

  const addNewPost = (post) => {
    const postRef = firebase.database().ref("posts")
    post.slug = getSlugFromTitle(post.title)
    delete post.key
    postRef.push(post)
    displayMessage("saved")
  }

  return (
    <Router>
      <UserContext.Provider value={{user, onLogin, onLogout}}>
        <div className="App">
          <Header/>
          {message && <Message type={message}/>}
          <Switch>
            <Route
              exact path={"/login"}
              render={() => user.isAuthenticated ? <Redirect to={"/"}/> : <Login/>}/>
            <Route
              exact path={"/"}
              render={() => <Posts posts={posts} deletePost={deletePost}/>}/>
            <Route path={"/post/:slug"}
                   render={(props) => {
                     const post = posts.find(post => post.slug === props.match.params.slug)
                     if (post) {
                       return <Post post={post}/>
                     } else {
                       return <NotFound page={props.match.params.slug}/>
                     }
                   }}/>
            <Route path={"/edit/:slug"}
                   render={(props) => {
                     console.log("/edit/:slug")
                     const post = posts.find(post => post.slug === props.match.params.slug)
                     if (user.isAuthenticated && post) {
                       return <PostForm post={post} updatePost={updatePost}/>
                     } else {
                       return <Redirect to={"/"}/>
                     }
                   }}/>
            <Route exact path={"/new"}
                   render={() => {
                     return user.isAuthenticated ? <PostForm post={
                       {key: null, slug: '', title: '', content: ''}
                     } addNewPost={addNewPost}/> : <Redirect to={"/"}/>
                   }}/>
          </Switch>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
