import React, { useState, useEffect } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

// Import of header and footer
import Header from "./Header";
import Footer from "./Footer";

// Imports of components
import About from "./About";
import Homepage from "./Homepage";
import Builder from "./Builder";
import Edit from "./Edit";
import Practice from "./Practice";
import Train from "./Train";

import { Opening } from "./Types";

let opens: Opening[] = [
  {
    name: "Scotch Game",
    created: "March 10, 2023",
    fen: "r1bqkbnr/pppp1ppp/2n5/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq",
    pgn: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 (3... d6 4. Bb5 Bd7 5. Nc3 exd4 6. Nxd4) 4. Nxd4 Nxd4 (4... Nf6 5. Nc3 Bb4 6. Nxc6 bxc6 (6... Bxc3+ 7. bxc3 bxc6 8. Bd3 O-O 9. O-O) 7. Bd3) 5. Qxd4",
    side: "white",
  },
  {
    name: "Italian Game",
    created: "April 18, 2022",
    fen: "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq",
    pgn: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 (4... Qe7 5. d4 exd4 (5... Bb6 6. O-O) 6. O-O dxc3 (6... d3 7. b4) 7. Nxc3) 5. d3 d6 (5... a6 6. a4 d6 7. O-O) 6. O-O",
    side: "white",
  },
  {
    name: "Scandinavian Opening",
    created: "Februrary 20, 2023",
    fen: "rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq",
    pgn: "1. e4 d5 2. exd5 Qxd5 3. Nc3 Qa5 4. d4 (4. Nf3 Nf6 5. d4 c6 6. Bc4 Bf5 7. Bd2 e6 8. Nd5 Qd8 9. Nxf6+ Qxf6) 4... Nf6 5. Nf3 c6 6. Bc4 Bf5",
    side: "black",
  },
  {
    name: "Sicilian Defense",
    created: "March 1, 2023",
    fen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq",
    pgn: "1. e4 c5 2. Nf3 d6 3. d4 (3. Bb5+ Bd7 4. Bxd7+ Qxd7 5. O-O (5. c4 Nc6 6. Nc3 g6 7. d4 cxd4 8. Nxd4 Bg7) 5... Nc6 6. c3 Nf6 7. d4 Nxe4 8. d5 Ne5) 3... cxd4 4. Nxd4 Nf6 5. Nc3 a6",
    side: "black",
  },
  {
    name: "English Opening",
    created: "October 27, 2022",
    fen: "rnbqkbnr/pppp1ppp/8/4p3/2P5/6P1/PP1PPP1P/RNBQKBNR b KQkq",
    pgn: "1. c4 e5 2. g3 Nf6 (2... c6 3. Nf3 e4 4. Nd4 d5 5. cxd5 Qxd5 6. Nc2) 3. Bg2 d5 (3... Bc5 4. d3 O-O 5. Nc3 Re8 6. Nf3) 4. cxd5 Nxd5 5. Nc3 Nb6 (5... Nxc3 6. bxc3) 6. Nf3",
    side: "white",
  },
];

function App(): JSX.Element {
  // lambda function for the sorting of the openings array
  const sortByCreated = (a: Opening, b: Opening) => {
    const date1 = new Date(a.created);
    const date2 = new Date(b.created);

    if (date1 > date2) {
      return -1;
    }

    return 1;
  };

  // sets the state of all the openings based off of saved memory
  let init_opening: Opening[] = [];

  if ("openings" in window.localStorage) {
    init_opening = JSON.parse(
      window.localStorage.getItem("openings") as string
    );

    // init_opening = [...init_opening, ...opens];

    init_opening.sort(sortByCreated);
  } else {
    init_opening = [...opens];

    init_opening.sort(sortByCreated);
  }

  const [openings, setOpenings]: [Opening[], (openings: Opening[]) => void] =
    useState(init_opening);

  // On openings change update that in memory
  useEffect(() => {
    window.localStorage.setItem("openings", JSON.stringify(openings));
  }, [openings]);

  // function passed as a prop to change the opening from state
  function changeOpenings(opening: Opening, index: number): void {
    const updatedOpenings = [
      ...openings.slice(0, index),
      opening,
      ...openings.slice(index + 1, openings.length),
    ];

    updatedOpenings.sort(sortByCreated);

    setOpenings(updatedOpenings);
  }

  // function passed as a prop to delete an opening from state
  function deleteOpenings(index: number): void {
    const updatedOpenings = [
      ...openings.slice(0, index),
      ...openings.slice(index + 1, openings.length),
    ];

    updatedOpenings.sort(sortByCreated);

    setOpenings(updatedOpenings);
  }

  return (
    <React.StrictMode>
      <Router>
        <Header />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route
            path="/builder"
            element={<Builder openings={openings} setOpenings={setOpenings} />}
          />
          <Route
            path="/builder/opening"
            element={
              <Edit
                openings={openings}
                changeOpenings={changeOpenings}
                deleteOpenings={deleteOpenings}
              />
            }
          />
          <Route
            path="/train"
            element={<Train openings={openings} setOpenings={setOpenings} />}
          />
          <Route
            path="/train/opening"
            element={<Practice openings={openings} setOpenings={setOpenings} />}
          />
          <Route path="/*" element={<Homepage />} />
        </Routes>
        <Footer />
      </Router>
    </React.StrictMode>
  );
}

export default App;
