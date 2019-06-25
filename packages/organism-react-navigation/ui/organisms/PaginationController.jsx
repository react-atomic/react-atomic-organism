import React, {PureComponent} from 'react'; 
import {SemanticUI} from 'react-atomic-molecule';

import Pagination from '../organisms/Pagination';
import paginationCalculator, {TOTAL, BEGIN, CURRENT_PAGE} from '../../src/paginationCalculator';

class PaginationController extends PureComponent {

  getPaginationData() {
    if (!this.cal) {
      this.cal = new paginationCalculator();
    }
    const cal = this.cal;
    const {pageListNumber, total, begin, currentPage} = this.props;
    cal.set(TOTAL, total);
    if (null != begin) {
      cal.set(BEGIN, begin);
    } else {
      cal.set(CURRENT_PAGE, currentPage);
    }
    return cal.genPageList(pageListNumber);
  }

  render() {
    const {onPageChange, pageListNumber, total, begin, currentPage, ...otherProps} = this.props;
    const data = this.getPaginationData();
    return (
      <SemanticUI {...otherProps}>
        <Pagination {...data} onPageChange={onPageChange} />
      </SemanticUI>
    );
  }
}

export default PaginationController;
