import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import "./styles/index.css";
import "./styles/tailwind.css";
import "./styles/titlebar.css";
import { App } from "./App";
import { Provider } from "react-redux";
import store from "./store";
import "./utils/i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
);