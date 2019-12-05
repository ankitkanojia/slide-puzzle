import React from 'react';
import './App.css';
import { parse } from 'path';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInitialize: false,
      numberBlock: [],
      blankPosition : 0
    };
  }

  shuffle = async () => {
    const arra1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var ctr = arra1.length, temp, index;
    while (ctr > 0) {
      index = Math.floor(Math.random() * ctr);
      ctr--;
      temp = arra1[ctr];
      arra1[ctr] = arra1[index];
      arra1[index] = temp;
    }
    return arra1;
  }

  async componentDidMount() {
    const shuffledNumber = await this.shuffle();
    const blankPosition = shuffledNumber.indexOf(0);
    this.setState({
      numberBlock: shuffledNumber,
      blankPosition : blankPosition
    }, () => {
      this.setState({
        isInitialize: true
      });
    });

    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 38) {
      this.positionChange("up");
    } else if (e.keyCode === 40) {
      this.positionChange("down");
    } else if (e.keyCode === 37) {
      this.positionChange("left");
    } else if (e.keyCode === 39) {
      this.positionChange("right");
    }
  }

  positionChange = (type) => {
    if (type === "up") {

    } else if (type === "down") {

    } else if (type === "left") {

    } else if (type === "right") {

    }
  }

  verifySwapImages = (event) => {
    let index = parseInt(event.target.id);
    const cPo = this.state.blankPosition;
    if ((cPo - 3) === index) {
      this.swapNumbers(index);
    } else if ((cPo + 3) === index) {
      this.swapNumbers(index);
    } else if ((cPo - 1) === index) {
      this.swapNumbers(index);
    } else if ((cPo + 1) === index) {
      this.swapNumbers(index);
    }
  }

  swapNumbers = (index) => {
    let updatedArrayBlock = this.state.numberBlock;
    let currentValue = updatedArrayBlock[index];
    console.log("index");
    if (currentValue === 0) {
      return;
    } else {
      let updatedArrayBlock = this.state.numberBlock;
      updatedArrayBlock[this.state.blankPosition] = currentValue;
      updatedArrayBlock[index] = 0;
      this.setState({
        blankPosition: index,
        numberBlock: updatedArrayBlock
      });
    }
  }

  render() {
    let counter = 0;
    return (
      <div className="App">
        <div className="container d-flex justify-content-center align-items-center">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-md-12 ">
              <h3 className="text-center text-white">Arrange puzzle in numeric order</h3><br />
              <table className="d-flex justify-content-center" width="400px">
                <tbody>
                  {this.state.isInitialize && [...Array(3)].map((data, index) => {
                    return <tr key={index}>
                      {[...Array(3)].map((sdata, sindex) => {
                        counter = counter + 1;
                        const currentNumber = this.state.numberBlock[counter];
                        return <td id={counter} key={counter} onClick={this.verifySwapImages}  className={"number " + (currentNumber === 0 ? " blank" : "")} width="130px" height="130px">{currentNumber}</td>
                      })}
                    </tr>
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
