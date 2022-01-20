// https://github.com/d3/d3/blob/master/index.js
import * as nodeD3 from "d3";
import * as d3Lib from "./d3lib";
const { handleGetD3, ...libs } = d3Lib;
handleGetD3(nodeD3);

export default libs;
