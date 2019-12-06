import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInitialize: false,
      isCompleted : false,
      numberBlock: [],
      blankPosition : 0,
      finalAnswer: [],
      slidePosition: [
        { left: false, right: true, up: false, down: true }, { left: true, right: true, up: false, down: true }, { left: true, right: false, up: false, down: true },
        { left: false, right: true, up: true, down: true }, { left: true, right: true, up: true, down: true }, { left: true, right: true, up: true, down: true },   
        { left: false, right: true, up: true, down: false }, { left: true, right: true, up: true, down: false }, { left: true, right: false, up: true, down: false },   
      ]
    };
  }

  sortNumber = (a, b) =>{
    return a - b;
  }

  shuffle = async () => {
    var arr = [];
    while(arr.length < 9){
        var r = Math.floor(Math.random() * 999) + 1;
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    let arra1 = arr;
    arra1.push(0);
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
      finalAnswer : shuffledNumber,
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

  verifyAnswer = async () => {
    let isCompleted = true;
    let finalAnswer = [...this.state.finalAnswer];
    let updatednumberBlock = [...this.state.numberBlock];
    updatednumberBlock = updatednumberBlock.slice(1, this.state.numberBlock.length + 1);
    finalAnswer = finalAnswer.slice(1, this.state.numberBlock.length + 1);
    finalAnswer = finalAnswer.sort(this.sortNumber);
    finalAnswer = finalAnswer.slice(1, this.state.numberBlock.length + 1);
    finalAnswer.push(0);
    finalAnswer.map(async (data, index) => {
        if(data !== updatednumberBlock[index]){
          isCompleted = false;
        }
    });

    if(isCompleted)
    {
      this.setState({
        isCompleted : true
      });
    }
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
    const cPo = this.state.blankPosition;
    if(type === "up")
    {
      const nextPositionObject = this.state.slidePosition[cPo + 2];
      if(nextPositionObject && nextPositionObject.up)
      {
        this.swapNumbers(cPo + 3);
      }
    }else if(type === "down")
    {
      const nextPositionObject = this.state.slidePosition[cPo - 4];
      if(nextPositionObject && nextPositionObject.down)
      {
        this.swapNumbers(cPo - 3);
      }
    }else if(type === "left")
    {
      const nextPositionObject = this.state.slidePosition[cPo];
      if(nextPositionObject && nextPositionObject.left)
      {
        this.swapNumbers(cPo + 1);
      }
    }else if(type === "right")
    {
      const nextPositionObject = this.state.slidePosition[cPo - 1];
      if(nextPositionObject && nextPositionObject.left)
      {
        this.swapNumbers(cPo - 1);
      }
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
    this.verifyAnswer();
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
                        return <td id={counter} key={counter} onClick={this.verifySwapImages}  className={"number " + (currentNumber === 0 ? " blank" : "") + (this.state.isCompleted ? " isCompleted" : "") } width="130px" height="130px">{currentNumber}</td>
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
