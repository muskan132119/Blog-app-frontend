import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthPage from "./pages/AuthPage/AuthPage";
import SingleBlogPage from "./pages/SingleBlogPage/SingleBlogPage";
import BlogListPage from "./pages/BlogListPage/BlogListPage";
import HomePageWrapper from "./pages/HomePage/HomePageWrapper";

import { useDispatch, useSelector } from "react-redux";
import {
	setIsLoggedIn,
	setLoading,
	setNotifications,
	setUser,
} from "./redux/slice/user.slice";
import { setConversation } from "./redux/slice/conversation.slice";
import { getData } from "./services/getData.api";
import { USER_ROUTES } from "./utils/config";
import EditorPage from "./pages/EditorPage/EditorPage";

function App() {
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // Corrected destructuring
	const dispatch = useDispatch();

	const fetchInitiated = useRef(false);

	const fetchUserDetail = async () => {
		dispatch(setLoading(true));
		const [data, error] = await getData(USER_ROUTES.ME);
		dispatch(setLoading(false));

		if (data) {
			dispatch(setUser(data.user));
			dispatch(setIsLoggedIn(true));
			dispatch(setConversation(data.user.conversations));
			dispatch(setNotifications(data.user.invitesReceived));
		} else {
			dispatch(setUser({}));
			dispatch(setIsLoggedIn(false));

			console.log("Error: ", error);
		}
	};

	useEffect(() => {
		if (!fetchInitiated.current && !isLoggedIn) {
			fetchInitiated.current = true;
			fetchUserDetail();
		}
	}, [isLoggedIn]); // Adding `isLoggedIn` to dependencies ensures the effect runs when the login state changes

	return (
		<div>
			<Router>
				<Routes>
					<Route path="/" element={<HomePageWrapper />} />
					{/* auth routes  */}
					<Route path="/login" element={<AuthPage />} />
					<Route
						path="/register"
						element={<AuthPage registerPage={true} />}
					/>

					{/* blog routes  */}
					<Route path="/blogs" element={<BlogListPage />} />
					<Route path="/blog/:blogId" element={<SingleBlogPage />} />
					<Route path="/write-blog" element={<EditorPage />} />
				</Routes>
			</Router>
			<ToastContainer />
		</div>
	);
}

export default App;
