import axios from "axios";
import { BASE_URL } from "../const/URL";



export const sendTaskAPI = async (data: { task: string }) => {
    return await axios.post(BASE_URL, { task: data.task });
}

export const updateTaskStatusAPI = async (_id: string, status: boolean) => {
    return await axios.patch(`${BASE_URL}${_id}`, { status: !status });
}

export const updateTaskAPI = async (_id: string, task: string) => {
    return await axios.patch(`${BASE_URL}${_id}`, { task: task });
}

export const removeTaskAPI = async (_id: string) => {
    return await axios.delete(`${BASE_URL}${_id}`);
}