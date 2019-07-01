import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./HomePage";

class App extends React.Component {
  render() {
    return (
      // <Router>
      //   <div
      //     className="container-fluid "
      //     style={{ height: "100vh", background: "#CCC", overflow: "hidden" }}
      //   >
      //     <div style={{ background: "#f5f5f5", padding: "5px" }}>
      //       <div className="text-center">
      //         <div className="row">
      //           <div className="col-12">
      //             <Route exact path="/" component={HomePage} />
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </Router>
      <HomePage />
    );
  }
}

export default App;
