export default HoverDimmerCardView;
declare class HoverDimmerCardView {
    constructor(props: any);
    state: {
        show: boolean;
    };
    handleHover: () => void;
    handleLeave: () => void;
    render(): any;
}
