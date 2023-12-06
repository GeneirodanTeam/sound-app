import React, {memo, startTransition, useEffect, useState, useTransition} from "react";
import {Header} from "./modules/Header";
import {Main} from "./modules/Main";
import {Footer} from "./modules/Footer";

export const App = memo(() => {
    const [loading, setLoading] = useState(true)
    useEffect(() => startTransition(() => setLoading(false)), [])
    return (
        <div className="flex flex-col w-full h-[100vh] px-16 py-8 bg-myBlue-200 text-myYellow">
            {
                loading
                    ? <div>Loading</div>
                    : <>
                        <Header/>
                        <Main/>
                        <Footer/>
                    </>
            }
        </div>
    );
});
