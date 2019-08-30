// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests, application loads': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.startBtn')
      .assert.containsText('.startBtn', 'Start')
      .end()
  },
  'Can Proceed to play page and see a question' : function(browser){
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .click('.startBtn')
      .pause(1000)
      .assert.elementPresent('.question-text')
      .end()
  },
  'Timer appears after user goes to play page' : function(browser){
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .click('.startBtn')
      .pause(1000)
      .assert.elementPresent('#time')
      .end()
  }
}
