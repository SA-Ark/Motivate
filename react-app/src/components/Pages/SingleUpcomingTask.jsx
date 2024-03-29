import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkFetchTaskById } from '../../store/task';
import { thunkFetchNoteByTaskId } from '../../store/taskNote';
import TaskCard from '../Cards/TaskCard';
import CreateSubtaskModal from '../Modals/CreateSubtaskModal';
import OpenModalButton from '../OpenModalButton';
import SingleUpcomingTaskCard from '../Cards/SingleUpcomingTaskCard';
function SingleUpcomingTask() {
    const singleTask = useSelector(state=>state.tasks?.singleTask)
    const dispatch = useDispatch()
    const {id} = useParams()


    useEffect(()=>{
      dispatch(thunkFetchTaskById(id))
      dispatch(thunkFetchNoteByTaskId(id))


    }, [dispatch, id])





  return (
    <div className="goal-page">
      <div className="create-goal-button">
        <OpenModalButton
        buttonText="Create SubTask"
        modalComponent={
          <CreateSubtaskModal parentTask={singleTask} goalId={singleTask?.goal_id}/>}
          />
        </div>
      <h1>{singleTask?.name}</h1>

       <SingleUpcomingTaskCard task={singleTask} />

    </div>
  );
}

export default SingleUpcomingTask;
