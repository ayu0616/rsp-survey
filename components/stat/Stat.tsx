const Stat = (props: { title: string; count: number; totalCount: number }) => {
    return (
        <div className="stat">
            <div className="stat-title">{props.title}</div>
            <div className="stat-count">{props.count}</div>
            <div className="stat-ratio">
                {(props.count / props.totalCount) * 100}%
            </div>
        </div>
    );
};
export default Stat;
