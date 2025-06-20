function saveSpreadsheetId(id) {
  var ss = SpreadsheetApp.openById(
    "1kDFS1VMKfhqRUiasKxEF5qp9sTPEAgiXmdL_q6RGWqo"
  );
  var sheet = ss.getSheets()[0]; // Use the first sheet

  // Get all values from B2 down
  var data = sheet.getRange("B2:B").getValues();
  var nextRow = 2;
  for (var i = 0; i < data.length; i++) {
    if (!data[i][0]) {
      nextRow = i + 2; // Row index starts at 2
      break;
    }
    nextRow = i + 3;
  }

  sheet.getRange("B" + nextRow).setValue(id); // Save the ID to the next row in column B
  return true;
}

// Apps Script: Code.gs
function saveSheetInfo(sheetName, spreadsheetId) {
  var ss = SpreadsheetApp.openById(
    "1kDFS1VMKfhqRUiasKxEF5qp9sTPEAgiXmdL_q6RGWqo"
  );
  var sheet = ss.getSheets()[0]; // Use the first sheet
  var lastRow = sheet.getLastRow();
  var data = [];
  if (lastRow >= 3) {
    data = sheet.getRange("A3:A" + lastRow).getValues();
  }
  // Check for duplicate sheet name
  for (var i = 0; i < data.length; i++) {
    if (
      data[i][0] &&
      data[i][0].toString().trim().toLowerCase() ===
        sheetName.trim().toLowerCase()
    ) {
      throw new Error(
        "Sheet name already exists. Please use a different name."
      );
    }
  }
  // Find next empty row
  var nextRow = 3;
  if (lastRow >= 3) {
    var abData = sheet.getRange("A3:B" + lastRow).getValues();
    for (var i = 0; i < abData.length; i++) {
      if (!abData[i][0] && !abData[i][1]) {
        nextRow = i + 3;
        break;
      }
      nextRow = i + 4;
    }
  }
  sheet.getRange("A" + nextRow).setValue(sheetName); // Column A

  // If spreadsheetId is a full link, extract the ID
  var id = spreadsheetId;
  var match = spreadsheetId.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (match) id = match[1];

  // Set as clickable link in column B
  var url = "https://docs.google.com/spreadsheets/d/" + id;
  sheet
    .getRange("B" + nextRow)
    .setFormula('=HYPERLINK("' + url + '", "' + id + '")');

  return true;
}
