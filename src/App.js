import React, { useEffect, useState } from "react";
import './App.css';
import Header from "./components/Header";
import Posts from "./components/Posts";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Post from "./components/Post";
import './ignoreWarnings'
import Message from "./components/Message";
import { addPost, removePost, savePost, useAuth, fetchAndSetPosts } from "./firebase"
import useLocalStorageState from 'use-local-storage-state'
import VisitorLogin from "./components/VisitorLogin";
import 'bootstrap/dist/css/bootstrap.min.css';
import EditPost from "./components/EditPost";
import AddPost from "./components/AddPost";

const App = () => {
  const [posts, setPosts] = useState([])
  const [message, setMessage] = useState(null)
  const [visitor, setVisitor] = useLocalStorageState('state-visitor', undefined)
  const [loading, setLoading] = useState(true)
  const user = useAuth()

  useEffect(() => {
    fetchAndSetPosts(setPosts)
    setLoading(false)
  }, [])

  const displayMessage = (message) => {
    setMessage(message)
    setTimeout(() => setMessage(null), 1500)
  }

  const deletePost = (key) => {
    removePost(key).then(() => displayMessage('deleted'))
      .then(() => fetchAndSetPosts(setPosts))
      .catch(error => console.log({ error }))
  }

  const updatePost = (post) => {
    savePost(post).then(() => displayMessage('saved'))
      .then(() => fetchAndSetPosts(setPosts))
      .catch(error => console.log({ error }))
  }

  const addNewPost = (post) => {
    addPost(post)
      .then(() => fetchAndSetPosts(setPosts))
      .then(() => displayMessage("saved"))
      .catch(error => console.log({ error }))
  }

  return (
    <Router>
      <div className="App">
        <Header displayMessage={displayMessage} user={user} />
        {message && <Message type={message} />}
        <Switch>
          <Route exact path={"/visitorLogin"} render={() => <VisitorLogin setVisitor={setVisitor} />} />
          {/* <Route
            exact path={"/login"}
            render={() => user?.email ? <Redirect to={"/"} /> : <LoginModal />} /> */}
          <Route
            exact path={"/"}
            render={() => <Posts posts={posts} deletePost={deletePost} loading={loading} user={user} />} />
          <Route path={"/post/:key"}
            render={(props) => {
              return <Post postKey={props.match.params.key} posts={posts} visitor={visitor} setVisitor={setVisitor} />
            }} />
          <Route path={"/edit/:key"}
            render={(props) => {
              if (user?.email) {
                return <EditPost postKey={props.match.params.key} updatePost={updatePost} />
              } else {
                return <Redirect to={"/"} />
              }
            }} />
          <Route exact path={"/new"}
            render={() => {
              return user?.email ? <AddPost addPost={addNewPost} /> : <Redirect to={"/"} />
            }} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
