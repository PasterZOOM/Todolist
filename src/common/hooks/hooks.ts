import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {ActionCreatorsMapObject, bindActionCreators} from 'redux'
import {useMemo} from 'react'
import {AppRootStateType} from 'features/Application/AppTypes'

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
  const dispatch = useDispatch()

  return useMemo(() => {
    return bindActionCreators(actions, dispatch)
  }, [actions, dispatch])
}