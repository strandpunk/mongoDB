import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import axios from "axios";
import { AuthContextProvider } from "./context/AuthContext";
import "./App.css";
import UsersList from "./components/UsersList";
import Chats from "./components/Chats";
import Friends from "./components/Friends";
import TemperamentTest from "./components/TemperamentTest";

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
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
