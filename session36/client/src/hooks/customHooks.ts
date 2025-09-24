import { useDispatch } from "react-redux";
import type { AppDispatch } from "../stores/store";
import type { RootState } from "../stores/store";
import { useSelector } from "react-redux";
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()