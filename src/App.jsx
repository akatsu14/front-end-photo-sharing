import "./App.css";

import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// import { Login } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./common/functions";
import Auth from "./components/Auth";
import ProtectedRoot from "./components/Auth/ProtectedRoute";
import Chat from "./components/Chat";
import DashBoard from "./components/DashBroad";
import InitialPage from "./components/DashBroad/Item/IntialPage";
import UserComment from "./components/UserComment";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import BookmarkPhotos from "./components/UserPhotos/Item/BookmarkPhotos";
import FavoritePhotos from "./components/UserPhotos/Item/FavoritePhotos";
const App = (props) => {
  const dispatch = useDispatch();
  const { language } = useSelector((state) => state.language);

  useEffect(() => {
    loadUser(dispatch);
  }, []);
  return (
    <Box bgcolor={"#E4E6EB"}>
      <Router>
        <Routes>
          <Route path="/" element={<DashBoard isHaveUserList={true}/>}>
            <Route
              index
              path="/"
              element={
                <ProtectedRoot>
                  <InitialPage />
                </ProtectedRoot>
              }
            />
            <Route
              index
              path="/users/:userId"
              element={
                <ProtectedRoot>
                  <UserDetail />
                </ProtectedRoot>
              }
            />
            <Route
              index
              path="/photos/:userId"
              element={
                <ProtectedRoot>
                  <UserPhotos />
                </ProtectedRoot>
              }
            />
            <Route
              index
              path="/users"
              element={
                <ProtectedRoot>
                  <UserList />
                </ProtectedRoot>
              }
            />
            <Route
              index
              path="/commentOfUser/:userId"
              element={
                <ProtectedRoot>
                  <UserComment />
                </ProtectedRoot>
              }
            />
          </Route>
          <Route path="/login" element={<Auth authRoute="login" />} />
          <Route path="/register" element={<Auth authRoute="register" />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/me" element={<DashBoard />}>
            <Route
              index
              path="/me/favorite"
              element={
                <ProtectedRoot>
                  <FavoritePhotos />
                </ProtectedRoot>
              }
            />
            <Route
              index
              path="/me/bookmark"
              element={
                <ProtectedRoot>
                  <BookmarkPhotos />
                </ProtectedRoot>
              }
            />
          </Route>
        </Routes>
      </Router>
    </Box>
  );
};

export default App;
