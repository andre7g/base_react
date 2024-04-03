import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from 'store/store'


export const useCustomDispatch = useDispatch.withTypes<AppDispatch>()
export const useCustomSelector = useSelector.withTypes<RootState>()