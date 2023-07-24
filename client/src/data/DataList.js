import './DataList.css'

function DataList({ data }) {

    function renderData() {
        return data.map((data, i) => {
            return <li key={i}>{data.content}</li>
        })
    }

    return (
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