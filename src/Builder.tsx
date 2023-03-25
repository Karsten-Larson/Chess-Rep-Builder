import { Opening, BoardOrientation } from "./Types";
import { Link } from "react-router-dom";

import ChessCard from "./ChessCard";

const Builder = (props: {
  openings: Opening[];
  setOpenings: (a: Opening[]) => void;
}): JSX.Element => {
  // generates all the cards on the builder screen
  const Cards = (): JSX.Element => {
    let output: JSX.Element[] = [];

    props.openings.forEach((opening) => {
      output.push(
        <ChessCard
          opening={opening}
          link={"/builder/opening?=" + opening.name.replace(" ", "_")}
        />
      );
    });

    return (
      <div className="grid grid-cols-1 gap-4 space-y-2 content-start pb-16">
        {output}
        <Link
          className="mx-2 text-center"
          to="/builder/opening?="
          onClick={() =>
            props.setOpenings([
              ...props.openings,
              {
                name: "",
                created: "",
                fen: "",
                pgn: "",
                side: "white" as BoardOrientation,
              },
            ])
          }
        >
          <button className="rounded-lg bg-blue-100 text-center px-3 py-3 text-2xl text-center">
            Create New Opening +
          </button>
        </Link>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-400">
      <div className="content-center mx-auto my-8">
        <div className="rounded-lg bg-blue-100">
          <h1 className="text-center px-20 py-12 text-4xl">
            Repertoires to Edit
          </h1>
        </div>
      </div>
      <Cards />
    </div>
  );
};

export default Builder;
