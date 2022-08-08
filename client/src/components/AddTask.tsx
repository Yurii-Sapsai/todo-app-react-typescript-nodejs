import { FC } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/taskSlice/TaskSlice';
import { BASE_URL } from '../const/URL';



const Form = styled.form({
    display: "flex",
    justifyContent: "space-between"
});

const Input = styled.input({
    width: "75%",
    height: "40px",
    paddingLeft: "10px",
    fontSize: "18px"
});

const Button = styled.button({
    height: "45px",
    width: "100px",
    fontSize: "18px",
    color: "white",
    background: "#51bbdb",
    border: "1px solid #51bbdb",
    cursor: 'pointer'
});



const AddTask: FC = () => {

    const dispatch = useDispatch();



    const { register,
        handleSubmit,
        formState: {
            errors
        },
        reset
    } = useForm({ mode: 'onBlur' });


    
    const onSubmit = async (data: any) => {
        try {
            await axios.post(BASE_URL, { task: data.task })
                .then((res) => {
                    dispatch(addTask(res.data));
                })
            reset()
        } catch (e) {
            console.warn(e);
        }
    }

    return (
        <>
            {errors?.task?.message && <span style={{ color: 'red' }}>Maximum 255 characters available</span>}
            <br />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <>
                    <Input
                        {...register('task', {
                            required: true,
                            maxLength: {
                                value: 255,
                                message: 'Maximum 255 characters available'
                            }
                        })}
                        placeholder='Write your new task'
                    />

                </>
                <Button type='submit'>Add</Button>
            </Form>
        </>
    )
}

export default AddTask;