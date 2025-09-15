import { BrowserRouter as Router } from "react-router-dom";
import { UserDataProvider } from "./context/UserDataProvider"; // ✅
import PublicRoute from "./routes/PublicRoute";

function App() {
  return (
    <UserDataProvider>
      <Router>
        <PublicRoute />
      </Router>
    </UserDataProvider>
  );
}

export default App;
