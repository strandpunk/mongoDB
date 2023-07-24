import DataForm from "./DataForm"
import DataList from "./DataList"
import axios from "axios"
import { useEffect, useState } from "react"



function Data() {
    const [data, setData] = useState([])

    async function getData() {
        const dataList = await axios.get('http://localhost:5000/data/')
        setData(dataList.data)
    }


    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <DataForm />
            <DataList data={data}/>
        </div>
    )
}
export default Data