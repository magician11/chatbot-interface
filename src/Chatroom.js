import React from 'react';
import ReactDOM from 'react-dom';
import './Chatroom.css';
import Message from './Message.js';

const config = require('./config.json');

class Chatroom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chats: [
        {
          entity: 'bot',
          content: 'Why hello there!'
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

  getBotResponse = text => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await fetch(`${config.url}${text}`);
        let responseJson = await response.json();
        resolve(responseJson);
      } catch (error) {
        reject(error);
      }
    });
  };

  // submit message and receive a response
  submitMessage = async e => {
    e.preventDefault();

    const userEnteredText = ReactDOM.findDOMNode(this.refs.msg).value;

    this.setState(
      {
        chats: this.state.chats.concat([
          {
            entity: 'human',
            content: userEnteredText
          }
        ])
      },
      () => {
        ReactDOM.findDOMNode(this.refs.msg).value = '';
      }
    );

    const botResponse = await this.getBotResponse(userEnteredText);
    console.log(botResponse);
    let responseToUser;
    if (botResponse.entities.intent) {
      const intention = botResponse.entities.intent[0];
      responseToUser = `Looks like your intention was "${intention.value}". I'm ${Math.round(
        intention.confidence * 100
      )}% sure of this.`;
    } else {
      responseToUser = "Mmmm... not sure what you're trying to say here...";
    }

    this.setState({
      chats: this.state.chats.concat([
        {
          entity: 'bot',
          content: responseToUser
        }
      ])
    });
  };

  render() {
    const { chats } = this.state;

    return (
      <div className="chatroom">
        <h1>{config.botName}</h1>
        <ul className="chats" ref="chats">
          {chats.map((chat, i) => <Message chat={chat} key={i} />)}
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
