import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { signUp } from "../../../store/session";
import { useHistory } from "react-router-dom";
import "./SignupForm.css";
import { thunkCreateGoal } from "../../../store/goal";

function SignupFormModal() {
	const user = useSelector((state) => state.session?.user);
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();
	const dailyGoalData= {
		name: "dailyGoal",
		description: `This is ${user?.username}'s daily goal`,
		difficulty: "Easy",
		importance: "High",
		tags: "Daily_Goal",
		recurring_goal: true
	}
	const weeklyGoalData= {
		name: "weeklyGoal",
		description: `This is ${user?.username}'s weekly goal`,
		difficulty: "Easy",
		importance: "High",
		tags: "Weekly_Goal",
		recurring_goal: true
	}
	const monthlyGoalData= {
		name: "monthlyGoal",
		description: `This is ${user?.username}'s monthly goal`,
		difficulty: "Easy",
		importance: "High",
		tags: "Monthly_Goal",
		recurring_goal: true
	}
	const yearlyGoalData= {
		name: "yearlyGoal",
		description: `This is ${user?.username}'s yearly goal`,
		difficulty: "Easy",
		importance: "High",
		tags: "Yearly_Goal",
		recurring_goal: true
	}
	const history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, firstName, lastName, email, password));
			if (data) {
				setErrors(data);
			} else {
				history.push("/home")
				dispatch(thunkCreateGoal(dailyGoalData))
				.then(()=>dispatch(thunkCreateGoal(weeklyGoalData)))
				.then(()=>dispatch(thunkCreateGoal(monthlyGoalData))).
				then(()=>dispatch(thunkCreateGoal(yearlyGoalData)))

				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div id="signup-modal">
		<>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>
					Email *
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label>
					Username *
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label>
					Firstname *
					<input
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</label>
				<label>
					Lastname *
					<input
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</label>
				<label>
					Password *
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label>
					Confirm Password *
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button type="submit">Sign Up</button>
			</form>
		</>
		</div>
	);
}

export default SignupFormModal;
