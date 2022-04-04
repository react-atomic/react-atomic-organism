import { PureComponent } from "react";
import { SemanticUI } from "react-atomic-molecule";
import { toInt } from "to-percent-js";
import get from "get-object-value";

import Pagination from "../organisms/Pagination";
import paginationCalculator, {
  TOTAL,
  BEGIN,
  CURRENT_PAGE,
  PER_PAGE_NUM,
} from "../../src/paginationCalculator";

class PaginationController extends PureComponent {
  static defaultProps = { perPageNum: 10 };

  getPaginationData() {
    if (!this.cal) {
      this.cal = new paginationCalculator();
    }
    const cal = this.cal;
    const { pageListNumber, total, begin, currentPage, perPageNum } =
      this.props;
    cal.set(TOTAL, toInt(total));
    if (null != perPageNum) {
      cal.set(PER_PAGE_NUM, toInt(perPageNum));
    }

    if (null != begin) {
      cal.set(BEGIN, toInt(begin));
    } else {
      cal.set(BEGIN, null); // when "type = page" need reset begin
      cal.set(CURRENT_PAGE, toInt(currentPage));
    }
    return cal.genPageList(toInt(pageListNumber));
  }

  render() {
    const {
      hideOnlyOne,
      pageProps,
      currentPageProps,
      onPageChange,
      pageListNumber,
      total,
      begin,
      currentPage,
      perPageNum,
      ui,
      ...otherProps
    } = this.props;
    const data = this.getPaginationData();
    if (hideOnlyOne) {
      const liLen = get(data.list, ["length"], 0);
      if (liLen < 2) {
        return null;
      }
    }
    return (
      <SemanticUI {...otherProps} ui={ui}>
        <Pagination
          {...data}
          onPageChange={onPageChange}
          ui={ui}
          pageProps={pageProps}
          currentPageProps={currentPageProps}
        />
      </SemanticUI>
    );
  }
}

export default PaginationController;
