import {useCallback, useRef} from "react";
import {useDispatch} from "react-redux";
import {setFuncName} from "../store/funcName";

export const useTimerHover = name => {
    const timer = useRef(null);
    const dispatch = useDispatch();
    const onMouseEnter = useCallback(
        () => {
            timer.current = setTimeout(() => dispatch(setFuncName(name)), 500);
        },
        [dispatch, name]
    );
    const onMouseLeave = useCallback(
        () => timer.current && clearTimeout(timer.current),
        [timer]
    );
    return {onMouseEnter, onMouseLeave};
};