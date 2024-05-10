import "./MetricCard.css"

export function MetricCard({metricTitle, metric} : {metricTitle : string, metric : string | number}) : React.JSX.Element {

    return (
        <div className = "metric-card">
            <h5> {metricTitle} </h5>
            <h5> {metric} </h5>
        </div>
    )
}