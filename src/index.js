import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar"

import App from "./App";
import "./styles/resetCss.css"
import "./styles/index.css"

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<BrowserRouter>
		<Navbar />
			<App />
		</BrowserRouter>
	</React.StrictMode>
);
