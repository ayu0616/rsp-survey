import { MouseEventHandler } from "react";
import { HandNum } from "types";

const hands = ["rock", "scissors", "paper"] as const;
const handsJp = ["グー", "チョキ", "パー"] as const;
const handEmojis = ["✊", "✌️", "🖐"] as const;

const HandOption = (props: {
    hand: HandNum;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    selected?: boolean;
    disabled?: boolean;
}) => {
    return (
        <button
            className={`grid-item${props.selected ? " selected" : ""}`}
            value={props.hand}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            <div className="hand-emoji">{handEmojis[props.hand]}</div>
            <div className="hand-name-jp">{handsJp[props.hand]}</div>
            <div className="hand-name">{hands[props.hand]}</div>
        </button>
    );
};

export default HandOption;
