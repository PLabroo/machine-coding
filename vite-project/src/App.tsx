import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ReactToast from "./components/react-toast";
import Otp from "./components/otp";
import StepperParent from "./components/stepper";
import Pagination from "./components/pagination";

const quesList = [
  {
    id: 0,
    ques: "Toasts",
    path: "/toasts",
    component: <ReactToast />,
  },
  {
    id: 1,
    ques: "OTP",
    path: "/otp",
    component: <Otp />,
  },
  {
    id: 2,
    ques: "Stepper",
    path: "/stepper",
    component: <StepperParent />,
  },
  {
    id: 3,
    ques: "Pagination",
    path: "/pagination",
    component: <Pagination />,
  },
];

function Home() {
  return (
    <div className="">
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
