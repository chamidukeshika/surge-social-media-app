import ReactDOM from 'react-dom/client';  // Add this import
import { StrictMode } from 'react';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from "./context/AuthContext";  // Use AuthProvider to wrap the app

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
