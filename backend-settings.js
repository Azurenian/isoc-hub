// Replace with your actual database spreadsheet ID
const SPREADSHEET_ID = "1kDFS1VMKfhqRUiasKxEF5qp9sTPEAgiXmdL_q6RGWqo";
const SHEET_NAME = "Sheet1"; // Change if your sheet name is different

function findRowBySpreadsheetId(id) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    // skip header
    if (String(data[i][1]).trim() === id.trim()) {
      return {
        id: data[i][0],
        link: data[i][1],
        description: data[i][2],
      };
    }
  }
  return null;
}

function findRowBySheetName(name) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    // skip header
    if (String(data[i][0]).trim().toLowerCase() === name.trim().toLowerCase()) {
      return {
        id: data[i][0],
        link: data[i][1],
        description: data[i][2],
      };
    }
  }
  return null;
}

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

// Apps Script code (Code.gs)
function fetchSheetData(spreadsheetId, sheetName) {
  try {
    var ss = SpreadsheetApp.openById(spreadsheetId);
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) throw new Error("Sheet not found.");
    var data = sheet.getDataRange().getValues();
    return data;
  } catch (e) {
    throw new Error("Unable to fetch data: " + e.message);
  }
}

// Fetch by Spreadsheet ID (first sheet)
function fetchSheetDataById(spreadsheetId) {
  try {
    var ss = SpreadsheetApp.openById(spreadsheetId);
    var sheet = ss.getSheets()[0];
    var data = sheet.getDataRange().getValues();
    return data;
  } catch (e) {
    throw new Error("Unable to fetch data: " + e.message);
  }
}

// Fetch by Sheet Name (from default spreadsheet)
function fetchSheetDataByName(sheetName) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) throw new Error("Sheet not found.");
    var data = sheet.getDataRange().getValues();
    return data;
  } catch (e) {
    throw new Error("Unable to fetch data: " + e.message);
  }
}

function addCommentToSheet(name, comment, cardId) {
  var ss = SpreadsheetApp.openById(
    "1kDFS1VMKfhqRUiasKxEF5qp9sTPEAgiXmdL_q6RGWqo"
  );
  var sheet = ss.getSheetByName("Comments");
  var lastRow = sheet.getLastRow();
  var nextRow = lastRow + 1;
  // Write name to column A, comment to column B, cardId to column C
  sheet.getRange("A" + nextRow).setValue(name);
  sheet.getRange("B" + nextRow).setValue(comment);
  sheet.getRange("C" + nextRow).setValue(cardId);
  return true;
}
