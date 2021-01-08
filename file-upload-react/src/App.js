import React from "react";
import "./App.css";

import UploadFiles from "./components/upload-file.component";

function App() {
  return (
    <div className="container" style={{ width: "600px" }}>
      <div>
        <h3>bezkoder.com</h3>
        <h4>React upload multiple Files</h4>
      </div>

      <UploadFiles />
    </div>
  );
}

export default App;