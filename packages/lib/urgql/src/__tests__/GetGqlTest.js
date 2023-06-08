//@ts-check

import { expect } from "chai";

import { getGqlResult, longCache, getGqlExecute } from "../getGql";

import { gql } from "@urql/core";

const queryGql = gql`
  {
    author {
      id
      name
    }
    unrelated {
      id
    }
  }
`;

const mutationGql = gql`
  mutation ($userId: ID!, $amount: Int!) {
    updateBalance(userId: $userId, amount: $amount) {
      userId
      balance {
        amount
      }
    }
  }
`;

describe("Execute Test", () => {
  it("query test", async () => {
    const actual = await getGqlResult(
      { url: "http://0.0.0.0" },
      queryGql,
      {},
      {
        isVerbose: true,
        cookResult: (v) => {
          delete v.error;
          return v;
        },
      }
    );
    expect(null != longCache.current.get(actual.operation.key)).to.be.true;
  });

  it("mutation test", async () => {
    const actual = await getGqlExecute(
      { url: "http://0.0.0.0" },
      mutationGql,
      {},
      {
        isVerbose: true,
        cookResult: (v) => {
          delete v.error;
          return v;
        },
      }
    );
    expect(null != actual.operation.key).to.be.true;
  });
});
