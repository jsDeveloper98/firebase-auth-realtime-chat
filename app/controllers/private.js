import Controller from "@ember/controller";
import { inject as service } from "@ember/service";

export default Controller.extend({
  message: "",
  session: service(),
  store: service(),
  currentUser: service(),

  init() {
    this._super(...arguments);
    const messages = this.get("store").findAll("message");
    this.set("messages", messages);
  },

  actions: {
    logout() {
      return this.session.invalidate().then(() => {
        this.transitionToRoute("sign-in");
      });
    },
    addMessage(value, event) {
      if (event.key === "Enter" && this.get("message") !== "") {
        const message = this.get("store").createRecord("message", {
          title: this.get("message")
        });
        message.set("user", this.get("currentUser.user"));
        message.save();
        this.set("message", "");
        const messageBox = document.getElementById("messageBox");
        messageBox.scrollTop = messageBox.scrollHeight;
      }
    }
  }
});
