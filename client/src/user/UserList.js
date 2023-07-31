
function UserList({ user }) {

    function renderUser() {
        console.log(user)
        const userA = Array.from(user)
        console.log(userA)
        return userA.map(user => {

            // content-wrapper?
            return <div>
                <div>{user.name}</div>
                <div>{user.email}</div>
            </div>
        })
    }

    return (
        // content-wrapper?
        <div className='dataList-wrapper'>
            <div>
                <h1>User info:</h1><br></br>
                {renderUser()}
            </div>
        </div>
    )
}

export default UserList