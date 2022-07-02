import ReactDOM from "react-dom";

import App from "./App";

const container = document.getElementById('app');

// create a root
const root = ReactDOM.createRoot(container);

// render app to root
root.render(<App />);
