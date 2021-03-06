import Model, { attr } from "@ember-data/model";

export default Model.extend({
  email: attr("string"),
  userName: attr("string"),
  online: attr("boolean")
});
