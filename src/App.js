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
        <div className="container">
          <div className="row">
            <div className="col-md-12 d-flex justify-content-center align-items-center">
              <table className="anstable" style={{ width: "50%", border: "2px solid white" }}>
                <tbody>
                  {[...Array(5)].map((data, index) => {
                    return <tr><td>&nbsp;</td></tr>
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
