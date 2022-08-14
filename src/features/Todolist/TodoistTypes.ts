import {Status, TodoListFilter} from 'common/enums/projectEnums'

export type TodoListType = {
  id: string,
  addedDate: string,
  order: number,
  title: string
}
export type TodoListDomainType = TodoListType & {
  filter: TodoListFilter
  entityStatus: Status
}