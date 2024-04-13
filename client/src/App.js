import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/home/Home";
import SignIn from "./components/authentication/SignIn";
import SignUp from "./components/authentication/SignUp";
import axios from "axios";
import { AuthContextProvider } from "./context/AuthContext";
import "./App.css";
import UsersList from "./components/friends/UsersList";
import Chats from "./components/chats/Chats";
import Friends from "./components/friends/Friends";
import TemperamentTest from "./components/temperamentTest/TemperamentTest";
import Friend from "./components/friend/Friend";
import Hobby from "./components/hobby/Hobby";

axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="friends" element={<Friends />} />
            <Route path="chats" element={<Chats />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="users" element={<UsersList />} />
            <Route path="test" element={<TemperamentTest />} />
            <Route path="hobby" element={<Hobby />} />
            <Route path="friend" element={<Friend />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
