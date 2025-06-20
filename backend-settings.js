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
