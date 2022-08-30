const CounterWidget = ({name, count, icon}) => {
    return <div className="widget col">
        <div className="flex-row row">
            <div className="col-6 text">
                <p>{name}:</p>
                <span>{count}</span>
            </div>
            <div className="col-6 icon">
                <i className={"fa "+icon}/>
            </div>
        </div>
    </div>
}

export default  CounterWidget