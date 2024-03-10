import './DataList.css'
const moment = require('moment');

function DataList({ data }) {

    function renderData() {
        return data.map((data, i) => {
            const formattedDate = moment(data.createdAt).format('DD-MMM-YYYY HH:mm'); // Форматируем дату в нужный нам вид
            // content-wrapper?
            return <div key={i}>
                <div className='content-wrapper'>{data.content}</div>
                <div className='content-date'>{formattedDate}</div>
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