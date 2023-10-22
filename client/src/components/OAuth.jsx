import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  signInSuccess,
} from "../redux/feature/userSlice";
const OAuth = () => {
  const dispatch = useDispatch();
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfoResponse = await axios.get(
          "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        const data = await userInfoResponse.data
       const postUserGoogle = await axios.post(`http://localhost:8080/api/v1/google`, {
        username : data.name,
        email : data.email,
        image : data.picture
       })
       dispatch(signInSuccess(postUserGoogle))
      } catch (err) {
        console.log(err)
      }
    },
  });
  return (
    <button
      className="bg-red-600 p-3 rounded-lg font-medium text-white hover:cursor-pointer uppercase hover:opacity-95"
      onClick={() => login()}
    >
      Continue with google 🚀
    </button>
  );
};

export default OAuth;
