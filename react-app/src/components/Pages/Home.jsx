import React from 'react'
import {GoalCard} from '../Cards/GoalCard'

function Home(){
    return(
        <div className='headers'>
            <div className='dailies'>
               <h2> Daily Tasks </h2>
            </div>
            <div className='weeklies'>
                <h2> Weekly Tasks </h2>
            </div>
            <div className='monthlies'>
                <h2> Monthly Tasks </h2>
            </div>
            <div className='yearlies'>
                <h2> Yearly Tasks </h2>
            </div>
        </div>
    )
}

export default Home;
