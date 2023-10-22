import { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";
const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const navigate = useNavigate()
  const handleSignUp = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handlePostData = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/sign-up",
        formData,{
          headers : {
            "Content-Type" : "application/json",
            "Allow-access-control-origin" : "*"
          }
        }
      );
      const data = await res.data;
      if (data.status === false) {
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      setIsError(null);
      navigate("/sign-in")
    } catch (err) {
      setIsError(err.response.data);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="max-w-3xl mx-auto p-3">
      <h1 className="text-3xl font-bold text-center my-6">Sign up</h1>
      <form action="" className="flex flex-col gap-4" onSubmit={handlePostData}>
        <input
          type="text"
          className="p-3 border rounded-lg focus:outline-purple-600"
          placeholder="username"
          id="username"
          required
          onChange={handleSignUp}
        />
        <input
          type="email"
          className="p-3 border rounded-lg focus:outline-purple-600"
          placeholder="email"
          id="email"
          required
          onChange={handleSignUp}
        />
        <input
          type="password"
          className="p-3 border rounded-lg focus:outline-purple-600"
          placeholder="password"
          id="password"
          required
          onChange={handleSignUp}
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
            Sign up
          </button>
        )}
      </form>
      <div className="flex gap-2 mt-3">
        <p>Have account?</p>
        <Link to="/sign-in" className="text-blue-700">
          Sign in
        </Link>
      </div>
      {isError && <p>{isError.message}</p>}
    </div>
  );
};

export default SignUp;
