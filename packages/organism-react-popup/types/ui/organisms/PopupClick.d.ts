export default PopupClick;
declare class PopupClick {
    static defaultProps: {
        once: boolean;
    };
    handleClick: () => void;
    open(): void;
    close(): void;
    componentDidMount(): void;
    render(): any;
}
