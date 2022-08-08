import axios from 'axios';
import { Task } from '../../interfaces/Task';
import { BASE_URL } from '../../const/URL';

import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchTasksAPI = createAsyncThunk(
    'tasks/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<Task[]>(BASE_URL);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('error message');
        }
    }
)