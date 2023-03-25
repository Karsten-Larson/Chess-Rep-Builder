import { Link } from "react-router-dom";
import { useState } from "react";
import { Hyperlink } from "./Types";

// Object that contains the links
const hyperlinks: Hyperlink[] = [
  { name: "Home", url: "/" },
  { name: "Builder", url: "/builder" },
  { name: "Train", url: "/train" },
  { name: "About", url: "/about" },
];

function Header(): JSX.Element {
  function Option(props: { hyperlink: Hyperlink }): JSX.Element {
    return (
      <div className="my-auto hover:underline hover:cursor-pointer">
        <Link to={props.hyperlink.url} onClick={() => setToggle(true)}>
          <h1>{props.hyperlink.name}</h1>
        </Link>
      </div>
    );
  }

  let output: JSX.Element[] = [];

  hyperlinks.forEach((hyperlink) => {
    output.push(<Option hyperlink={hyperlink} />);
  });

  const [toggle, setToggle] = useState(true);

  return (
    <div>
      <div className="hidden md:block">
        <div className="text-3xl grid grid-cols-4 gap-4 content-start font-bold text-center">
          {output}
        </div>
      </div>
      <div className="MOBILE-MENU md:hidden sm:block">
        <div className="flex flex-row-reverse m-5 mx-10">
          <div
            className="space-y-2 hover:cursor-pointer"
            onClick={() => setToggle(!toggle)}
          >
            <div className="w-8 h-0.5 bg-gray-600"></div>
            <div className="w-8 h-0.5 bg-gray-600"></div>
            <div className="w-8 h-0.5 bg-gray-600"></div>
          </div>
        </div>
        {toggle ? (
          <div></div>
        ) : (
          <div className="text-3xl grid grid-cols-1 gap-4 content-start font-bold text-center">
            {output}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
