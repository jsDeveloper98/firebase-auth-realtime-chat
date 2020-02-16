import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import { subscribe, unsubscribe } from "emberfire/services/realtime-listener";
import RSVP from "rsvp";

export default Route.extend({
  session: service(),
  store: service(),

  beforeModel() {
    if (!this.get("session.isAuthenticated")) {
      this.transitionTo("sign-in");
    }
  },

  model() {
    return RSVP.hash({
      messages: this.store.query("message", { orderBy: "date" }),
      users: this.store.query("user", { orderBy: "date" })
    });
  },

  afterModel({ messages, users }) {
    subscribe(this, messages);
    subscribe(this, users);
    return this._super(...arguments);
  },

  deactivate() {
    unsubscribe(this);
    return this._super(...arguments);
  }
});
