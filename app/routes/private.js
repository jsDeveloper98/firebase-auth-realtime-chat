import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import RealtimeRouteMixin from "emberfire/mixins/realtime-route";

export default Route.extend(RealtimeRouteMixin, {
  session: service(),

  beforeModel() {
    if (!this.get("session.isAuthenticated")) {
      this.transitionTo("sign-in");
    }
  },

  model() {
    return this.get("store").query("message", { orderBy: "title" });
  }
});
