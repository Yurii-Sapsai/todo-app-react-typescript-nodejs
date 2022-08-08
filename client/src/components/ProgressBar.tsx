import { FC, useEffect, useState } from 'react';

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from 'styled-components';

import { useAppSelector } from '../store/hooks';
import { Task } from '../interfaces/Task';

const Wrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: '25px'
})

const ProgressBar: FC = () => {

    const store = useAppSelector((state) => state.tasks);
    const [percentageOfCompletedTasks, setPercentageOfCompletedTasks] = useState<number>(0);

    useEffect(() => {
        calculationOfComplitedTasks(store.tasks);
    }, [store.tasks])

    function calculationOfComplitedTasks(tasks: Task[]) {

        let amountTasks: number = tasks.length;
        let completedTasks: number = 0;

        tasks.forEach((task) => {
            if (task.status) completedTasks++
        })

        setPercentageOfCompletedTasks(Math.round(completedTasks / amountTasks * 100));
    }

    return (
        <Wrapper >
            <p style={{ fontSize: '14px', marginBottom: '10px' }}>  Completed tasks: </p>
            <div style={{ width: '100px', height: '100px' }}>
                <CircularProgressbar value={percentageOfCompletedTasks} text={`${percentageOfCompletedTasks | 0}%`} strokeWidth={5} />
            </div>
        </Wrapper >
    )
}

export default ProgressBar;