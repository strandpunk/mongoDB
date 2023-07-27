import './DataList.css'

function DataList({ data }) {

    function renderData() {
        return data.map((data, i) => {
            // content-wrapper?
            return <div key={i}>
                <div className='content-wrapper'>{data.content}</div>
                <div >{data.createdAt}</div>
            </div>
        })
    }

    return (
        // content-wrapper?
        <div className='dataList-wrapper'>
            <div>
                <h1>Content:</h1><br></br>
                {renderData()}
            </div>
        </div>
    )
}

export default DataList