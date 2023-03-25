import Chessground from "@react-chess/chessground";
import { Link } from "react-router-dom";

import ChessCard from "./ChessCard";

import { Opening, BoardOrientation } from "./Types";

function Train(props: { openings: Opening[]; setOpenings: any }) {
  function Cards(): JSX.Element {
    let output: JSX.Element[] = [];

    props.openings.forEach((opening) => {
      output.push(
        <ChessCard
          opening={opening}
          link={"/train/opening?=" + opening.name.replace(" ", "_")}
        />
      );
    });

    return (
      <div className="grid grid-cols-1 gap-4 space-y-2 content-start pb-16">
        {output}
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-blue-400">
      <div className="content-center mx-auto my-8">
        <div className="rounded-lg bg-blue-100">
          <h1 className="text-center px-20 py-12 text-4xl">
            Repertoires to Practice
          </h1>
        </div>
      </div>
      <Cards />
    </div>
  );
}

export default Train;
