export default getDocTemplate;
/**
 * @param {object} params
 * @param {object} Styles
 * @param {boolean} merge
 * @returns {DocTemplate}
 */
declare function getDocTemplate(params: object, Styles?: object, merge?: boolean): ({ className, id, menu, right, footer, style, body, ...restProps }: {
    [x: string]: any;
    className?: string;
    id?: any;
    menu?: any;
    right?: any;
    footer?: any;
    style?: {};
    body: any;
}) => React.ReactElement | React.ReactElement[];
