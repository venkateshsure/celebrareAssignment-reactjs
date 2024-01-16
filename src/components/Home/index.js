import { v4 } from "uuid";

import { Component } from "react";

import "./index.css";

const arrayOfObjects = [
  {
    id: 1,
    fontFamily: "Roboto",
    fontSize: 16,
    color: "black",
  },

  {
    id: 2,
    fontFamily: "Arial",
    fontSize: 20,
    color: "pink",
  },
  {
    id: 3,
    fontFamily: "cursive",
    fontSize: 25,
    color: "Yellow",
  },
  {
    id: 4,
    fontFamily: "fantasy",
    fontSize: 30,
    color: "red",
  },
];

class Home extends Component {
  state = {
    arrayOfObjects: arrayOfObjects,
    text: "",
    addedText: "celebrare",
    cursorX: 0,
    cursorY: 0,
    history: [],
    historyIndex: -1,
    fontFamily: arrayOfObjects[0].fontFamily,
    fontSize: arrayOfObjects[0].fontSize,
    color: arrayOfObjects[0].color,
  };

  undo = () => {
    const { historyIndex, history } = this.state;
    console.log(historyIndex, history);
    if (historyIndex > 0) {
      this.setState((prevState) => ({
        historyIndex: prevState.historyIndex - 1,
        text: prevState.history[prevState.historyIndex - 1].text,
      }));
    }
  };

  redo = () => {
    const { history, historyIndex } = this.state;

    if (historyIndex < history.length - 1) {
      this.setState((prevState) => ({
        historyIndex: prevState.historyIndex + 1,
        text: prevState.history[prevState.historyIndex + 1].text,
      }));
    }
  };

  onChangeText = (event) => {
    this.setState({ text: event.target.value });
  };

  onAddText = (event) => {
    const { text } = this.state;
    if (event.type === "click") {
      this.setState({ addedText: text });
      this.addToHistory();
    }
  };

  addToHistory = () => {
    let { text, historyIndex, history } = this.state;
    const currentState = {
      id: v4(),
      text,
    };

    historyIndex = historyIndex + 1;
    history = history.slice(0, historyIndex);
    history.push(currentState);
    console.log(history, historyIndex);

    this.setState({
      history,
      historyIndex: history.length - 1,
      text: "",
    });
  };

  onChangeFontFamily = (event) => {
    this.setState({ fontFamily: event.target.value });
  };

  onChangeFontSize = (event) => {
    const fontValue = parseInt(event.target.value);
    this.setState({ fontSize: fontValue });
  };

  onChangeColor = (event) => {
    this.setState({ color: event.target.value });
  };

  moveText = () => {
    document.addEventListener("mousemove", this.handleMouseMove);
  };

  notMoveText = (event) => {
    document.removeEventListener("mousemove", this.handleMouseMove);
  };

  handleMouseMove = (event) => {
    this.setState({
      cursorX: event.clientX,
      cursorY: event.clientY,
    });
  };

  render() {
    const {
      text,
      addedText,
      cursorX,
      cursorY,
      arrayOfObjects,
      fontFamily,
      fontSize,
      color,
    } = this.state;
    return (
      <div className="con">
        <div className="head-con">
          <h1
            style={{
              left: cursorX,
              top: cursorY,
              position: "absolute",
              transition: "top 0.3s ease-out",
              fontFamily: fontFamily,
              fontSize: fontSize,
              color: color,
            }}
          >
            {addedText}
          </h1>
        </div>
        <div className="select-button-con">
          <div className="select-head-con">
            <div className="select-containers">
              <label htmlFor="font-family">Font Family :</label>
              <select onChange={this.onChangeFontFamily} id="font-family">
                {arrayOfObjects.map((each) => (
                  <option value={each.fontFamily} key={each.id}>
                    {each.fontFamily}
                  </option>
                ))}
              </select>
            </div>
            <div className="select-containers">
              <label htmlFor="font-size">Font Size :</label>
              <select onChange={this.onChangeFontSize} id="font-size">
                {arrayOfObjects.map((each) => (
                  <option value={each.fontSize} key={each.id}>
                    {each.fontSize}
                  </option>
                ))}
              </select>
            </div>
            <div className="select-containers">
              <label htmlFor="color">Color :</label>
              <select onChange={this.onChangeColor} id="color">
                {arrayOfObjects.map((each) => (
                  <option value={each.color} key={each.id}>
                    {each.color}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="text-button-con">
            <div className="input-con">
              <label htmlFor="text">Enter text : </label>
              <input
                id="text"
                type="text"
                value={text}
                onChange={this.onChangeText}
                className="input"
              />
            </div>
            <div className="all-but-undo-redo-con">
              <div className="all-buttons">
                <button type="button" onClick={this.onAddText} className="btn">
                  Add Text
                </button>
                <button type="text" onClick={this.moveText} className="btn">
                  Move Text
                </button>
                <button type="text" onClick={this.notMoveText} className="btn">
                  Not Move Text
                </button>
              </div>
              <div className="undo-redo-con">
                <button type="button" onClick={this.undo}>
                  Undo
                </button>
                <button type="button" onClick={this.redo}>
                  Redo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
