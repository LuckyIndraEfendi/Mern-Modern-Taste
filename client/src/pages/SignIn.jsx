import { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";
import { useDispatch ,useSelector} from "react-redux";
import { signInStart,signInSuccess,signInFailure,signInClear } from "../redux/feature/userSlice";
const SignIn = () => {
  const [formData, setFormData] = useState({});
  const {isLoading,error} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSignIn = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handlePostData = async (e) => {
    e.preventDefault();
    dispatch(signInStart())
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/sign-in",
        formData,{
          headers : {
            "Content-Type" : "application/json",
          },
          withCredentials : true
        },
        
      );
      const data = await res.data;
      if (data.status === false) {
        return dispatch(signInFailure(data.response.data.message))
      }
      dispatch(signInSuccess(data))
      navigate("/")
    } catch (err) {
      dispatch(signInFailure(err.response.data.message));
    }finally{
      dispatch(signInClear())
    }
  };
  return (
    <div className="max-w-3xl mx-auto p-3">
      <h1 className="text-3xl font-bold text-center my-6">Sign In</h1>
      <form action="" className="flex flex-col gap-4" onSubmit={handlePostData}>
        <input
          type="email"
          className="p-3 border rounded-lg focus:outline-purple-600"
          placeholder="email"
          id="email"
          required
          onChange={handleSignIn}
        />
        <input
          type="password"
          className="p-3 border rounded-lg focus:outline-purple-600"
          placeholder="password"
          id="password"
          required
          onChange={handleSignIn}
        />
        {isLoading ? (
          <button
            disabled
            className="bg-slate-600 p-3 rounded-lg font-medium text-white hover:cursor-pointer uppercase hover:opacity-95"
          >
            Loading ...
          </button>
        ) : (
          <button className="bg-slate-700 p-3 rounded-lg font-medium text-white hover:cursor-pointer uppercase hover:opacity-95">
            Sign in
          </button>
        )}
      </form>
      <div className="flex gap-2 mt-3">
        <p>Don&apos;t have account?</p>
        <Link to="/sign-up" className="text-blue-700 underline">
          Sign up
        </Link>
      </div>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default SignIn;
