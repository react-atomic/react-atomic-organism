export default FullScreenExample;
declare function FullScreenExample({ button, anchorLocator, updateUrl, resetUrl, children, id, onClose, path, ...restProps }: {
    [x: string]: any;
    button?: string;
    anchorLocator?: () => {
        lastAnchor: string;
    };
    updateUrl?: (id: any) => void;
    resetUrl?: (id: any) => void;
    children: any;
    id: any;
    onClose: any;
    path: any;
}): JSX.Element;
