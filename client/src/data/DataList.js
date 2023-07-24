

function DataList({ data }) {

    function renderData() {
        return data.map((data, i) => {
            return <li key={i}>{data.content}</li>
        })
    }

    return (
        <div>
            <div>
                <ul>
                    {renderData()}
                </ul>
            </div>
        </div>
    )
}

export default DataList