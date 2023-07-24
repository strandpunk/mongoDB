import axios from "axios"
import { useState } from "react"

function DataForm() {

    const [data, setData] = useState('')

    async function saveData(e) {
        e.preventDefault()
        
        try {
            const Data = {
                content: data
            }
            await axios.post('http://localhost:5000/data/', Data)
            
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <form onSubmit={saveData}>
                <input onChange={(e) => setData(e.target.value)} value={data} name='data' type='text' placeholder='Enter your data....' />
                <button type="submit">Enter Data</button>
            </form>
        </div>
    )
}

export default DataForm