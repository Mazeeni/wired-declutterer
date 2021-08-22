const hidePage = `body > :not(.article) {
  display: none;
}`;
console.log("We begin");
const isFocus = false;

function listenForClicks() {
  document.addEventListener("click", (e) => {
    function switchFocus() {
      if (isFocus) {
        focusOff();
      } else {
        focusOn();
      }
    }

    function focusOn() {
      browser.tabs.insertCSS({ code: hidePage });
      console.log("hi");
    }

    function focusOff() {
      browser.tabs.removeCSS({ code: hidepage });
    }

    if (e.target.classList.contains("power-button")) {
      browser.tabs
        .query({ active: true, currentWindow: true })
        .then(switchFocus)
        .catch(reportError);
    }
  });
}

function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(
    `Failed to execute declutterer content script: ${error.message}`
  );
}

browser.tabs
  .executeScript({ file: "../declutterer/declutterer.js" })
  .then(listenForClicks)
  .catch(reportExecuteScriptError);