import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllBadges } from '../../store/badge';
import CreateGoalModal from '../Modals/CreateGoalModal';
import BadgesCard from '../Cards/BadgesCard';
import OpenModalButton from '../OpenModalButton';

function Badges() {
    const badges = useSelector(state=>Object.values(state.badges?.badges))
    const dispatch = useDispatch()
    const searchTerm = useSelector(state=> state.search?.searchTerm)?.toLowerCase()
    let [b2, setB2] = useState(badges)

  if (badges && !searchTerm &&
     JSON.stringify(b2) !== JSON.stringify(badges)){
    setB2(badges)
  }


    useEffect(()=>{
      dispatch(thunkGetAllBadges())
      .then(()=>{

        if (searchTerm){

          setB2(badges.filter((badge)=>badge.name.toLowerCase().includes(searchTerm) || badge.description.toLowerCase().includes(searchTerm) ))
         
        }else{

          setB2(badges)
        }
      })



    }, [dispatch, searchTerm])


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
          {!badges?.length && <h3>No Badges Yet. Complete a goal to earn a badge.</h3>}
          {(badges?.length && !b2?.length)? <h3>No Badges Match Search Criteria.</h3> : null}
     <BadgesCard badges={b2}/>

    </div>
  );
}

export default Badges;
