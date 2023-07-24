import axios from "axios"
import { useState } from "react"
import './DataForm.css'

function DataForm({getData}) {

    const [data, setData] = useState('')

    async function saveData(e) {
        e.preventDefault()
        
        try {
            const Data = {
                content: data
            }
            await axios.post('http://localhost:5000/data/', Data)
            getData()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="dataForm-wrapper">
            <form onSubmit={saveData}>
                <input onChange={(e) => setData(e.target.value)} value={data} name='data' type='text' placeholder='Enter your data....' />
                <button type="submit" className="registerbtn">POST</button>
            </form>
        </div>
    )
}

export default DataForm