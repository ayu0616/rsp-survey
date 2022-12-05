export type HandNum = 0 | 1 | 2;
export type GenderNum = 0 | 1 | 2;
export type ResultNum = 0 | 1 | 2;

export type rspStatItem = {
    timestamp: Date;
    hand1: HandNum;
    result1: ResultNum;
    hand2: HandNum;
    result2: ResultNum;
    gender: GenderNum;
};
