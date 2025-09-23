import { Counter } from "./components/Counter";
import "./App.css";
import { ListGrid } from "./components/ListGrid";
import { Theme } from "./components/Theme";
import { Random } from "./components/Random";
import { Login } from "./components/Login";
import { Menubar } from "./components/Menubar";
import { Language } from "./components/Language";
import { Favorites } from "./components/Favorites";
function App() {
  return (
    <>
      <div className="singularComps">
        <Counter />
        <Random />
        <Theme />
        <ListGrid />
        <Language />
      </div>
      <Menubar />
      <Favorites />
      <Login/>
    </>
  );
}

export default App;
