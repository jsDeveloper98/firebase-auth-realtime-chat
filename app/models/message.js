import Model, { attr } from "@ember-data/model";

export default Model.extend({
  title: attr("string"),
  user: attr("string"),
  showConfirmation: false
});
