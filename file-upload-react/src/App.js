import React from "react";
import "./App.css";

import UploadFiles from "./components/upload-file.component";

function App() {
  return (
    <div className="container" style={{ width: "600px" }}>
      <div>
        <h3>VidRecog</h3>
        <h4>Mask/Object Detection Software</h4>
      </div>

      <UploadFiles />
    </div>
  );
}

export default App;