import { useState, useEffect } from 'react';
import qs from 'querystring';
import { List } from './list';
import { SearchPanel } from './SearchPanel';
import { cleanObject, useMount } from '../../utils';

const apiUrl = process.env.REACT_APP_API_URL;

const ProjectListScreen = () => {

    const [userList, setUserList] = useState([]);
    const [list, setList] = useState([]);
    const [param, setParam] = useState({
        name: '',
        personId: ''
    });
    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async (res) => {
            if (res.ok) {
                setList(await res.json());
            }
        })
    }, [param]);
    useMount(() => {
        fetch(`${apiUrl}/users`).then(async (res) => {
            if (res.ok) {
                setUserList(await res.json());
            }
        })
    })

    return <div>
        <SearchPanel param={param} setParam={setParam} userList={userList}/>
        <List list={list} userList={userList}/>
    </div>
}

export default ProjectListScreen;