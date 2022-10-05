export default useProgress;
declare function useProgress(propsDelay: any, propsPercent: any): {
    expose: {
        complete: () => void;
        reset: (thisPercent: any) => void;
        pause: () => void;
        start: (goToPercent: any, delay: any) => void;
    };
    opacity: number;
    percent: any;
};
