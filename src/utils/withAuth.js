import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const withAuth = (WrappedComponent) => {
	return (props) => {
		const { isLoggedIn, loading } = useSelector((state) => state.user);

		if (loading) {
			return <div>Loading...</div>;
		}

		if (!isLoggedIn) {
			return <Redirect to="/login" />;
		}

		return <WrappedComponent {...props} />;
	};
};

export default withAuth;
