import Controller from "@ember/controller";
import { inject as service } from "@ember/service";

export default Controller.extend({
  message: "",
  session: service(),
  store: service(),

  actions: {
    logout() {
      this.get("store")
        .findRecord("user", this.get("session.data.authenticated.user.uid"))
        .then(res => {
          res.set("online", false);
          res.save();
        })
        .then(() => {
          return this.session.invalidate().then(() => {
            this.transitionToRoute("sign-in");
          });
        });
    },
    addMessage(value, event) {
      if (event.key === "Enter" && this.get("message") !== "") {
        const message = this.get("store").createRecord("message", {
          title: this.get("message")
        });
        this.get("store")
          .findRecord("user", this.get("session.data.authenticated.user.uid"))
          .then(res => {
            message.set("user", res.userName);
            message.save();
          });
        this.set("message", "");
        setTimeout(() => {
          const messageBox = document.getElementById("messageBox");
          messageBox.scrollTop = messageBox.scrollHeight;
        });
      }
    },
    showConfModal(message) {
      message.set("showConfirmation", true);
      message.save();
    },
    hideConfModal(message) {
      message.set("showConfirmation", false);
      message.save();
    },
    removeMessage(message) {
      message.destroyRecord();
      message.save();
    }
  }
});
