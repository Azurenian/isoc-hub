// Add a new web app entry to the sheet
function addWebAppToSheet(name, link, description, photo) {
  var ss = SpreadsheetApp.openById(
    "1kDFS1VMKfhqRUiasKxEF5qp9sTPEAgiXmdL_q6RGWqo"
  );
  var sheet = ss.getSheets()[0]; // or use getSheetByName("Sheet1") if needed
  var lastRow = sheet.getLastRow() + 1;
  sheet.appendRow([name, link, description, photo]);
  // Return the new row as an object
  return {
    name: name,
    link: link,
    description: description,
    photo: photo,
  };
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
