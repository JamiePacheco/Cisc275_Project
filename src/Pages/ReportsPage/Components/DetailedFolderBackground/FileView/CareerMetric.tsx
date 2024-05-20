import "./FileView.css"

export function CareerMetric({name, metric} : {name : string, metric : string}) {

    return (
        <div className = "CareerMetric">
            <p> {name} </p>
            <span> {metric} </span>
        </div>
    )


}