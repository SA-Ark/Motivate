import React, { useState } from 'react'
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
    const allTasks = useSelector((state)=> Object.values(state.tasks?.tasks))
    let [tasks, setTasks] = useState(allTasks)

    const searchTerm = useSelector(state => state.search?.searchTerm)?.toLowerCase()
    const dispatch = useDispatch()

    const currDate = new Date()
    const moment = require('moment-timezone');
    const currTimezone = moment.tz.guess();


    let dailyTasks
    let weeklyTasks
    let monthlyTasks
    let yearlyTasks

    let currDailyTasks
    let currWeeklyTasks
    let currMonthlyTasks
    let currYearlyTasks


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

    useEffect(()=>{
        if (searchTerm){
            setTasks(allTasks.filter((task) => task.name.toLowerCase().includes(searchTerm)
            || task.description.toLowerCase().includes(searchTerm)))
        } else {
            setTasks(allTasks)
        }
        console.log(tasks, "tasks, useEffect")
    }, [searchTerm])


        if(allTasks && !searchTerm
            && JSON.stringify(tasks) !== JSON.stringify(allTasks)){
            setTasks(allTasks)
        }


    dailyTasks = tasks?.filter((task)=> task.goal_id === dailyGoal?.id)
    weeklyTasks = tasks?.filter((task)=> task.goal_id === weeklyGoal?.id)
    monthlyTasks = tasks?.filter((task)=> task.goal_id === monthlyGoal?.id)
    yearlyTasks = tasks?.filter((task)=> task.goal_id === yearlyGoal?.id)



    currDailyTasks = dailyTasks?.filter((task)=> {
    let due_date = moment.tz(task.due_date, "ddd, DD MMM YYYY HH:mm:ss z", currTimezone);
    let milliseconds = due_date - currDate
    if (task.finished_on === null &&
        milliseconds < 86400000 && milliseconds > 0){
            return task
        }
}  )

    currWeeklyTasks = weeklyTasks?.filter((task)=> {
    let due_date = moment.tz(task.due_date, "ddd, DD MMM YYYY HH:mm:ss z", currTimezone);
    let milliseconds = due_date - currDate

    if (task.finished_on === null &&
        milliseconds < 604800000 && milliseconds > 0){
            return task
        }
}  )

    currMonthlyTasks = monthlyTasks?.filter((task)=> {
    let due_date = moment.tz(task.due_date, "ddd, DD MMM YYYY HH:mm:ss z", currTimezone);
    let milliseconds = due_date - currDate
    if (task.finished_on === null &&
        milliseconds < 2629746000 ){
            return task
        }
}  )

    currYearlyTasks = yearlyTasks?.filter((task)=> {
    let due_date = moment.tz(task.due_date, "ddd, DD MMM YYYY HH:mm:ss z", currTimezone);
    let milliseconds = due_date - currDate
    if (task.finished_on === null &&
        milliseconds < 31556952000 ){
            return task
        }
}  )



    // const missedDailyTasks =
    // dailyTasks?.filter((task)=> {
    // let due_date = moment.tz(task.due_date, "ddd, DD MMM YYYY HH:mm:ss z", currTimezone);
    // let milliseconds = currDate - due_date
    // if (task.finished_on === null &&
    //     milliseconds > 0){
    //         return task
    //     }})

    // const missedWeeklyTasks =
    // weeklyTasks?.filter((task)=> {
    // let due_date = moment.tz(task.due_date, "ddd, DD MMM YYYY HH:mm:ss z", currTimezone);
    // let milliseconds = currDate - due_date
    // if (task.finished_on === null &&
    //     milliseconds > 0){
    //         return task
    //     }})

    // const missedMonthlyTasks =
    // monthlyTasks?.filter((task)=> {
    // let due_date = moment.tz(task.due_date, "ddd, DD MMM YYYY HH:mm:ss z", currTimezone);
    // let milliseconds = currDate - due_date
    // if (task.finished_on === null &&
    //     milliseconds > 0){
    //         return task
    //     }})
    // const missedYearlyTasks =
    // yearlyTasks?.filter((task)=> {
    // let due_date = moment.tz(task.due_date, "ddd, DD MMM YYYY HH:mm:ss z", currTimezone);
    // let milliseconds = currDate - due_date
    // if (task.finished_on === null &&
    //     milliseconds > 0){
    //         return task
    //     }})



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
    history.push(`/goals/currentlyfinished/${dailyGoal?.id}`)
    }

    const seeRecentlyFinishedWeeklyTasks = () => {
    history.push(`/goals/currentlyfinished/${weeklyGoal?.id}`)
    }

    const seeRecentlyFinishedMonthlyTasks = () => {
    history.push(`/goals/currentlyfinished/${monthlyGoal?.id}`)
    }

    const seeRecentlyFinishedYearlyTasks = () => {
    history.push(`/goals/currentlyfinished/${yearlyGoal?.id}`)
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
            <div id='dailies'>
               <h2> Daily Tasks </h2>
               <div id='daily-goal-container'>
              <OpenModalButton
                buttonText="+"
                modalComponent={<CreateRecurringTaskModal goalId={dailyGoal?.id}/>}
              />
              <div id="daily-buttons-container">
             <button className="home-buttons" onClick={seeFinishedDailyTasks}>All Finished Daily Tasks</button>
             <button className="home-buttons" onClick={seeRecentlyFinishedDailyTasks}> Current Finished Daily Tasks</button>
            <button className="home-buttons" onClick={seeUpcomingDailyTasks}> Upcoming Daily Tasks</button>
            </div>
            </div>
              {!currDailyTasks?.length ? <h3>No Current Daily Tasks Have Been Created Yet. Click on the "+" icon to add one.</h3>
           :< CurrentTasksForGoalCard tasks={currDailyTasks} />}
            </div>
            <div id='weeklies'>
                <h2> Weekly Tasks </h2>
                <div id='weekly-goal-container'>
               <OpenModalButton
                buttonText="+"
                modalComponent={<CreateRecurringTaskModal goalId={weeklyGoal?.id}/>}

               />
               <div id="weekly-buttons-container">
                <button className="home-buttons" onClick={seeFinishedWeeklyTasks}>All Finished Weekly Tasks</button>
                <button className="home-buttons" onClick={seeRecentlyFinishedWeeklyTasks}> Current Finished Weekly Tasks</button>
                <button className="home-buttons" onClick={seeUpcomingWeeklyTasks}> Upcoming Weekly Tasks</button>
                </div>
                </div>
               {!currWeeklyTasks?.length ? <h3>No Current Weekly Tasks Have Been Created Yet. Click on the "+" icon to add one.</h3>
               :<CurrentTasksForGoalCard tasks={currWeeklyTasks} />}
            </div>
            <div id='monthlies'>
                <h2> Monthly Tasks </h2>
                <div id='monthly-goal-container'>
               <OpenModalButton
                buttonText="+"
                modalComponent={<CreateRecurringTaskModal goalId={monthlyGoal?.id}/>}

               />
               <div id="monthly-buttons-container">
            <button className="home-buttons" onClick={seeFinishedMonthlyTasks}>Finished Monthly Tasks</button>
            <button className="home-buttons" onClick={seeRecentlyFinishedMonthlyTasks}> Current Finished Monthly Tasks</button>
            <button className="home-buttons" onClick={seeUpcomingMonthlyTasks}> Upcoming Monthly Tasks</button>
            </div>
            </div>
               {!currMonthlyTasks?.length ? <h3>No Current Monthly Tasks Have Been Created Yet. Click on the "+" icon to add one.</h3>
               :<CurrentTasksForGoalCard tasks={currMonthlyTasks} />}
            </div>
            <div id='yearlies'>
                <h2> Yearly Tasks </h2>
                <div id='yearly-goal-container'>
               <OpenModalButton
                buttonText="+"
                modalComponent={<CreateRecurringTaskModal goalId={yearlyGoal?.id}/>}

               />
               <div id="yearly-buttons-container">
                <button className="home-buttons" onClick={seeFinishedYearlyTasks}>Finished Yearly Tasks</button>
                <button className="home-buttons" onClick={seeRecentlyFinishedYearlyTasks}> Current Finished Yearly Tasks</button>
                <button className="home-buttons" onClick={seeUpcomingYearlyTasks}> Upcoming Yearly Tasks</button>
                </div>
                </div>
               {!currYearlyTasks?.length ? <h3>No Current Yearly Tasks Have Been Created Yet. Click on the "+" icon to add one.</h3>
               :<CurrentTasksForGoalCard tasks={currYearlyTasks} />}
            </div>
        </div>
    )
}

export default Home;
