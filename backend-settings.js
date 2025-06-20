// Code.gs (Apps Script backend)
// PropertiesService stores key-value pairs that persist between sessions.
// This is perfect for saving configuration settings like Spreadsheet ID and Sheet Name.

// Save Spreadsheet ID
function saveSpreadsheetId(id) {
  PropertiesService.getScriptProperties().setProperty("SPREADSHEET_ID", id);
}

// Save Sheet Name
function saveSheetName(name) {
  PropertiesService.getScriptProperties().setProperty("SHEET_NAME", name);
}

// Get Spreadsheet ID (returns empty string if not set)
function getSpreadsheetId() {
  return (
    PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID") || ""
  );
}

// Get Sheet Name (returns 'Hublist' if not set)
function getSheetName() {
  return (
    PropertiesService.getScriptProperties().getProperty("SHEET_NAME") ||
    "Hublist"
  );
}

// Serve the settings page, injecting current values into the template
function doGet() {
  var template = HtmlService.createTemplateFromFile("Settings");
  template.spreadsheetId = getSpreadsheetId();
  template.sheetName = getSheetName();
  return template.evaluate().setTitle("Settings");
}
