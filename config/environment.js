"use strict";

module.exports = function(environment) {
  let ENV = {
    firebase: {
      apiKey: "AIzaSyBiybYOZ_4rYgsnkV84JOD0qUzE-h5vQGY",
      authDomain: "realtime-chat-87a46.firebaseapp.com",
      databaseURL: "https://realtime-chat-87a46.firebaseio.com",
      projectId: "realtime-chat-87a46",
      storageBucket: "realtime-chat-87a46.appspot.com",
      messagingSenderId: "1049189296996",
      appId: "1:1049189296996:web:877bc9c5fa9e3323602871",
      measurementId: "G-MRL30372YM"
    },
    modulePrefix: "realtime-chat",
    environment,
    rootURL: "/",
    locationType: "auto",
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === "development") {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === "test") {
    // Testem prefers this...
    ENV.locationType = "none";

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = "#ember-testing";
    ENV.APP.autoboot = false;
  }

  if (environment === "production") {
    // here you can enable a production-specific feature
  }

  return ENV;
};
