import React from "react";
import Properties from "./Properties";
import Displacement from "./Displacement";
import Description from "./Description";

function Main() {
	return (
		<main className="w-full flex-1 flex py-8 [&>*]:py-8 [&>*]:px-12">
			<Properties />
			<Displacement />
			<Description />
		</main>
	);
}

export default Main;
