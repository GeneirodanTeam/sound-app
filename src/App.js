import React from "react";
import Header from "./modules/Header";
import Main from "./modules/Main";
import Footer from "./modules/Footer";

export const App = () => (
	<div className="flex flex-col w-full h-[100vh] px-16 py-8 bg-myBlue-200 text-myYellow">
		<Header />
		<Main />
		<Footer />
	</div>
);
