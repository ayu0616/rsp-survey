import Stat from "components/stat/Stat";
import StatHand from "components/stat/StatHand";
import { STAT_LOCALSTORAGE_KEY } from "constants/stat";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { rspStatItem } from "types";
import sleep from "util/sleep";

const Home = () => {
    const [stat, setStat] = useState<rspStatItem[]>([]);
    useEffect(() => {
        const localRawData = localStorage.getItem(STAT_LOCALSTORAGE_KEY);
        localRawData ? setStat(JSON.parse(localRawData)) : "";
    }, []);

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
            <table className="stat-container">
                <Stat
                    title="総計"
                    count={stat.length}
                    totalCount={stat.length}
                ></Stat>
                {([0, 1, 2] as const).map((i) => (
                    <StatHand hand={i} key={i} stat={stat}></StatHand>
                ))}
            </table>
        </>
    );
};
export default Home;
