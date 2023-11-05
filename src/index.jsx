import React from "react";
import ReactDOM from "react-dom/client";

import "react-toastify/dist/ReactToastify.css";
import "./styles/index.css";
import "./styles/tailwind.css";
import "./styles/titlebar.css";


const root = ReactDOM.createRoot(
    document.getElementById("root"),
);
root.render(
    <React.StrictMode>
        <div className='w-12 h-12 bg-red-500'></div>
    </React.StrictMode>,
);
console.log(window.subsystem.open("C:\\Sample.wav"))
    //window.subsystem.play();