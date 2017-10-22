import React from "react";
import ReactDOM from "react-dom";
import "./Chatroom.css";

import Message from "./Message.js";

class Chatroom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chats: [
        {
          entity: "bot",
          content: "Why hello there!"
        },
        {
          entity: "bot",
          content: "What can I do for you today?"
        }
      ]
    };

    this.submitMessage = this.submitMessage.bind(this);
  }

  componentDidMount() {
    this.scrollToLastMessage();
  }

  componentDidUpdate() {
    this.scrollToLastMessage();
  }

  scrollToLastMessage() {
    ReactDOM.findDOMNode(this.refs.chats).scrollTop = ReactDOM.findDOMNode(
      this.refs.chats
    ).scrollHeight;
  }

  submitMessage(e) {
    e.preventDefault();

    this.setState(
      {
        chats: this.state.chats.concat([
          {
            username: "human",
            content: ReactDOM.findDOMNode(this.refs.msg).value
          }
        ])
      },
      () => {
        ReactDOM.findDOMNode(this.refs.msg).value = "";
      }
    );
  }

  render() {
    const { chats } = this.state;

    return (
      <div className="chatroom">
        <h1>Go For Self</h1>
        <ul className="chats" ref="chats">
          {chats.map(chat => <Message chat={chat} />)}
        </ul>
        <form className="input" onSubmit={e => this.submitMessage(e)}>
          <input
            type="text"
            ref="msg"
            placeholder="Say something..."
            autoFocus
          />
        </form>
      </div>
    );
  }
}

export default Chatroom;
