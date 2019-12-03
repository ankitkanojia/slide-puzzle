import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="App">
        <div className="container d-flex justify-content-center align-items-center">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-md-12 ">
              <h3 className="text-center text-white">Arrange puzzle in numeric order</h3><br />
              <table className="d-flex justify-content-center" width="400px">
                <tbody>
                  {[...Array(3)].map((data, index) => {
                    return <tr>
                      {[...Array(3)].map((data, index) => {
                            return <td width="130px" height="130px">&nbsp;</td>
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
