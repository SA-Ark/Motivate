import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetBadgeById } from '../../store/badge';
import { thunkFetchGoalById } from '../../store/goal';
import { thunkFetchNoteByGoalId } from '../../store/goalNote';
import BadgeCard from '../Cards/BadgeCard';


function SingleBadge() {
    const singleBadge = useSelector(state=>state.badges?.badge)

    const dispatch = useDispatch()
    const {id} = useParams()


    useEffect(()=>{
    dispatch(thunkGetBadgeById(id))
    }, [dispatch, id])


    return (
    <div className="goal-page">
      <h1>{singleBadge?.name}</h1>

       <BadgeCard badge={singleBadge}/>

    </div>
  );
}

export default SingleBadge;
