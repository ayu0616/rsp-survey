import { ReactNode } from "react";

const HandOptionWrapper = (props: { children: ReactNode }) => {
    return <div className="grid-wrapper">{props.children}</div>;
};
export default HandOptionWrapper;
