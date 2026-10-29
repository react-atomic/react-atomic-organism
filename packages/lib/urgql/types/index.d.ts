export type UrGqlQuery = import("./getGql").UrGqlQuery;
export type UrGqlVariables = import("./getGql").UrGqlVariables;
export type GqlResultOptions = import("./getGql").GqlResultOptions;
/**
 * @typedef {import("./getGql").UrGqlQuery} UrGqlQuery
 * @typedef {import("./getGql").UrGqlVariables} UrGqlVariables
 * @typedef {import("./getGql").GqlResultOptions} GqlResultOptions
 */
export { handleGql } from "./getGql";
export { handleGqlError } from "./getGqlError";
export { gql } from "@urql/core";
