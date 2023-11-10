import React from "react";
import H1 from "./H1";

function Description() {
	return (
		<div className="flex-1 h-full bg-myBlue-100 rounded-2xl">
			<H1 title={"Description"} />
			<div>
				<p className="text-2xl leading-8 mb-4">
					<p className="font-semibold text-myPurple-100 inline">
						FUNCTION
					</p>
					&nbsp;- description of the function description of the
					function description of the function
				</p>
				<p className="text-2xl leading-8 mb-4">
					<p className="font-semibold text-myPurple-100 inline">
						FUNCTION
					</p>
					&nbsp;- description of the function description of the
					function description of the function
				</p>
				<p className="text-2xl leading-8 mb-4">
					<p className="font-semibold text-myPurple-100 inline">
						FUNCTION
					</p>
					&nbsp;- description of the function description of the
					function description of the function
				</p>
			</div>
		</div>
	);
}

export default Description;
