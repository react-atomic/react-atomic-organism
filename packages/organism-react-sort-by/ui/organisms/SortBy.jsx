import React, { PureComponent } from "react";
import { UrlReturn } from "reshow";
import { SortLink } from "react-atomic-organism";

class SortBy extends PureComponent {
  static defaultProps = { sortKeyName: "sort" };

  render() {
    const { sort, sortKeyName, ...props } = this.props;
    return (
      <UrlReturn initStates={[sortKeyName]}>
        {(uProps) => {
          let sortBy = sort;
          if (!sortBy) {
            sortBy = uProps[sortKeyName];
          }
          return (
            <SortLink {...props} sort={sortBy} sortKeyName={sortKeyName} />
          );
        }}
      </UrlReturn>
    );
  }
}

export default SortBy;
