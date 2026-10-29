declare const getLastHash: () => {
    lastAnchor: string;
};
declare const defaultUpdateUrl: (id: any) => void;
declare const defaultResetUrl: (id: any) => void;
declare const FullScreenExample: ({ button, anchorLocator, updateUrl, resetUrl, children, id, onClose, path, ...restProps }: {
    [x: string]: any;
    anchorLocator?: typeof getLastHash;
    button?: string;
    children: any;
    id: any;
    onClose: any;
    path: any;
    resetUrl?: typeof defaultResetUrl;
    updateUrl?: typeof defaultUpdateUrl;
}) => import("react").JSX.Element;
export default FullScreenExample;
