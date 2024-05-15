import { List } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import LoadingComponent from "../../common/loading/LoadingComponent";
import fetchModel from "../../lib/fetchModelData";
import ItemUser from "./Item/ItemUser";

/**
 * Define UserList, a React component of Project 4.
 */
const UserList = (props) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/users/${id}`);
  };

  const getData = async () => {
    try {
      setLoading(true);
      const res = await fetchModel("/api/user/list");
      if (res?.success) setUsers(res?.data);
      setLoading(false);
    } catch (error) {
      console.log("🚀 ~ getData ~ error:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return loading ? (
    <LoadingComponent />
  ) : (
    <List component="nav">
      {users?.map((item, index) => (
        <ItemUser
          item={item}
          handleClick={handleClick}
          key={index}
          isLast={index === users?.length - 1}
        />
      ))}
    </List>
  );
};

export default UserList;
