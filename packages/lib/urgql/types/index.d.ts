export { handleGql } from "./getGql";
export { handleGqlError } from "./getGqlError";
export { gql } from "@urql/core";
export type UrGqlQuery = import("./getGql").UrGqlQuery;
export type UrGqlVariables = import("./getGql").UrGqlVariables;
export type GqlResultOptions = import("./getGql").GqlResultOptions;
