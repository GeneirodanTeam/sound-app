import React, { memo, startTransition, useEffect, useState } from "react";
import { Header } from "./modules/Header";
import { Main } from "./modules/Main";
import { Footer } from "./modules/Footer";
import { motion } from "framer-motion";

const loadingContainer = {
	width: "8rem",
	height: "8rem",
	display: "flex",
	justifyContent: "space-around",
};
const loadingCircle = {
	display: "block",
	width: "2rem",
	height: "2rem",
	borderRadius: "100%",
};
const firstCircle = {
	backgroundColor: "#DA4FC4",
};
const secondCircle = {
	backgroundColor: "#A72693",
};
const thirdCircle = {
	backgroundColor: "#7B146B",
};

const loadingContainerVariants = {
	start: {
		transition: {
			staggerChildren: 0.2,
		},
	},
	end: {
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const loadingCircleVariants = {
	start: {
		y: "0%",
	},
	end: {
		y: "60%",
	},
};
const loadingCircleTransition = {
	duration: 0.6,
	repeat: Infinity,
	repeatType: "reverse",
	ease: "easeInOut",
};

const Loader = () => {
	return (
		<div>
			<div className="fixed  w-full min-h-screen z-50 bg-black opacity-30" />
			<div className="flex fixed w-full justify-center items-center h-screen">
				<motion.div
					style={loadingContainer}
					variants={loadingContainerVariants}
					initial="start"
					animate="end"
				>
					<motion.span
						style={{ ...loadingCircle, ...firstCircle }}
						variants={loadingCircleVariants}
						transition={loadingCircleTransition}
					></motion.span>
					<motion.span
						style={{ ...loadingCircle, ...secondCircle }}
						variants={loadingCircleVariants}
						transition={loadingCircleTransition}
					></motion.span>
					<motion.span
						style={{ ...loadingCircle, ...thirdCircle }}
						variants={loadingCircleVariants}
						transition={loadingCircleTransition}
					></motion.span>
				</motion.div>
			</div>
		</div>
	);
};

export const App = memo(() => {
	const [loading, setLoading] = useState(true);
	const styles = "flex flex-col w-full h-[100vh] bg-myBlue-200 text-myYellow";
	useEffect(() => startTransition(() => setLoading(false)), []);
	return loading ? (
		<div className={styles}>
			<Loader />
		</div>
	) : (
		<div className={styles + " px-16 py-8"}>
			<Header />
			<Main />
			<Footer />
		</div>
	);
});
