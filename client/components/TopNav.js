import { useState, useEffect, useContext } from "react";
import React from "react";
import Link from "next/link";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  CoffeeOutlined,
  LoginOutlined,
  LogoutOutlined,
  CarryOutOutlined,
  TeamOutlined,
  UserAddOutlined
} from "@ant-design/icons";
import { Context } from "../context";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const { Item, SubMenu, ItemGroup } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState("");
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  const router = useRouter();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast.success(data.message);
    router.push("/login");
  };

  return (
    <Menu mode="horizontal" selectedKeys={[current]} className="d-block">
      <Item
        key="/"
        onClick={e => setCurrent(e.key)}
        icon={<AppstoreOutlined />}
      >
        <Link href="/">
          <a>App</a>
        </Link>
      </Item>
      {user && user.role && user.role.includes("Instructor") ? (
        <Item
          key="/instructor/course/create"
          onClick={e => setCurrent(e.key)}
          icon={<CarryOutOutlined />}
        >
          <Link href="/instructor/course/create">
            <a>Create Course</a>
          </Link>
        </Item>
      ) : (
        <Item
          key="/user/become-instructor"
          onClick={e => setCurrent(e.key)}
          icon={<TeamOutlined />}
        >
          <Link href="/user/become-instructor">
            <a>Become Instructor</a>
          </Link>
        </Item>
      )}
      {user === null && (
        <>
          <Item
            key="/login"
            onClick={e => setCurrent(e.key)}
            icon={<LoginOutlined />}
          >
            <Link href="/login">
              <a>Login</a>
            </Link>
          </Item>
          <Item
            key="/register"
            onClick={e => setCurrent(e.key)}
            icon={<UserAddOutlined />}
          >
            <Link href="/register">
              <a>Register</a>
            </Link>
          </Item>{" "}
        </>
      )}

      {user !== null && (
        <SubMenu
          icon={<CoffeeOutlined />}
          title={user?.name}
          className="float-end"
          key="user-dropdown"
        >
          <ItemGroup>
            <Item key="/user">
              <Link href="/user">
                <a>Dashboard</a>
              </Link>
            </Item>
            <Item key="/logout" onClick={logout}>
              Logout
            </Item>
          </ItemGroup>
        </SubMenu>
      )}
    </Menu>
  );
};

export default TopNav;
