import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from '@react-oauth/google';
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GoogleOAuthProvider clientId="1068741602254-qbiqmp1ei5bfuj2q2i3cm9fcd6eeuimd.apps.googleusercontent.com">
      <Router>
        <App />
      </Router>
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>
);
