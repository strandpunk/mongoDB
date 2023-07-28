import axios from "axios"
import { useEffect, useState } from "react"



function User() {
    const [user, setUser] = useState()

    async function getUser() {
        const userList = await axios.get('http://localhost:5000/auth/info')
        setUser(userList.data)
        // console.log(userList)
        return (
            <div>{user}</div>
        )
    }

    useEffect(() => {
        getUser()
    }, [])

    // console.log(user)

    return (
        <div className='dataList-wrapper'>
            <div>
                <h1>User:</h1><br></br>
                {user}
            </div>
        </div>
    )
}
export default User