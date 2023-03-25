import { Link } from "react-router-dom";
import Chessground from "@react-chess/chessground";
import { Opening } from "./Types";

const ChessCard = (props: { opening: Opening; link: string }): JSX.Element => {
  return (
    <Link
      to={props.link}
      onClick={() =>
        (document.body.scrollTop = document.documentElement.scrollTop = 0)
      }
    >
      <div className="rounded-lg bg-blue-100 w-2/3 lg:w-1/2 xl:w-1/3  m-auto hover:cursor-pointer select-none">
        <div>
          <h1 className="px-12 py-2 font-bold text-center text-xl">
            {props.opening.name}
          </h1>
          <h2 className="px-12 pb-2 text-center text-sm underline">
            {props.opening.created}
          </h2>
        </div>
        <div className="pointer-events-none aspect-square m-2 pb-2">
          <Chessground
            width={500}
            height={500}
            contained={true}
            config={{
              fen: props.opening.fen,
              orientation: props.opening.side,
            }}
          />
        </div>
      </div>
    </Link>
  );
};

export default ChessCard;
