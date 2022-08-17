import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const NotificationWrapper = styled.div`
  position: fixed;
  width: 260px;
  bottom: 100px;
  border: 1px solid black;
  display: flex;
  flex-wrap: wrap-reverse;
`;

const NotificationDiv = styled.div`
  position: relative;
  right: ${(props) => (props.$socketLike ? "0px" : "-100px")};
  width: 260px;
  height: 60px;
  background: #b19675e1;
  border-radius: 10px;
  opacity: ${(props) => (props.$socketLike ? 1 : 0)};

  transition: all 0.5s;

  display: flex;
  align-items: center;
  text-indent: 20px;
  color: #f5f5f5;
`;

function Notification({ socketLike }) {
  return (
    <NotificationWrapper>
      <NotificationDiv $socketLike={socketLike}>我按了你讚</NotificationDiv>
    </NotificationWrapper>
  );
}

export default Notification;
