import { STAT_LOCALSTORAGE_KEY } from "constants/stat";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { rspStatItem } from "types";
import sleep from "util/sleep";

export default () => {
    const [stat, setStat] = useState<rspStatItem[]>([]);
    useEffect(() => {
        const localRawData = localStorage.getItem(STAT_LOCALSTORAGE_KEY);
        localRawData ? setStat(JSON.parse(localRawData)) : "";
    }, []);

    const count = (hand: 0 | 1 | 2) => {
        return stat.filter((item) => item.hand == hand).length;
    };

    return (
        <>
            <Head>
                <title>じゃんけんアンケート（統計）</title>
            </Head>

            <Link href="./" className="title-link">
                <h1 className="title">
                    じゃんけんアンケート <span>（統計）</span>
                </h1>
            </Link>

            <hr style={{ color: "lightgray" }} />

            <button
                onClick={async () => {
                    if (confirm("本当に消去しますか？")) {
                        await sleep(2000);
                        if (confirm("本当に消去しますか？？")) {
                            localStorage.removeItem(STAT_LOCALSTORAGE_KEY);
                        }
                    }
                }}
            >
                統計データを消去
            </button>
            <div>
                <div>
                    <div>総計</div>
                    <div>{stat.length}</div>
                </div>
                <div>
                    <div>グー</div>
                    <div>{count(0)}</div>
                </div>
                <div>
                    <div>チョキ</div>
                    <div>{count(1)}</div>
                </div>
                <div>
                    <div>パー</div>
                    <div>{count(2)}</div>
                </div>
            </div>
        </>
    );
};
