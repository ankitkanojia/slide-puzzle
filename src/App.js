import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInitialize: false,
      numberBlock: []
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
    this.setState({
      numberBlock: shuffledNumber
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
    if(type === "up")
    {
      
    }else if(type === "down")
    {
  
    }else if(type === "left")
    {
     
    }else if(type === "right")
    {
     
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
                    return <tr>
                      {[...Array(3)].map((data, sindex) => {
                        counter = counter + 1;
                        const currentNumber = this.state.numberBlock[counter];
                        return <td className={"number " + (currentNumber === 0 ? " blank" : "")} width="130px" height="130px">{currentNumber}</td>
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
