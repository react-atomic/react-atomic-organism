export default Hero;
declare function Hero(props: any): any;
declare namespace Hero {
    namespace defaultProps {
        export { SemanticUI as component };
    }
}
import { SemanticUI } from "react-atomic-molecule";
