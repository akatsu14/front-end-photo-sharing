import "./App.css";

import { Grid, Paper } from "@mui/material";
import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import UserComment from "./components/UserComment";

const App = (props) => {
  const [isAdvance, setIsAdvance] = useState(false);
  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar setIsAdvance={setIsAdvance} isAdvance={isAdvance} />
          </Grid>
          <div className="main-topbar-buffer" />
          <Grid item sm={3}>
            <Paper className="main-grid-item" minheight={"100vh"}>
              <UserList setIsAdvance={setIsAdvance} />
            </Paper>
          </Grid>
          <Grid item sm={9} minheight={"100vh"}>
            <Paper
              className={"main-grid-item"}
              style={{ marginBottom: "60px" }}
            >
              <Routes>
                <Route path="/users/:userId" element={<UserDetail />} />
                <Route
                  path="/photos/:userId"
                  element={<UserPhotos isAdvance={isAdvance} />}
                />
                <Route path="/users" element={<UserList />} />
                <Route
                  path="/commentOfUser/:userId"
                  element={
                    <UserComment
                      isAdvance={isAdvance}
                      setIsAdvance={setIsAdvance}
                    />
                  }
                />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;
