export default DDWrapper;
declare function DDWrapper(props: any): JSX.Element;
export function useDDWrapper(props: any): {
    handler: {
        drag: (e: any) => void;
        dragEnd: (e: any) => void;
    };
    absX: number;
    absY: number;
    startPoint: any;
    dnd: import("react").MutableRefObject<undefined>;
    comp: import("react").MutableRefObject<undefined>;
    isDraging: boolean;
};
