import React from "react";
import { UrlReturn } from "reshow-url";
import SortLink from "../organisms/SortLink";

const SortBy = ({
  sortKeyName = "sort",
  sort,
  descKeyName = "desc",
  desc,
  ...props
}) => {
  return (
    <UrlReturn initStates={[sortKeyName, descKeyName]}>
      {(uProps) => {
        const curSort = sort || uProps[sortKeyName];
        const curDesc = desc || uProps[descKeyName];
        return (
          <SortLink
            {...props}
            desc={curDesc}
            sort={curSort}
            sortKeyName={sortKeyName}
          />
        );
      }}
    </UrlReturn>
  );
};

export default SortBy;
