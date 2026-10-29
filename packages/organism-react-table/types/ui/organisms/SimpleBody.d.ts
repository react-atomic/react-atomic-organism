import Cell from "../organisms/Cell";
declare const SimpleBody: ({ trComponent, rowCount, children, tbodyComponent, tdComponent, }: {
    children?: any;
    rowCount?: number;
    tbodyComponent?: string;
    tdComponent?: string;
    trComponent?: typeof Cell;
}) => import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>>;
export default SimpleBody;
