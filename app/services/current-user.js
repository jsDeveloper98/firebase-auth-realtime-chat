import Service from "@ember/service";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";

export default Service.extend({
  session: service(),

  user: computed(
    ("session.data.authenticated.user.email",
    "session.isAuthenticated",
    function() {
      if (this.get("session.isAuthenticated")) {
        return this.get("session.data.authenticated.user.email");
      }
      return;
    })
  )
});
