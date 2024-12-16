import {capitalize} from "./capitalize.js";

export function snakeCaseToCamelCase(s) {
  return ("" + s)
    .split("_")
    .reduce(
      (prev, cur, ind) =>
        prev + (ind === 0 ? cur.toLocaleLowerCase() : capitalize(cur)),
      "",
    );
}
