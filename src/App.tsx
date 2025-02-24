import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider";
import Pages from "./pages";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
