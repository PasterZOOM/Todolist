export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4
}

export enum TodoListFilter {
  ALL = 0,
  ACTIVE = 1,
  COMPLETED = 2
}

export enum Status {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed'
}