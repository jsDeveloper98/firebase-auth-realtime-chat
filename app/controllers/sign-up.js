import Controller from "@ember/controller";
import { inject as service } from "@ember/service";

export default Controller.extend({
  firebaseApp: service(),
  store: service(),
  session: service(),
  emailValue: "",
  passwordValue: "",

  init() {
    this._super(...arguments);
  },

  signUp(emailValue, passwordValue) {
    this.get("firebaseApp")
      .auth()
      .then(auth => {
        auth
          .createUserWithEmailAndPassword(emailValue, passwordValue)
          .then(res => {
            const user = this.get("store").createRecord("user", {
              email: res.user.email
            });
            user.set("id", res.user.uid);
            user.save();
            this.set("emailValue", "");
            this.set("passwordValue", "");
          });
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  },

  actions: {
    signUp() {
      this.signUp(this.get("emailValue"), this.get("passwordValue"));
    }
  }
});
