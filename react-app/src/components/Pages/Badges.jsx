import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllBadges } from '../../store/badge';
import CreateGoalModal from '../Modals/CreateGoalModal';
import BadgesCard from '../Cards/BadgesCard';
import OpenModalButton from '../OpenModalButton';

function Badges() {
    const badges = useSelector(state=>Object.values(state.badges?.badges))
    const dispatch = useDispatch()

    useEffect(()=>{
      dispatch(thunkGetAllBadges())


    }, [dispatch, badges.length])


  return (
    <div className="all-goals-page">
      <div className="create-goal-button">
        <OpenModalButton
        buttonText="Create New Goal"
        modalComponent={
          <CreateGoalModal />}
          />
        </div>
          <h1 className="all-goal-title">Badges</h1>
     <BadgesCard badges={badges}/>

    </div>
  );
}

export default Badges;
