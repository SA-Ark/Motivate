import { useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../Modals/LoginFormModal";
import SignupFormModal from "../Modals/SignupFormModal";
import DemoUserButton from "../Buttons/DemoUserButton";
import { useSelector } from "react-redux";

function SplashButtons() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);


if (!sessionUser){


  return (
    <>
          <div className="login">
            <OpenModalButton
              buttonText="Log In"
              // onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <DemoUserButton/>
           </div>
           <div className="signup">
            <OpenModalButton
              buttonText="Sign Up"
              // onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </div>
    </>
  );
}else{
  return (null)
}
}

export default SplashButtons;
