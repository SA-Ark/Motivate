import EditGoalForm from "../Forms/EditGoalForm";
const EditGoalButton = () => {

    function showEditForm() {
        return(<EditGoalForm />)
    }

    return (
        <>
            <button onClick={showEditForm} type="button">Edit Goal</button>
        </>
    )
}

export default EditGoalButton;
