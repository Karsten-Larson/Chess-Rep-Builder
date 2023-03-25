import { parsePgn, startingPosition } from "chessops/pgn";

function printPaths(node: any): string[][] {
  let path = Array(1000).fill("");
  let paths: string[][] = [];

  pathsRecur(node, path, paths, 0);

  return paths;
}

function pathsRecur(node: any, path: any, paths: string[][], pathLen: number) {
  if (node == null) {
    return;
  }

  path[pathLen] = node.data.san;
  pathLen++;

  // console.log(node);

  if (node.children.length == 0) {
    paths.push(path.slice(0, pathLen));
  } else {
    for (const child of node.children) {
      //   console.log(child);
      pathsRecur(child, path, paths, pathLen);
    }
  }
}

export default function parseLines(pgn: string): string[][] {
  const games = parsePgn(pgn);

  let paths: string[][] = [];

  for (const game of games) {
    const pos = startingPosition(game.headers).unwrap();

    for (const child of game.moves.children) {
      paths.push(...printPaths(child));
    }
  }

  return paths;
}
