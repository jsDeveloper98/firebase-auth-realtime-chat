import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import RSVP from "rsvp";

export default Controller.extend({
  session: service(),
  firebaseApp: service(),
  store: service(),
  currentUser: service(),
  emailValue: "",
  passwordValue: "",

  init() {
    this._super(...arguments);
    const users = this.get("store").findAll("user");
    this.set("users", users);
  },

  signIn(emailValue, passwordValue) {
    return new RSVP.Promise(resolve => {
      this.get("firebaseApp")
        .auth()
        .then(auth => {
          auth
            .signInWithEmailAndPassword(emailValue, passwordValue)
            .then(user => {
              resolve(user);
              this.get("store")
                .findRecord("user", user.user.uid)
                .then(res => {
                  res.set("online", true);
                  res.save();
                });
            })
            .catch(err => {
              // eslint-disable-next-line no-console
              console.log(err);
            });
        });
    });
  },

  actions: {
    signIn() {
      this.signIn(this.get("emailValue"), this.get("passwordValue")).then(
        () => {
          this.transitionToRoute("private");
          this.set("emailValue", "");
          this.set("passwordValue", "");
        }
      );
    }
  }
});
