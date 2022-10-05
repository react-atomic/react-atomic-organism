export default PageLoadProgressHandler;
export type PageLoadProgressProps = {
    name?: string;
    isFloat?: boolean;
    ajax?: boolean;
    isRunning?: boolean;
    delay?: number;
    zIndex?: number;
    barProps?: any;
    ref?: any;
};
/**
 * @type React.FC<PageLoadProgressProps>
 */
declare const PageLoadProgressHandler: React.FC<PageLoadProgressProps>;
