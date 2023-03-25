import { Link } from "react-router-dom";
import { Hyperlink } from "./Types";

import build from "./assets/build.svg";

// Object that contains the links
const hyperlinks: Hyperlink[] = [
  { name: "Builder", url: "/builder" },
  { name: "Train", url: "/train" },
];

// Generates the navigation buttons
function PageButton(props: { hyperlink: Hyperlink }): JSX.Element {
  return (
    <Link to={props.hyperlink.url}>
      <div className="rounded-lg px-0 lg:py-52 py-24 bg-blue-100 hover:cursor-pointer hover:bg-blue-100 duration-500">
        <h2 className="text-2xl">{props.hyperlink.name}</h2>
      </div>
    </Link>
  );
}

// Generates all buttons based on the length of the links
function Buttons(): JSX.Element {
  let output: JSX.Element[] = [];

  hyperlinks.forEach((hyperlink) => {
    output.push(<PageButton hyperlink={hyperlink} />);
  });

  return (
    <div className="mx-10 grid lg:grid-cols-2 grid-cols-1 gap-5 content-start text-center">
      {output}
    </div>
  );
}

// Generates the homepage
function Homepage(): JSX.Element {
  return (
    // Makes the component fill the whole screen, blue background
    <div className="flex flex-col min-h-screen bg-blue-400">
      {/* Centers the title text */}
      <div className="content-center mx-auto my-12">
        <div className="rounded-lg bg-blue-100">
          <h1 className="text-center px-16 py-12 text-4xl">
            Repertoire Builder
          </h1>
        </div>
      </div>

      {/* Creates the buttons */}
      <Buttons />
    </div>
  );
}

export default Homepage;
