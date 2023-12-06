import React, {memo} from "react";
import {LangChooser} from "./LangChooser";

export const Footer = memo(() => (
    <footer className="w-full xxl:h-10 h-8 flex justify-end">
        <LangChooser/>
    </footer>
));
