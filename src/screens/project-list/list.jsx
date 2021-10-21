/*
 * @Description: 
 * @Author: changhong.wang
 * @Date: 2021-10-21 11:32:09
 * @LastEditors: changhong.wang
 * @LastEditTime: 2021-10-21 15:40:30
 */
export const List = ({ list, userList }) => {
    return <table>
        <thead>
            <tr>
                <th>名称</th>
                <th>负责人</th>
            </tr> 
        </thead>
        <tbody>
            {
                list.map(item => (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{userList.find(user => user.id === item.personId)?.name}</td>
                    </tr>
                ))
            }
        </tbody>
    </table>
}