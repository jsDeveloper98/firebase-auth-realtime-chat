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
  //   return new RSVP.hash({
  //     messages: this.store.query("message", { orderBy: "title" }),
  //     users: this.store.query("user", { orderBy: "email" })
  //   }).then(res => {
  //     console.log(res);
  //   });
  // }

  // model() {
  //   return RSVP.Promise.all([
  //     this.get("store").query("message", { orderBy: "title" }),
  //     this.get("store").query("user", { osderBy: "email" })
  //   ]).then(res => {
  //     console.log(res);
  //   });
  // }

  // setupController(controller, model) {
  //   controller.setProperties(model);
  // }
});
