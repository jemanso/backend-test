export enum ServiceState {
  stopped,
  starting,
  started,
}

export enum SyncingState {
  notInitialized,
  syncing,
  syncDone,
  syncError,
}

export * from "./tickets.service"
