import { DEFAULT } from "reshow-constant";
import get from "./get";

const getImportDefault = (o) =>
  get(o, [DEFAULT, DEFAULT], () => get(o, [DEFAULT], () => o));

export default getImportDefault;
