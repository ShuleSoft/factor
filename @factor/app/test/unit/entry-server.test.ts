import * as app from "@factor/app/app"
import * as events from "@factor/tools/events"
import * as filters from "@factor/tools/filters"
import serverEntry from "@factor/app/entry-server"

import Vue from "vue"
const spies = {
  createApp: jest.spyOn(app, "createApp"),
  emitEvent: jest.spyOn(events, "emitEvent"),
  runCallbacks: jest.spyOn(filters, "runCallbacks"),
  applyFilters: jest.spyOn(filters, "applyFilters")
}
describe("server-entry", () => {
  beforeAll(() => {})

  it("enters application and returns correctly", async () => {
    const app = await serverEntry({ url: "/" })

    expect(app instanceof Vue).toBe(true)
  })

  it("adds context filters and appropriate hooks", () => {
    expect(spies.applyFilters).toHaveBeenCalledWith(
      "ssr-context-init",
      expect.any(Object),
      expect.any(Object)
    )
    expect(spies.applyFilters).toHaveBeenCalledWith(
      "ssr-context-ready",
      expect.any(Object),
      expect.any(Object)
    )
    expect(spies.runCallbacks).toHaveBeenCalledWith(
      "ssr-context-callbacks",
      expect.any(Object)
    )
  })

  it("sets router and store", () => {
    expect(spies.createApp).toHaveBeenCalled()
  })
})
