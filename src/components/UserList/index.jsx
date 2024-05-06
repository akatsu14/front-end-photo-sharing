import { List } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import "./styles.css";
import ItemUser from "./Item/ItemUser";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList(props) {
  const { setIsAdvance } = props;
  const [users, serUsers] = useState([]);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/users/${id}`);
  };

  const getData = () => {
    fetchModel("/user/list").then((data) => {
      serUsers(data);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <List component="nav">
        {users?.map((item, index) => (
          <ItemUser
            item={item}
            handleClick={handleClick}
            key={index}
            setIsAdvance={setIsAdvance}
          />
        ))}
      </List>
    </div>
  );
}

export default UserList;
