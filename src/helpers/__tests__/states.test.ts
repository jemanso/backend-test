import { canChangeServiceState, canChangeSyncingState, ServiceState, SyncingState } from "../states"

describe("States", () => {
  describe("Service State", () => {
    test("allow change from stopped to starting", () => {
      expect(canChangeServiceState(ServiceState.stopped, ServiceState.starting)).toEqual(true)
    })
    test("allow change from starting to started", () => {
      expect(canChangeServiceState(ServiceState.stopped, ServiceState.starting)).toEqual(true)
    })
    test("disallow change from stopped to stopped", () => {
      expect(canChangeServiceState(ServiceState.stopped, ServiceState.stopped)).toEqual(false)
    })
  })

  describe("Syncing State", () => {
    test("allow change from notInitialized to syncing", () => {
      expect(canChangeSyncingState(SyncingState.notInitialized, SyncingState.syncing)).toEqual(true)
    })
    test("allow change from syncing to syncDone", () => {
      expect(canChangeSyncingState(SyncingState.syncing, SyncingState.syncDone)).toEqual(true)
    })
    test("allow change from syncing to syncError", () => {
      expect(canChangeSyncingState(SyncingState.syncing, SyncingState.syncError)).toEqual(true)
    })
    test("disallow change from syncing to syncing", () => {
      expect(canChangeSyncingState(SyncingState.syncing, SyncingState.syncing)).toEqual(false)
    })
    test("disallow change from syncDone to syncError", () => {
      expect(canChangeSyncingState(SyncingState.syncDone, SyncingState.syncError)).toEqual(false)
    })
  })
})
