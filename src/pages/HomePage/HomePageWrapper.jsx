import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ProgressBar from "../../components/Progressbar/ProgresBar";
import HomePage from "./HomePage";

const HomePageWrapper = () => {
	const { isLoggedIn, loading } = useSelector((state) => state.user);
	const [progress, setProgress] = useState(0);
	const intervalRef = useRef(null);

	// Simulate progress (you can replace this with actual data loading logic)
	useEffect(() => {
		intervalRef.current = setInterval(() => {
			setProgress((prevProgress) =>
				prevProgress < 85 ? prevProgress + 40 : 75
			);
		}, 1000);

		if (progress >= 75) clearInterval(intervalRef.current);

		if (!loading) setProgress(100);

		return () => clearInterval(intervalRef.current);
	}, [progress]);

	return (
		<div className="h-screen w-screen flex items-center justify-center bg-backgroundGradient shadow-md shadow-black">
			{loading ? (
				<div className="flex items-center flex-col justify-center rounded-[10px] h-auto min-w-[390px] bg-[white] p-4">
					<ProgressBar percentage={progress > 100 ? 100 : progress} />
					<div className="mt-4  text-[24px] text-[#353535]">
						Welcome to the{" "}
						<span className="font-semibold text-[#8a4ef9]">
							Tech Tales
						</span>
					</div>
				</div>
			) : (
				<HomePage />
			)}
		</div>
	);
};

export default HomePageWrapper;
