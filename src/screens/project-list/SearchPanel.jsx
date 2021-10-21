export const SearchPanel = ({param, setParam, userList}) => {
    return <form>
        <input type="text" value={param.name} onChange={e => setParam({
            ...param,
            name: e.target.value
        })}/>
        <select value={param.personId} onChange={e => {
            console.log(e.target.value);
            setParam({
                ...param,
                personId: e.target.value
            })
        }}>
            <option value={''}>负责人</option>
            {
                userList.map(user => {
                    return <option key={user.id} value={user.id}>{user.name}</option>
                })
            }
        </select>
    </form>
}