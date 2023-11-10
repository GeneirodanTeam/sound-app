import React from "react";
import Properties from "./Properties";
import Displacement from "./Displacement";
import Description from "./Description";

function Main() {
	return (
		<main className="w-full flex-1 flex pt-8 xxl:pb-8 pb-4 [&>*]:py-8 xxl:[&>*]:px-12 [&>*]:px-8">
			<Properties />
			<Displacement />
			<Description />
		</main>
	);
}

export default Main;
