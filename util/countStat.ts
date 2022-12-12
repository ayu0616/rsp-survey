import { HandNum, rspStatItem } from "types";

const countStat = (hand: HandNum, stat: rspStatItem[]) => {
    return stat.filter((item) => item.hand1 == hand).length;
};
export default countStat;
