import React, { FC, useRef, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import useDoubleClick from 'use-double-click';
import { useAppDispatch } from '../store/hooks';
import { updateTaskStatus, updateTaskStatusFalse, updateTask, removeTask } from '../store/taskSlice/TaskSlice';
import { BASE_URL } from '../const/URL';



type TaskItemProps = {
    task: string,
    status: boolean,
    _id: any
}

const Wrapper = styled.div({
    display: "flex",
    justifyContent: "space-between",
    marginBottom: '10px'
});

const Input = styled.input({
    height: "40px",
    width: '95%',
    fontSize: "18px",
    paddingLeft: "10px",
    border: 'none',
    borderLeft: '1px gray solid'
});

const Button = styled.button({
    height: "40px",
    width: "50px",
    fontSize: "18px",
    color: "white",
    background: "#DC143C",
    border: "1px solid #DC143C",
    cursor: 'pointer'
});

const inputStyle = {
    textDecorationLine: 'line-through',
    fontWeight: '700',
    color: "black"
}

const TaskItem: FC<TaskItemProps> = ({ task, status, _id }) => {

    const buttonRef = useRef<any>();
    const dispatch = useAppDispatch();

    const [disabled, setDisabled] = useState(true);

    const [newItem, setNewItem] = useState(task);
    const handleNewItem = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItem(e.target.value);
    }

    useDoubleClick({
        onSingleClick(e) {
            if (disabled) {
                (async () => {
                    try {
                        await axios.patch(`${BASE_URL}${_id}`, { status: !status })
                            .then(() => {
                                dispatch(updateTaskStatus(_id));
                            })
                    } catch (e) {
                        console.warn(e);
                    }
                })()
            }
        },
        onDoubleClick(e) {
            setDisabled(false)
            dispatch(updateTaskStatusFalse(_id))

        },
        ref: buttonRef,
        latency: 300
    });



    const updateItem = async (_id: string, newItem: string) => {
        if (newItem) {
            try {
                await axios.patch(`${BASE_URL}${_id}`, { task: newItem })
                    .then(() => {
                        dispatch(updateTask({ _id, newItem }));
                        setDisabled(true)
                    })
            } catch (e) {
                console.warn(e);
            }
        } else{
            removeItem(_id);
        }
    }



    const removeItem = async (_id: string) => {
        try {
            await axios.delete(`${BASE_URL}${_id}`)
                .then(() => {
                    dispatch(removeTask(_id));
                })
        } catch (e) {
            console.warn(e);
        }
    }


    return (
        <Wrapper>
            <div ref={buttonRef} style={{ width: '100%' }} >
                <Input
                    style={status ? inputStyle : { color: 'black' }}
                    type="text"
                    disabled={disabled}
                    value={newItem}
                    onChange={(e) => handleNewItem(e)}
                    onBlur={() => updateItem(_id, newItem)}
                    ref={ref => ref && ref.focus()}
                    onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                />
            </div>
            <Button onClick={() => removeItem(_id)}><DeleteForeverOutlinedIcon/></Button>
        </Wrapper>
    )
}

export default TaskItem;