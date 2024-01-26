import React from "react";
import { HashRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContextProvider } from "./Context/AuthConetxt.jsx";
import { ChatContextProvider } from "./Context/ChatContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ChatContextProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </ChatContextProvider>
  </AuthContextProvider>
);
