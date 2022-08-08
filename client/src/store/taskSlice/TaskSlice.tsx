import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { fetchTasksAPI } from './asyncAction';

import { Task } from '../../interfaces/Task';

type TasksState = {
    tasks: Task[],
    isLoading: Boolean,
    error: String
}

const initialState: TasksState = {
    tasks: [],
    isLoading: false,
    error: ''
}

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask(state, action: PayloadAction<Task>) {

            let newState = state.tasks
            newState.push(action.payload)
            state.tasks = newState
        },
        updateTaskStatus(state, action: PayloadAction<string>) {

            let newState = state.tasks;
            newState.map((item) => {
                if (item._id == action.payload) {
                    item.status = !item.status
                }
            })
            state.tasks = newState
        },
        updateTaskStatusFalse(state, action: PayloadAction<string>) {

            let newState = state.tasks;
            newState.map((item) => {
                if (item._id == action.payload) {
                    item.status = false
                }
            })
            state.tasks = newState
        },
        updateTask(state, action: PayloadAction<{ _id: string, newItem: string }>) {
            let newState = state.tasks;
            newState.map((item) => {
                if (item._id == action.payload._id) {
                    item.task = action.payload.newItem
                }
            })
            state.tasks = newState;
        },
        removeTask(state, action: PayloadAction<string>) {
            let newState = state.tasks.filter(item => item._id !== action.payload);
            state.tasks = newState;
        }
    },
    extraReducers: {
        [fetchTasksAPI.fulfilled.type]: (state, action: PayloadAction<Task[]>) => {
            state.isLoading = false;
            state.tasks = action.payload;
            state.error = '';
        },
        [fetchTasksAPI.pending.type]: (state) => {
            state.isLoading = true;

        },
        [fetchTasksAPI.rejected.type]: (state, action: PayloadAction<String>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
},
)

export const { addTask, updateTaskStatus, updateTaskStatusFalse, updateTask, removeTask } = taskSlice.actions;

export const selectItem = (state: RootState) => state.tasks;

export default taskSlice.reducer;


