import './DataList.css'

function DataList({ data }) {

    function renderData() {
        return data.map((data, i) => {
            // content-wrapper?
            return <div className='content-wrapper' key={i}>{data.content}</div>
        })
    }

    return (
        // content-wrapper?
        <div className='dataList-wrapper'>
            <div>
                <h1>Content:</h1><br></br>
                <ul>
                    {renderData()}
                </ul>
            </div>
        </div>
    )
}

export default DataList