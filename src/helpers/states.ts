export enum ServiceState {
  starting = "starting",
  started = "started",
  stopping = "stopping",
  stopped = "stopped",
}

export enum SyncingState {
  notInitialized = "notInitialized",
  syncing = "syncing",
  syncDone = "syncDone",
  syncError = "syncError",
}

export function canChangeServiceState(fromState: ServiceState, toState: ServiceState): boolean {
  return !(fromState === toState)
}

export function canChangeSyncingState(fromState: SyncingState, toState: SyncingState): boolean {
  switch (fromState) {
    case SyncingState.notInitialized:
      switch (toState) {
        case SyncingState.syncing:
          return true
      }
    case SyncingState.syncing:
      switch (toState) {
        case SyncingState.syncDone:
          return true
        case SyncingState.syncError:
          return true
      }
  }
  return false
}
