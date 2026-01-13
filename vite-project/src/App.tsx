import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ReactToast from "./components/react-toast";
import Otp from "./components/otp";
import StepperParent from "./components/stepper";
import Pagination from "./components/pagination";
import Carousel from "./components/carousel";
import VirtualizedList from "./components/virtualizedList";
import StarRating from "./components/starRating";
import Autocomplete from "./components/autocomplete";
import InfiniteScroll from "./components/infiniteScroll";

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
  {
    id: 4,
    ques: "Carousel",
    path: "/carousel",
    component: <Carousel />,
  },
  {
    id: 5,
    ques: "Virtualized List",
    path: "/virtualized_list",
    component: <VirtualizedList />,
  },
  {
    id: 6,
    ques: "Star Rating",
    path: "/star_rating",
    component: <StarRating />,
  },
  {
    id: 7,
    ques: "Search and Debounce",
    path: "/search",
    component: <Autocomplete />,
  },
  {
    id: 8,
    ques: "Infinite Scroll",
    path: "/infinite-scroll",
    component: <InfiniteScroll />,
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
