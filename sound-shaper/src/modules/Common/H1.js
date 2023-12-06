import React, { memo } from "react";

export const H1 = memo(({ children }) => (
	<h1 className="w-full text-left text-2xl font-semibold xxl:mb-12 mb-8">
		{children}
	</h1>
));
