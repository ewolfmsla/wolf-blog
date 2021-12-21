import React, {useState} from "react";
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

  const [posts, setPosts] = useLocalStorageState('state-posts', [
    {id: 1, slug: 'vaccine-injuries', title: 'Vaccine Injuries', content: 'Heart failure, cancer, and infertility.'},
    {id: 2, slug: 'covid-mandates', title: 'Covid Mandates', content: 'Do not comply!'},
    {
      id: 3,
      slug: 'doctors-speaking-out',
      title: 'Doctors Speaking out',
      content: 'Dr Jed Zelenko speaks out. Nov 23, 2021'
    }
  ])

  const [message, setMessage] = useState(null)

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

  const deletePost = (postId) => {
    const index = posts.findIndex(p => p.id === postId) + 1
    if (window.confirm('Are you sure?')) {
      const updatedPosts = posts.slice(0, index - 1).concat(posts.slice(index))
      setPosts(updatedPosts)
      displayMessage('deleted')
    }
  }

  const updatePost = (post) => {
    console.log("updatePost start...")
    post.slug = getSlugFromTitle(post.title)
    const index = posts.findIndex(p => p.id === post.id)
    const oldPosts = posts.slice(0, index).concat(posts.slice(index + 1))
    const updatedPosts = [...oldPosts, post].sort((a, b) => a.id - b.id)
    setPosts(updatedPosts)
    console.log("updatePost end...")
    displayMessage('updated')
  }

  const addNewPost = (post) => {
    const id = 1
    const slug = getSlugFromTitle(post.title)
    const updatedPosts = posts.map((p) => p = {...p, id: p.id + 1})
    setPosts([{id: id, slug: slug, title: post.title, content: post.content}, ...updatedPosts])
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
                       {id: '', slug: '', title: '', content: ''}
                     } addNewPost={addNewPost}/> : <Redirect to={"/"}/>
                   }}/>
          </Switch>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
