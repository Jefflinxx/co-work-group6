import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const NotificationWrapper = styled.div`
  position: fixed;
  width: 260px;
  right: 0px;
  bottom: 100px;
  border: 1px solid black;
  display: flex;
  flex-wrap: wrap-reverse;
  ${"" /* justify-content: flex-end; */}
`;

const NotificationDiv = styled.div`
  position: relative;
  right: ${(props) => {
    console.log(props.socketLike);
    console.log(props.$on);
    console.log(props.socketLike.includes(props.$on));

    return props.socketLike.includes(props.$on) ? "0px" : "-100px";
  }};
  width: 260px;
  height: 60px;
  background: #b19675e1;
  border-radius: 10px;
  opacity: ${(props) => (props.socketLike.includes(props.$on) ? 1 : 0)};
  margin-top: ${(props) =>
    props.socketLike.includes(props.$on) ? "10px" : "0px"};

  transition: all 1s;

  display: flex;
  align-items: center;
  text-indent: 20px;
  color: #f5f5f5;
`;

function Notification({ socketLike }) {
  return (
    <NotificationWrapper>
      {socketLike.map((i) => {
        return (
          <NotificationDiv socketLike={socketLike} $on={i}>
            {i.name}按了你讚
          </NotificationDiv>
        );
      })}
    </NotificationWrapper>
  );
}

export default Notification;
