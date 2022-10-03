export default getDocTemplate;
declare function getDocTemplate(params: any, Styles?: {}, merge?: boolean): ({ className, id, menu, right, body, footer, style, ...restProps }: {
    [x: string]: any;
    className?: string;
    id?: any;
    menu: any;
    right: any;
    body: any;
    footer: any;
    style: any;
}) => any;
