import './DataList.css'

function DataList({ data }) {

    function renderData() {
        return data.map((data, i) => {
            // content-wrapper?
            return <div key={i}>
                <div className='content-wrapper'>{data.content}</div>
                <div className='content-date'>{data.createdAt}</div>
            </div>
        })
    }

    return (
        // content-wrapper?
        <div className='dataList-wrapper'>
            <div>
                <h1>Записи:</h1><br></br>
                {renderData()}
            </div>
        </div>
    )
}

export default DataList