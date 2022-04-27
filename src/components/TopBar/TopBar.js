const TopBar = ({setCloseMenu}) => {
    return <div className="top-bar">
        <div className="container-fluid">
            <div className="close-menu" onClick={() => setCloseMenu(prev => !prev)}>
                <i className="fa-solid fa-bars"/>
            </div>
        </div>
    </div>
}

export default TopBar;