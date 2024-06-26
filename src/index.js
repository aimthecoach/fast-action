const core = require("@actions/core");
const github = require("@actions/github");
const axios = require("axios");

const run = async () => {
  try {
    // `who-to-greet` input defined in action metadata file
    const url = core.getInput("url");
    console.log(`Calling ${url}!`);
    const time = new Date().toTimeString();
    core.setOutput("time", time);
    console.log(`The time is ${time}`);
    await axios.post(url, {
      text: "Hello, World!",
    });
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }
};

run();
