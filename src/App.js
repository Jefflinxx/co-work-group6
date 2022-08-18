import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { Reset } from "styled-reset";
import { io } from "socket.io-client";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Notification from "./components/Notification";
import CartContext from "./contexts/CartContext";
import PingFangTCRegular from "./fonts/PingFang-TC-Regular-2.otf";
import PingFangTCThin from "./fonts/PingFang-TC-Thin-2.otf";
import NotoSansTCRegular from "./fonts/NotoSansTC-Regular.otf";
import NotoSansTCBold from "./fonts/NotoSansTC-Bold.otf";

import styled from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: PingFangTC;
    src: url(${PingFangTCRegular}) format('opentype');
    font-weight: normal;
  }

  @font-face {
    font-family: PingFangTC;
    src: url(${PingFangTCThin}) format('opentype');
    font-weight: 100;
  }

  @font-face {
    font-family: NotoSansTC;
    src: url(${NotoSansTCRegular}) format('opentype');
    font-weight: normal;
  }

  @font-face {
    font-family: NotoSansTC;
    src: url(${NotoSansTCBold}) format('opentype');
    font-weight: bold;
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-family: NotoSansTC;
  }

  #root {
    min-height: 100vh;
    padding: 140px 0 115px;
    position: relative;

    @media screen and (max-width: 1279px) {
      padding: 102px 0 208px;
    }
  }
`;

function App() {
  const [cartItems, setCartItems] = useState(
    JSON.parse(window.localStorage.getItem("cartItems")) || []
  );
  const [socketLike, setSocketLike] = useState([]);
  const [render, setRender] = useState(0);
  const socket = useRef(null);

  function getItems() {
    return cartItems;
  }

  function addItem(item) {
    const newCartItems = [...cartItems, item];
    setCartItems(newCartItems);
    window.localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    window.alert("已加入商品");
  }

  function changeItemQuantity(itemIndex, itemQuantity) {
    const newCartItems = cartItems.map((item, index) =>
      index === itemIndex
        ? {
            ...item,
            qty: itemQuantity,
          }
        : item
    );
    setCartItems(newCartItems);
    window.localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    window.alert("已修改數量");
  }

  function deleteItem(itemIndex) {
    const newCartItems = cartItems.filter((_, index) => index !== itemIndex);
    setCartItems(newCartItems);
    window.localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    window.alert("已刪除商品");
  }

  function clearItems() {
    const newCartItems = [];
    setCartItems(newCartItems);
    window.localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  }

  const cart = {
    getItems,
    addItem,
    changeItemQuantity,
    deleteItem,
    clearItems,
  };

  let token = window.localStorage.getItem("jwtToken");
  useEffect(() => {
    if (localStorage.jwtToken) {
      socket.current = io.connect("https://hazlin.work/", {
        extraHeaders: {
          Authorization: `Bearer ${JSON.parse(localStorage.jwtToken).token}`,
          transports: ["websocket"],
        },
      });

      console.log(socket.current.id);

      socket.current.on("connect", () => {
        console.log("app socket id", socket.current.id); // "G5p5..."
      });

      socket.current.on("disconnect", () => {
        console.log("斷線後執行重連");
        socket.current.connect();
      });

      // message from server
      console.log("useeffect");
      socket.current.on("liked", (msg) => {
        console.log("msg: ", msg);
        setSocketLike((prev) => {
          prev.unshift({
            id: msg.fromUserId,
            name: msg.fromUserName,
            message: "點了你讚",
          });
          const a = [...prev];
          return a;
        });
        setTimeout(() => {
          setSocketLike((prev) => {
            prev.pop();
            const a = [...prev];
            return a;
          });
        }, 2000);
      });
      // notification from server
      socket.current.on("followed", (msg) => {
        console.log("msg: ", msg);
        setSocketLike((prev) => {
          prev.unshift({
            id: msg.fromUserId,
            name: msg.fromUserName,
            message: "追蹤了你",
          });
          const a = [...prev];
          return a;
        });
        setTimeout(() => {
          setSocketLike((prev) => {
            prev.pop();
            const a = [...prev];
            return a;
          });
        }, 2000);
      });
    }
  }, [render]);

  return (
    <CartContext.Provider value={cart}>
      <Reset />
      <GlobalStyle />
      <Header setRender={setRender} />
      <Outlet />
      <Notification socketLike={socketLike} />
      <Footer />
    </CartContext.Provider>
  );
}

export default App;
