/**
 * Entry point for the web app
 * @param {Object} e - Event object
 * @returns {HtmlOutput} Rendered HTML template
 */
function doGet(e) {
  var output = HtmlService.createTemplateFromFile('web-main')
    .evaluate()
    .setTitle('Globe ISOC Hub')
    .setFaviconUrl('https://raw.githubusercontent.com/Azurenian/DSCS/refs/heads/main/globe-logo.png')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

  return output;
}

/**
 * Utility function to include partial HTML files
 * @param {string} filename - Name of the HTML file to include
 * @returns {string} The HTML content
 */
function include(filename) {
  return HtmlService.createTemplateFromFile(filename)
    .evaluate()
    .getContent();
}

