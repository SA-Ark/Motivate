import EditGoalModal from "../Forms/EditGoalModal";
const EditGoalButton = () => {

    function showEditForm() {
        return (<EditGoalModal />)
    }

    return (
        <>
            <button onClick={showEditForm} type="button">Edit Goal</button>
        </>
    )
}

export default EditGoalButton;
