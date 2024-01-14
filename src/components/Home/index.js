import "./index.css";

import { Component } from "react";

class Home extends Component {
  state = {
    text: "",
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#000000",
    cursorX: 0,
    cursorY: 0,
    addedText: "",
  };

  onChangeText = (event) => {
    this.setState({ text: event.target.value });
  };
  onAddText = (event) => {
    console.log(event);
    if (event.type === "click") {
      const { text } = this.state;
      this.setState({ addedText: text });
    }
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
      fontFamily,
      fontSize,
      color,
      cursorX,
      cursorY,
    } = this.state;
    return (
      <div className="con">
        <h1
          style={{
            fontFamily: fontFamily,
            fontSize: fontSize,
            color: color,
            left: cursorX,
            top: cursorY,
            position: "absolute",
            transition: "top 0.3s ease-out",
          }}
        >
          {addedText}
        </h1>
        <div className="select-button-con">
          <div className="select-head-con">
            <div className="select-containers">
              <label htmlFor="font-family">Font Family :</label>
              <select onChange={this.onChangeFontFamily} id="font-family">
                <option value="Arial">Arial</option>
                <option value="Roboto">Roboto</option>
                <option value="cursive">cursive</option>
                <option value="fantasy">fantasy</option>
              </select>
            </div>
            <div className="select-containers">
              <label htmlFor="font-size">Font Size :</label>
              <select onChange={this.onChangeFontSize} id="font-size">
                <option value="16">16</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="30">30</option>
              </select>
            </div>
            <div className="select-containers">
              <label htmlFor="color">Color :</label>
              <select onChange={this.onChangeColor} id="color">
                <option value="pink">pink</option>
                <option value="yellow">yellow</option>
                <option value="red">red</option>
                <option value="green">green</option>
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
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
