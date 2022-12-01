import { handEmojis, hands, handsJp } from "constants/rsp";
import { MouseEventHandler } from "react";

export default (props: {
    hand: 0 | 1 | 2;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    selected?: boolean;
}) => {
    return (
        <button
            className={`grid-item${props.selected ? " selected" : ""}`}
            value={props.hand}
            onClick={props.onClick}
        >
            <div className="hand-emoji">{handEmojis[props.hand]}</div>
            <div className="hand-name-jp">{handsJp[props.hand]}</div>
            <div className="hand-name">{hands[props.hand]}</div>
        </button>
    );
};
