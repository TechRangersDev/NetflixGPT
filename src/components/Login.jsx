import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  
  const handleButtonClick = (e) => {
    e.preventDefault();
    // Validate the form data
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    // Create a new user / Login user
    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          console.log('user', user);
          updateProfile(user, {
            displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/56499628?v=4"
          }).then(() => {
            // Profile updated!
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
            navigate("/browse");
          }).catch((error) => {
            // An error occurred
            setErrorMessage(error.message);
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode+"-"+errorMessage);
        });
    }
  }

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/638e9299-0637-42d1-ba39-54ade4cf2bf6/web/IN-en-20250203-TRIFECTA-perspective_46eb8857-face-4ea6-b901-dbf22b461369_large.jpg"
          alt="main bg"
        />
      </div>
      <form className="w-96 absolute p-12 bg-black/80 my-36 mx-auto right-0 left-0 text-white rounded-lg">
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            ref={name}
            placeholder="Full Name"
            className="p-4 my-4 bg-gray-700 w-full rounded-md"
            required
          />
        )}
        
        <input
          type="text"
          ref={email}
          placeholder="Email Address"
          className="p-4 my-4 bg-gray-700 w-full rounded-md"
        />
        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="p-4 my-4 bg-gray-700 w-full rounded-md"
        />
        <p className="text-red-500 font-bold py-2 text-lg">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg cursor-pointer"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign in Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
