import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import RealtimeRouteMixin from "emberfire/mixins/realtime-route";
// import RSVP from "rsvp";

export default Route.extend(RealtimeRouteMixin, {
  session: service(),
  store: service(),

  beforeModel() {
    if (!this.get("session.isAuthenticated")) {
      this.transitionTo("sign-in");
    }
  },

  model() {
    return this.store.query("message", { orderBy: "title" });
  }

  // model() {
  //   return RSVP.hash({
  //     messages: this.store.query("message", { orderBy: "title" }),
  //     users: this.store.query("user", { orderBy: "email" })
  //   });
  // },

  // model() {
  //   return RSVP.Promise.all([
  //     this.store.query("message", { orderBy: "title" }),
  //     this.store.query("user", { osderBy: "email" })
  //   ]);
  // },

  // setupController(controller, model) {
  //   controller.setProperties(model);
  // }
});
