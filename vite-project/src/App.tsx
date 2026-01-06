import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ReactToast from "./components/react-toast";

const quesList = [
  {
    id: 0,
    ques: "Toasts",
    path: "/toasts",
    component: <ReactToast />,
  },
];

function Home() {
  return (
    <div>
      <p>Machine Coding Questions</p>
      <ol>
        {quesList.map((item) => (
          <li key={item.id}>
            <Link to={item.path}>{item.ques}</Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Question Routes */}
        {quesList.map((item) => (
          <Route key={item.id} path={item.path} element={item.component} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
