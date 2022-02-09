import React from "react";
import { UrlReturn } from "reshow-url";
import SortLink from "../organisms/SortLink";

const SortBy = ({ sortKeyName = "sort", sort, ...props }) => {
  return (
    <UrlReturn initStates={[sortKeyName]}>
      {(uProps) => {
        const sortBy = sort || uProps[sortKeyName];
        return <SortLink {...props} sort={sortBy} sortKeyName={sortKeyName} />;
      }}
    </UrlReturn>
  );
};

export default SortBy;
