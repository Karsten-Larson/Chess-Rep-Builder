import { useState } from "react";
import { Chess, Square, PieceSymbol } from "chess.js";
import { Link, useSearchParams } from "react-router-dom";
import Chessground from "@react-chess/chessground";
import parseLines from "./PgnParser";

import { Opening, Key } from "./Types";

function Practice(props: {
  openings: Opening[];
  setOpenings: any;
}): JSX.Element {
  const moveDelay = 150;

  const [searchParams] = useSearchParams();

  const openingName = searchParams.get("");
  let opening: Opening = props.openings[0];
  let openingIndex = 0;

  if (openingName != null) {
    // Finds the opening based on name
    for (let index = 0; index < props.openings.length; index++) {
      if (props.openings[index].name == openingName.replace("_", " ")) {
        opening = props.openings[index];
        openingIndex = index;
      }
    }
  }

  const [fen, setFen] = useState(
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq"
  );

  const lines = parseLines(opening.pgn);

  const [line, setLine] = useState(
    lines[Math.floor(Math.random() * lines.length)]
  );

  const [index, setIndex] = useState(0);
  const [toggle, setToggle] = useState(true);
  const [correct, setCorrect]: [any, any] = useState([]);
  let game = new Chess(fen);

  function reset(): void {
    setFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq");
    setIndex(0);
    setLine(lines[Math.floor(Math.random() * lines.length)]);
  }

  function makeAMove(
    move: { from: Square; to: Square; promotion: PieceSymbol } | string
  ) {
    setCorrect([]);

    try {
      game.move(move);
    } catch {
      setToggle(!toggle);
      return false;
    }

    if (game.history()[0] === line[index]) {
      setFen(game.fen());
    } else {
      const testGame = new Chess(fen);
      testGame.move(line[index]);
      const correctMove = testGame.history({ verbose: true })[0].lan;

      setCorrect([
        {
          orig: correctMove.slice(0, 2),
          dest: correctMove.slice(2, 4),
          brush: "green",
        },
      ]);
      setToggle(!toggle);
      return false; // null if the move was illegal, the move object if the move was legal
    }

    return true; // null if the move was legal
  }

  function makeAMoveLoose(move: string): void {
    game.move(move);
    setFen(game.fen());
  }

  function lineMove(): void {
    if (index + 1 === line.length) {
      setTimeout(reset, 1000);
      return;
    }

    const move = line[index + 1];
    makeAMoveLoose(move);

    setIndex(index + 2);
  }

  function onDrop(sourceSquare: any, targetSquare: any) {
    const move = makeAMove({
      from: sourceSquare as Square,
      to: targetSquare as Square,
      promotion: "q", // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === false) return false;
    setTimeout(lineMove, moveDelay);
    // makeRandomMove();

    return true;
  }

  function validMoves(): Map<Key, Key[]> {
    const possibleMoves = game.moves({ verbose: true });
    let lanMap = new Map<Key, Key[]>();

    for (const move of possibleMoves) {
      const startMove = move.lan.slice(0, 2) as Key;
      const endMove = move.lan.slice(2, 4) as Key;

      if (lanMap.has(startMove)) {
        lanMap.set(startMove, [...(lanMap.get(startMove) as Key[]), endMove]);
      } else {
        lanMap.set(startMove, [endMove]);
      }
    }

    return lanMap;
  }

  if (opening.side == "black" && index == 0) {
    setTimeout(() => {
      makeAMove(line[0]);
      setIndex(index + 1);
    }, moveDelay * 3);
  }

  return (
    <div className="flex flex-col min-h-screen bg-blue-400 select-none">
      <div className="content-center mx-auto mt-4 mb-0">
        <div className="rounded-lg bg-blue-100">
          <h1 className="text-center px-20 py-2 text-3xl">{opening.name}</h1>
        </div>
      </div>
      <div
        className="w-5/6 xl:w-2/5 lg:w-2/5 mx-auto my-4 aspect-square"
        onContextMenu={(e) => e.preventDefault()}
      >
        <Chessground
          contained={true}
          config={{
            fen: fen,
            events: { move: onDrop },
            highlight: { lastMove: false, check: true },
            movable: {
              dests: validMoves(),
              showDests: true,
            },
            animation: {
              enabled: true,
              duration: 250,
            },
            drawable: {
              enabled: true,
              visible: true,
              autoShapes: correct,
            },
            orientation: opening.side,
          }}
        />
      </div>
      <div className="text-center mx-auto">
        <Link to="/train">
          <button
            className="rounded p-2 mx-2 bg-sky-50"
            onClick={() =>
              (document.body.scrollTop = document.documentElement.scrollTop = 0)
            }
          >
            Switch Openings
          </button>
        </Link>
        <button className="rounded p-2 mx-2 bg-sky-50" onClick={reset}>
          Restart
        </button>
      </div>
    </div>
  );
}

export default Practice;
