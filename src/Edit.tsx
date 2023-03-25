import Chessground from "@react-chess/chessground";

import { useState } from "react";

import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Opening, BoardOrientation } from "./Types";

function Edit(props: {
  openings: Opening[];
  changeOpenings: (opening: Opening, index: number) => void;
  deleteOpenings: (index: number) => void;
}) {
  // Allows switching pages without link
  const navigate = useNavigate();

  // Finds the opening based off the name in the url
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

  // Aspects of the Opening that can be changed by the user
  const [name, setName] = useState(opening.name);
  const [fen, setFen] = useState(opening.fen);
  const [pgn, setPgn] = useState(opening.pgn);
  const [side, setSide] = useState(opening.side);

  // Displays the card along with all the input boxes and dropdowns
  function Card(props: { opening: Opening }): JSX.Element {
    return (
      <div className="rounded-lg bg-blue-100 w-2/3 lg:w-1/2 xl:w-1/3  m-auto select-none">
        <div className="mx-3 mt-2 text-center grid grid-cols-1 text-xl">
          <label className="font-bold text-left">Enter name: </label>
          <input
            className="py-2 mb-4 rounded-lg bg-blue-50 text-center"
            defaultValue={name}
            placeholder="Enter opening name"
            onBlur={(e) => setName(e.target.value.replace("_", " "))}
          />

          <label className="font-bold text-left">Enter thumbnail FEN: </label>
          <input
            className="py-2 mb-4 rounded-lg bg-blue-50 text-center resize-y"
            defaultValue={fen}
            placeholder="Enter thumbnail FEN"
            onBlur={(e) => setFen(e.target.value.split(" ")[0])}
          />

          <label className="font-bold text-left">Enter opening PGN:</label>
          <input
            className="py-2 mb-4 rounded-lg bg-blue-50 text-center resize-y"
            defaultValue={pgn}
            placeholder="Enter opening PGN"
            onBlur={(e) => setPgn(e.target.value)}
          />

          <label className="font-bold text-left">Choose a side: </label>
          <select
            className="py-2 text-center rounded-lg bg-blue-50"
            defaultValue={side}
            onChange={(e) => setSide(e.target.value as BoardOrientation)}
          >
            <option value="white">White</option>
            <option value="black">Black</option>
          </select>
        </div>
        <div className="pointer-events-none aspect-square m-2">
          <Chessground
            width={500}
            height={500}
            contained={true}
            config={{
              fen: fen,
              orientation: side,
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-blue-400">
      <div className="content-center mx-auto my-8">
        <div className="rounded-lg bg-blue-100">
          <h1 className="text-center px-20 py-8 text-4xl">Edit Mode</h1>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 space-y-2 content-start pb-16">
        <Card opening={opening} />
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4 mx-auto">
          <Link to="/builder">
            <button
              className="rounded-lg bg-blue-100 text-center px-3 py-3 text-2xl text-center"
              onClick={() => {
                props.changeOpenings(
                  {
                    name: name == "" ? openingIndex.toString() : name,
                    created:
                      opening.pgn != pgn ||
                      opening.fen != fen ||
                      opening.side != side
                        ? new Date().toLocaleString("default", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })
                        : opening.created,
                    fen: fen,
                    pgn: pgn,
                    side: side,
                  },
                  openingIndex
                );
                document.body.scrollTop =
                  document.documentElement.scrollTop = 0;
              }}
            >
              Add to Repertoires
            </button>
          </Link>

          <button
            className="rounded-lg bg-blue-100 text-center px-3 py-3 text-2xl text-center"
            onClick={() => {
              let answer = window.confirm(
                "Are you sure you want to delete this opening?"
              );

              if (!answer) {
                return;
              }

              props.deleteOpenings(openingIndex);
              document.body.scrollTop = document.documentElement.scrollTop = 0;

              navigate("/builder");
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Edit;
