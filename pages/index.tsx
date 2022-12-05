import HandOption from "components/handOption/HandOption";
import HandOptionWrapper from "components/handOption/HandOptionWrapper";
import ShowSelectWrapper from "components/showSelect/ShowSelectWrapper";
import { STAT_LOCALSTORAGE_KEY } from "constants/stat";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GenderNum, HandNum, rspStatItem } from "types";
import { genders, gendersJp } from "../constants/rsp";

export default function Home() {
    const [isSelected, setIsSelected] = useState([false, false, false]);
    const [order, setOrder] = useState(
        [0, 1, 2].sort(() => Math.random() - Math.random())
    );
    const reset = () => {
        setIsSelected([false, false, false]);
        setOrder((prev) => {
            const newOrder = [0, 1, 2];
            newOrder.sort(() => Math.random() - Math.random());
            while (
                prev[0] == newOrder[0] &&
                prev[1] == newOrder[1] &&
                prev[2] == newOrder[2]
            ) {
                newOrder.sort(() => Math.random() - Math.random());
            }
            return newOrder;
        });
        setGenderValue(undefined);
    };
    const [stat, setStat] = useState<rspStatItem[]>();

    const [genderValue, setGenderValue] = useState<GenderNum>();

    const [gameCount, setGameCount] = useState<1 | 2>(1);

    const [toSend, setToSend] = useState<rspStatItem>({
        timestamp: new Date(),
        hand1: 0,
        result1: 0,
        hand2: 0,
        result2: 0,
        gender: 0,
    });

    useEffect(() => {
        const localRawData = localStorage.getItem(STAT_LOCALSTORAGE_KEY);
        if (localRawData) {
            const localData = JSON.parse(localRawData);
            setStat(localData);
        } else {
            setStat([]);
        }
    }, []);

    const addStat = (item: rspStatItem) => {
        setStat((prev) => {
            const newStat = prev ? [...prev, item] : [item];
            localStorage.setItem(
                STAT_LOCALSTORAGE_KEY,
                JSON.stringify(newStat)
            );
            return newStat;
        });
    };

    const handOnClick = (value: number) => {
        const newIsSelected = new Array(3);
        for (let i = 0; i < 3; i++) {
            newIsSelected[i] = i == value;
        }
        setIsSelected(newIsSelected);
    };

    const submitFirst = (hand: HandNum, gender: GenderNum) => {
        setToSend((prev) => {
            prev.hand1 = hand;
            prev.gender = gender;
            prev.timestamp = new Date();
            return prev;
        });
    };

    const handGridItems = (order as HandNum[]).map((i) => {
        return (
            <HandOption
                hand={i}
                onClick={(e) => handOnClick(Number(e.currentTarget.value))}
                selected={isSelected[i]}
                key={i}
                disabled={genderValue == undefined}
            />
        );
    });

    return (
        <>
            <Head>
                <title>じゃんけんアンケート</title>
            </Head>

            <Link href="./" onClick={reset} className="title-link">
                <h1 className="title">じゃんけんアンケート</h1>
            </Link>

            <hr style={{ color: "lightgray" }} />

            <ShowSelectWrapper>
                {isSelected.includes(true) && genderValue != undefined ? (
                    <>
                        <h2>あなたが選択したのは</h2>
                        <HandOption
                            hand={isSelected.indexOf(true) as HandNum}
                        />
                        <div className="button-container">
                            <button
                                className="button button-cancel"
                                onClick={() => {
                                    setIsSelected([false, false, false]);
                                }}
                            >
                                キャンセル
                            </button>
                            <button
                                className="button button-submit"
                                disabled={!isSelected.includes(true)}
                                onClick={() => {
                                    const hand = isSelected.indexOf(
                                        true
                                    ) as HandNum;
                                    submitFirst(hand, genderValue);
                                }}
                            >
                                決定
                            </button>
                        </div>
                    </>
                ) : (
                    <div>
                        <h2>性別を選択してください</h2>
                        <div className="gender-form-wrapper">
                            {([0, 1, 2] as GenderNum[]).map((i) => {
                                return (
                                    <div className="gender-radio-wrapper">
                                        <input
                                            id={genders[i]}
                                            value={genders[i]}
                                            type="radio"
                                            name="gender"
                                            checked={i == genderValue}
                                            onChange={() => {
                                                setGenderValue(i);
                                            }}
                                        />
                                        <label
                                            htmlFor={genders[i]}
                                            className="radio-label"
                                        >
                                            {gendersJp[i]}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </ShowSelectWrapper>

            <HandOptionWrapper>{handGridItems}</HandOptionWrapper>
        </>
    );
}
