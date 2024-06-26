import axios from 'axios';
import './DataList.scss'
const moment = require('moment');

function DataList({ data, getData, isFriend }) {

    const handleDeleteConfirmation = (dataId) => {
        const result = window.confirm('Вы уверены, что хотите удалить данную запись?');
        if (result) {
            deleteData(dataId)
        } else {
            // Действие при отмене подтверждения
            console.log('Действие отменено');
        }
    };

    async function deleteData(dataId) {
        try {
            //console.log(dataId)
            await axios.get(`http://localhost:5000/data/${dataId}`);
            //window.location.reload(); ^_^
            getData()
        } catch (error) {
            console.log(error)
        }
    }

    function renderData() {
        const reversedData = data.slice().reverse(); // Создаем копию массива и переворачиваем его

        return reversedData.map((data, i) => {
            const formattedDate = moment(data.createdAt).format('DD-MMM-YYYY HH:mm'); // Форматируем дату в нужный нам вид
            // content-wrapper?
            return (
                <div key={i}>
                    <div className='content-wrapper'>
                        {/* {isFriend === true ? (<>
                        </>) : (<>
                            <button className='edit-button' onClick={() => handleEditConfirmation(data._id)}>E</button>
                        </>)} */}
                        <div className='data-wrapper'>{data.content} </div>
                        {isFriend === true ? (<>
                            <span className="data-close" ></span>
                        </>) : (<>
                            <span className="data-close" onClick={() => handleDeleteConfirmation(data._id)}>&times;</span>
                        </>)}

                    </div>
                    <div className='content-date'>{formattedDate}</div>
                </div>
            );
        });
    }

    return (
        // content-wrapper?
        <div className='dataList-wrapper'>
            <div>
                {isFriend === true ? (<>
                    <h1>Публикации пользователя</h1><br></br>
                </>) : (<>
                    <h1>Ваши публикации</h1><br></br>
                </>)}

                {renderData()}
            </div>
        </div>
    )
}

export default DataList