import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import RealtimeRouteMixin from "emberfire/mixins/realtime-route";
import { subscribe, unsubscribe } from 'emberfire/services/realtime-listener';
import RSVP from "rsvp";

export default Route.extend({
  session: service(),
  store: service(),

  beforeModel() {
    if (!this.get("session.isAuthenticated")) {
      this.transitionTo("sign-in");
    }
  },

  // model() {
  //   return this.store.query("message", { orderBy: "title" });
  // }

  model() {
    return RSVP.Promise.all([
      this.store.query("message", { orderBy: "title" }),
      this.store.query("user", { orderBy: "email" })
    ]);
  },

  // model() {
  //   return RSVP.Promise.all([
  //     this.get("store").query("message", { orderBy: "title" }),
  //     this.get("store").query("user", { osderBy: "email" })
  //   ]).then(res => {
  //     console.log(res);
  //   });
  // }

  setupController(controller, model) {
    controller.setProperties(model);
  },

  afterModel([messages, users]) {
    subscribe(this, messages);
    subscribe(this, users);
    return this._super(...arguments);
  },

  deactivate() {
    unsubscribe(this);
    return this._super();
  }
});
