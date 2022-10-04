export default getDocTemplate;
/**
 * @param {object} params
 * @param {object} Styles
 * @param {boolean} merge
 * @returns {DocTemplate}
 */
declare function getDocTemplate(params: object, Styles?: object, merge?: boolean): ({ className, id, menu, right, body, footer, style, ...restProps }: {
    [x: string]: any;
    className?: string;
    id?: any;
    menu: any;
    right: any;
    body: any;
    footer: any;
    style: any;
}) => React.ReactElement | React.ReactElement[];
