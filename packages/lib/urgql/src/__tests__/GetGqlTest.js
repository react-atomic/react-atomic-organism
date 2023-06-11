//@ts-check

import "whatwg-fetch";
import { expect } from "chai";
import { handleGql, longCache } from "../getGql";
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
    const actual = await handleGql(
      { url: "http://0.0.0.0" },
      {
        isVerbose: true,
        cookResult: (v) => {
          delete v.error;
          return v;
        },
      }
    )(queryGql).results();
    expect(null != longCache.current.get(actual.operation.key)).to.be.true;
  });

  it("mutation test", async () => {
    const actual = await handleGql(
      { url: "http://0.0.0.0" },
      {
        isVerbose: true,
        cookResult: (v) => {
          delete v.error;
          return v;
        },
      }
    )(mutationGql).execute();
    expect(null != actual.operation.key).to.be.true;
  });
});
