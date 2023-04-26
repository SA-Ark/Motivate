import React from 'react'
import CurrentTasksForGoalCard from '../Cards/CurrentTasksForGoalCard';
import CreateRecurringTaskModal from '../Modals/CreateRecurringTaskModal';
import OpenModalButton from '../OpenModalButton';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { thunkFetchAllGoals } from '../../store/goal';
import { thunkFetchAllTasksByGoalId } from '../../store/task';
import { useHistory } from 'react-router-dom';

function Home(){
    const history = useHistory()
    const goals = useSelector((state)=> Object.values(state.goals?.goals))
    const dailyGoal = goals?.filter((goal)=> goal.name === "dailyGoal")[0]
    const weeklyGoal = goals?.filter((goal)=> goal.name === "weeklyGoal")[0]
    const monthlyGoal = goals?.filter((goal)=> goal.name === "monthlyGoal")[0]
    const yearlyGoal = goals?.filter((goal)=> goal.name === "yearlyGoal")[0]
    const tasks = useSelector((state)=> Object.values(state.tasks?.tasks))

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(thunkFetchAllGoals())
    }, [dispatch])

    console.log(dailyGoal?.id, weeklyGoal?.id, monthlyGoal?.id, yearlyGoal?.id)
    useEffect(() => {
        // Wait for goals to be fetched before dispatching task thunks
        if (goals?.length > 0) {
            dispatch(thunkFetchAllTasksByGoalId(dailyGoal?.id))
            dispatch(thunkFetchAllTasksByGoalId(weeklyGoal?.id))
            dispatch(thunkFetchAllTasksByGoalId(monthlyGoal?.id))
            dispatch(thunkFetchAllTasksByGoalId(yearlyGoal?.id))
        }
    }, [dailyGoal?.id, weeklyGoal?.id, monthlyGoal?.id, yearlyGoal?.id, dispatch])
    const dailyTasks = tasks?.filter((task)=> task.goal_id === dailyGoal?.id)
    const weeklyTasks = tasks?.filter((task)=> task.goal_id === weeklyGoal?.id)
    const monthlyTasks = tasks?.filter((task)=> task.goal_id === monthlyGoal?.id)
    const yearlyTasks = tasks?.filter((task)=> task.goal_id === yearlyGoal?.id)

    const currDate = new Date()
    const moment = require('moment-timezone');
    const currTimezone = moment.tz.guess();

    const currDailyTasks = dailyTasks?.filter((task)=> {
    let due_date = moment.tz(task.due_date, "ddd, DD MMM YYYY HH:mm:ss z", currTimezone);
    let milliseconds = due_date - currDate
    if (task.finished_on === null &&
        milliseconds < 86400000 && milliseconds > 0){
            return task
        }
}  )

    const currWeeklyTasks = weeklyTasks?.filter((task)=> {
    let due_date = moment.tz(task.due_date, "ddd, DD MMM YYYY HH:mm:ss z", currTimezone);
    let milliseconds = due_date - currDate

    if (task.finished_on === null &&
        milliseconds < 604800000 && milliseconds > 0){
            return task
        }
}  )

    const currMonthlyTasks = monthlyTasks?.filter((task)=> {
    let due_date = moment.tz(task.due_date, "ddd, DD MMM YYYY HH:mm:ss z", currTimezone);
    let milliseconds = due_date - currDate
    if (task.finished_on === null &&
        milliseconds < 2629746000 ){
            return task
        }
}  )

    const currYearlyTasks = yearlyTasks?.filter((task)=> {
    let due_date = moment.tz(task.due_date, "ddd, DD MMM YYYY HH:mm:ss z", currTimezone);
    let milliseconds = due_date - currDate
    if (task.finished_on === null &&
        milliseconds < 31556952000 ){
            return task
        }
}  )

    const missedDailyTasks =
    dailyTasks?.filter((task)=> {
    let due_date = moment.tz(task.due_date, "ddd, DD MMM YYYY HH:mm:ss z", currTimezone);
    let milliseconds = currDate - due_date
    if (task.finished_on === null &&
        milliseconds > 0){
            return task
        }})

    const missedWeeklyTasks =
    weeklyTasks?.filter((task)=> {
    let due_date = moment.tz(task.due_date, "ddd, DD MMM YYYY HH:mm:ss z", currTimezone);
    let milliseconds = currDate - due_date
    if (task.finished_on === null &&
        milliseconds > 0){
            return task
        }})

    const missedMonthlyTasks =
    monthlyTasks?.filter((task)=> {
    let due_date = moment.tz(task.due_date, "ddd, DD MMM YYYY HH:mm:ss z", currTimezone);
    let milliseconds = currDate - due_date
    if (task.finished_on === null &&
        milliseconds > 0){
            return task
        }})
    const missedYearlyTasks =
    yearlyTasks?.filter((task)=> {
    let due_date = moment.tz(task.due_date, "ddd, DD MMM YYYY HH:mm:ss z", currTimezone);
    let milliseconds = currDate - due_date
    if (task.finished_on === null &&
        milliseconds > 0){
            return task
        }})


    const finishedDailyTasks = dailyTasks?.filter((task)=>{
        let due_date = moment.tz(task.due_date, "ddd, DD MMM YYYY HH:mm:ss z", currTimezone);
         let milliseconds = due_date - currDate
        if (task.finished_on !== null
            && milliseconds < 86400000 ){
            return task
        }
    })

    const finishedWeeklyTasks = weeklyTasks?.filter((task)=>{
        let due_date = moment.tz(task.due_date, "ddd, DD MMM YYYY HH:mm:ss z", currTimezone);
        let milliseconds = due_date - currDate
        if (task.finished_on !== null
            && milliseconds < 604800000 ){
            return task
        }
    })

    const finishedMonthlyTasks = monthlyTasks?.filter((task)=>{
        let due_date = moment.tz(task.due_date, "ddd, DD MMM YYYY HH:mm:ss z", currTimezone);
        let milliseconds = due_date - currDate
        if (task.finished_on !== null
            && milliseconds < 2629746000 ){
            return task
        }
    })

    const finishedYearlyTasks = yearlyTasks?.filter((task)=>{
        let due_date = moment.tz(task.due_date, "ddd, DD MMM YYYY HH:mm:ss z", currTimezone);
        let milliseconds = due_date - currDate
        if (task.finished_on !== null
            && milliseconds < 31556952000 ){
            return task
        }
    })

    const seeFinishedDailyTasks = () => {
    history.push(`/goals/finishedtasks/${dailyGoal?.id}`)
    }
    const seeFinishedWeeklyTasks = () => {
    history.push(`/goals/finishedtasks/${weeklyGoal?.id}`)
    }
    const seeFinishedMonthlyTasks = () => {
    history.push(`/goals/finishedtasks/${monthlyGoal?.id}`)
    }
    const seeFinishedYearlyTasks = () => {
    history.push(`/goals/finishedtasks/${yearlyGoal?.id}`)
    }

    const seeRecentlyFinishedDailyTasks = () => {
    history.push(`/goals/recentlyfinished/${dailyGoal?.id}`)
    }

    const seeRecentlyFinishedWeeklyTasks = () => {
    history.push(`/goals/recentlyfinished/${weeklyGoal?.id}`)
    }

    const seeRecentlyFinishedMonthlyTasks = () => {
    history.push(`/goals/recentlyfinished/${monthlyGoal?.id}`)
    }

    const seeRecentlyFinishedYearlyTasks = () => {
    history.push(`/goals/recentlyfinished/${yearlyGoal?.id}`)
    }


    const seeUpcomingDailyTasks = () => {
    history.push(`/goals/upcoming/${dailyGoal?.id}/daily`)
    }

    const seeUpcomingWeeklyTasks = () => {
    history.push(`/goals/upcoming/${weeklyGoal?.id}/weekly`)
    }

    const seeUpcomingMonthlyTasks = () => {
    history.push(`/goals/upcoming/${monthlyGoal?.id}/monthly`)
    }

    const seeUpcomingYearlyTasks = () => {
    history.push(`/goals/upcoming/${yearlyGoal?.id}/yearly`)
    }

    return(
        <div className='headers'>
            <div className='dailies'>
               <h2> Daily Tasks </h2>
              <OpenModalButton
                buttonText="+"
                modalComponent={<CreateRecurringTaskModal goalId={dailyGoal?.id}/>}
              />
              {!currDailyTasks?.length ? <h3>No Current Daily Tasks Have Been Created Yet. Click on the "+" icon to add one.</h3>
           :< CurrentTasksForGoalCard tasks={currDailyTasks} />}
             <button onClick={seeFinishedDailyTasks}>All Finished Daily Tasks</button>
             <button onClick={seeRecentlyFinishedDailyTasks}> Current Finished Daily Tasks</button>
            <button onClick={seeUpcomingDailyTasks}> Upcoming Daily Tasks</button>
            </div>
            <div className='weeklies'>
                <h2> Weekly Tasks </h2>
               <OpenModalButton
                buttonText="+"
                modalComponent={<CreateRecurringTaskModal goalId={weeklyGoal?.id}/>}

               />
               {!currWeeklyTasks?.length ? <h3>No Current Weekly Tasks Have Been Created Yet. Click on the "+" icon to add one.</h3>
               :<CurrentTasksForGoalCard tasks={currWeeklyTasks} />}
                <button onClick={seeFinishedWeeklyTasks}>All Finished Weekly Tasks</button>
                <button onClick={seeRecentlyFinishedWeeklyTasks}> Current Finished Weekly Tasks</button>
                <button onClick={seeUpcomingWeeklyTasks}> Upcoming Weekly Tasks</button>
            </div>
            <div className='monthlies'>
                <h2> Monthly Tasks </h2>
               <OpenModalButton
                buttonText="+"
                modalComponent={<CreateRecurringTaskModal goalId={monthlyGoal?.id}/>}

               />
               {!currMonthlyTasks?.length ? <h3>No Current Monthly Tasks Have Been Created Yet. Click on the "+" icon to add one.</h3>
               :<CurrentTasksForGoalCard tasks={currMonthlyTasks} />}
            <button onClick={seeFinishedMonthlyTasks}>Finished Monthly Tasks</button>
            <button onClick={seeRecentlyFinishedMonthlyTasks}> Current Finished Monthly Tasks</button>
            <button onClick={seeUpcomingMonthlyTasks}> Upcoming Monthly Tasks</button>
            </div>
            <div className='yearlies'>
                <h2> Yearly Tasks </h2>
               <OpenModalButton
                buttonText="+"
                modalComponent={<CreateRecurringTaskModal goalId={yearlyGoal?.id}/>}

               />
               {!currYearlyTasks?.length ? <h3>No Current Yearly Tasks Have Been Created Yet. Click on the "+" icon to add one.</h3>
               :<CurrentTasksForGoalCard tasks={currYearlyTasks} />}
                <button onClick={seeFinishedYearlyTasks}>Finished Yearly Tasks</button>
                <button onClick={seeRecentlyFinishedYearlyTasks}> Current Finished Yearly Tasks</button>
                <button onClick={seeUpcomingYearlyTasks}> Upcoming Yearly Tasks</button>
            </div>
        </div>
    )
}

export default Home;
