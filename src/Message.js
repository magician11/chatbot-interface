import React from "react";
import "./Message.css";

const Message = ({ chat }) => (
  <li className={`chat ${"bot" === chat.entity ? "left" : "right"}`}>
    <p>{chat.content}</p>
  </li>
);

export default Message;
