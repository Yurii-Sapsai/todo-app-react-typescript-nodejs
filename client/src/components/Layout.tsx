import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchTasksAPI } from '../store/taskSlice/asyncAction';

import TaskItem from './TaskItem';
import AddTask from './AddTask';
import ProgressBar from './ProgressBar';

const Wrapper = styled.div({
    background: 'white',
    minHeight: '500px',
    maxHeight: '100%',
    minWidth: '34%',
    borderRadius: '10px',
    padding: '25px',
    margin: '25px'
});

const Title = styled.h1({
    marginBottom: "25px"
});

const SearchInput = styled.input({
    width: "100%",
    height: "40px",
    paddingLeft: "10px",
    fontSize: "18px"
});

const Layout: FC = () => {

    const store = useAppSelector((state) => state.tasks);
    const dispatch = useAppDispatch();
    const [searchTask, setSearchTask] = useState<string>('');

    useEffect(() => {
        dispatch(fetchTasksAPI());
    }, []);

    const filteredTasks = store.tasks.filter((item) => {
        return item.task.toLowerCase().includes(searchTask.toLowerCase());
    });

    return (
        <Wrapper>
            <Title>Todo App</Title>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "25px" }}>
                <SearchInput type="text" placeholder='Search' onChange={(e) => setSearchTask(e.target.value)} />
                <ProgressBar />
            </div>

            {filteredTasks.map((item) => (
                <TaskItem task={item.task} status={item.status} _id={item._id} key={item._id} />
            ))}

            <br />
            
            <AddTask />
        </Wrapper>
    )
}

export default Layout;