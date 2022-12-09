import { ReactNode } from "react";

const ShowSelectWrapper = (props: { children: ReactNode }) => {
    return <div className="show-select-wrapper">{props.children}</div>;
};
export default ShowSelectWrapper;
