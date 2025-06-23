// Add a new web app entry to the sheet
function addWebAppToSheet(name, link, description) {
  var ss = SpreadsheetApp.openById(
    "1kDFS1VMKfhqRUiasKxEF5qp9sTPEAgiXmdL_q6RGWqo"
  );
  var sheet = ss.getSheets()[0]; // or use getSheetByName("Sheet1") if needed
  sheet.appendRow([name, link, description]);
}

// Get all web app entries from the sheet
function getWebAppsFromSheet() {
  var ss = SpreadsheetApp.openById(
    "1kDFS1VMKfhqRUiasKxEF5qp9sTPEAgiXmdL_q6RGWqo"
  );
  var sheet = ss.getSheets()[0];
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  var data = sheet.getRange(2, 1, lastRow - 1, 3).getValues();
  return data.map(function (row) {
    return { name: row[0], link: row[1], description: row[2] };
  });
}

// Delete a web app entry from the sheet
function deleteWebAppFromSheet(index) {
  var ss = SpreadsheetApp.openById(
    "1kDFS1VMKfhqRUiasKxEF5qp9sTPEAgiXmdL_q6RGWqo"
  );
  var sheet = ss.getSheets()[0];
  // +2 because Apps Script is 1-based and first row is header
  sheet.deleteRow(Number(index) + 2);
}

// Edit a web app entry in the sheet
function editWebAppInSheet(index, name, link, description) {
  var ss = SpreadsheetApp.openById(
    "1kDFS1VMKfhqRUiasKxEF5qp9sTPEAgiXmdL_q6RGWqo"
  );
  var sheet = ss.getSheets()[0];
  var row = Number(index) + 2;
  sheet.getRange(row, 1).setValue(name);
  sheet.getRange(row, 2).setValue(link);
  sheet.getRange(row, 3).setValue(description);
}

// Add a comment to the sheet
function addCommentToSheet(name, comment, cardId) {
  var ss = SpreadsheetApp.openById(
    "1kDFS1VMKfhqRUiasKxEF5qp9sTPEAgiXmdL_q6RGWqo"
  );
  var sheet = ss.getSheetByName("Comments");
  var lastRow = sheet.getLastRow();
  var nextRow = lastRow + 1;
  sheet.getRange("A" + nextRow).setValue(name);
  sheet.getRange("B" + nextRow).setValue(comment);
  sheet.getRange("C" + nextRow).setValue(cardId);
  return true;
}

function loadWebApps() {
  document.getElementById("loading-spinner").style.display = "flex";
  google.script.run
    .withSuccessHandler(function (data) {
      spreadsheetData = data;
      renderCards(spreadsheetData);
      document.getElementById("loading-spinner").style.display = "none";
    })
    .getWebAppsFromSheet();
}
