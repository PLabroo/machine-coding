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
import ProgressBar from "./components/progressBar";
import Accordion from "./components/accordion";
import StopWatch from "./components/stopWatch";
import FileExplorer1 from "./components/fileExplorer1";
import GridColoring from "./components/gridColoring";
import TicTacToe from "./components/ticTacToe";
import SnakeGame from "./components/snakeGame";
import TabChange from "./components/tabChange";
import TodoApp from "./components/todo-app";

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
  {
    id: 9,
    ques: "Progress Bar",
    path: "/progress-bar",
    component: <ProgressBar />,
  },
  {
    id: 10,
    ques: "Accordion",
    path: "/accordion",
    component: <Accordion />,
  },
  {
    id: 11,
    ques: "Stop Watch",
    path: "/stop-watch",
    component: <StopWatch />,
  },
  {
    id: 12,
    ques: "File Explorer 1",
    path: "/file-explorer-1",
    component: <FileExplorer1 />,
  },
  {
    id: 13,
    ques: "Grid Coloring",
    path: "/grid-coloring",
    component: <GridColoring />,
  },
  {
    id: 14,
    ques: "Tic Tac Toe",
    path: "/tic-tac-toe",
    component: <TicTacToe />,
  },
  {
    id: 15,
    ques: "Snake Game",
    path: "/snake-game",
    component: <SnakeGame />,
  },
  {
    id: 16,
    ques: "Tab Change",
    path: "/tab-change",
    component: <TabChange />,
  },
  {
    id: 16,
    ques: "Todo App",
    path: "/tood-app",
    component: <TodoApp />,
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
