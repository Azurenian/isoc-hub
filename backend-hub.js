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

  // Get all columns A, B, C, D (name, link, description, id)
  var data = sheet.getRange(2, 1, lastRow - 1, 4).getValues();
  return data.map(function (row) {
    return {
      name: row[0] || '', // Column A
      link: row[1] || '', // Column B  
      description: row[2] || '', // Column C
      id: row[3] || '' // Column D
    };
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

function getWebAppByIndex(index) {
  var ss = SpreadsheetApp.openById(
    "1kDFS1VMKfhqRUiasKxEF5qp9sTPEAgiXmdL_q6RGWqo"
  );
  var sheet = ss.getSheets()[0];
  var lastRow = sheet.getLastRow();
  if (index < 0 || index >= lastRow - 1) return null;
  var row = sheet.getRange(index + 2, 1, 1, 4).getValues()[0];
  return {
    name: row[0],
    link: row[1],
    description: row[2],
    photo: row[3],
  };
}

/**
 * Get all comments for a given cardId from the Comments sheet.
 * @param {string} cardId
 * @return {Array<{name: string, comment: string}>}
 */
function getCommentsForCard(cardId) {
  var ss = SpreadsheetApp.openById(
    "1kDFS1VMKfhqRUiasKxEF5qp9sTPEAgiXmdL_q6RGWqo"
  );
  var sheet = ss.getSheetByName("Comments");
  if (!sheet) return [];
  var data = sheet.getDataRange().getValues();
  var comments = [];
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][2]) === String(cardId)) {
      comments.push({ name: data[i][0], comment: data[i][1] });
    }
  }
  return comments;
}

// Add function to search by ID or link
function searchWebAppsByIdOrLink(query) {
  var ss = SpreadsheetApp.openById(
    "1kDFS1VMKfhqRUiasKxEF5qp9sTPEAgiXmdL_q6RGWqo"
  );
  var sheet = ss.getSheets()[0];
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];

  var data = sheet.getRange(2, 1, lastRow - 1, 4).getValues();
  var results = [];

  query = query.toLowerCase();

  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    var name = String(row[0]).toLowerCase();
    var link = String(row[1]).toLowerCase();
    var description = String(row[2]).toLowerCase();
    var id = String(row[3]).toLowerCase();

    // Check if query matches name, link, description, or ID
    if (
      name.includes(query) ||
      link.includes(query) ||
      description.includes(query) ||
      id.includes(query)
    ) {
      results.push({
        name: row[0],
        link: row[1],
        description: row[2],
        id: row[3] || "",
        matchType:
          id.includes(query)
            ? "id"
            : link.includes(query)
            ? "link"
            : name.includes(query)
            ? "name"
            : "description",
      });
    }
  }

  return results;
}

// Update these functions with better error handling:

function getSearchSuggestions(query) {
  try {
    console.log("getSearchSuggestions called with:", query);
    
    var ss = SpreadsheetApp.openById(
      "1kDFS1VMKfhqRUiasKxEF5qp9sTPEAgiXmdL_q6RGWqo"
    );
    var sheet = ss.getSheets()[0];
    var lastRow = sheet.getLastRow();
    
    console.log("Sheet last row:", lastRow);
    
    if (lastRow < 2) {
      console.log("No data in sheet");
      return [];
    }

    var data = sheet.getRange(2, 1, lastRow - 1, 4).getValues();
    var suggestions = [];
    
    query = String(query).toLowerCase();
    
    for (var i = 0; i < data.length; i++) {
      var row = data[i];
      var name = String(row[0] || '').toLowerCase();
      var link = String(row[1] || '').toLowerCase();
      var id = String(row[3] || '').toLowerCase();
      
      if (name.includes(query) || link.includes(query) || id.includes(query)) {
        suggestions.push({
          name: row[0] || '',
          link: row[1] || '',
          description: row[2] || '',
          id: row[3] || '',
          matchType: id.includes(query) ? 'id' : 
                    link.includes(query) ? 'link' : 'name'
        });
      }
    }
    
    console.log("Found suggestions:", suggestions.length);
    return suggestions;
    
  } catch (error) {
    console.error("Error in getSearchSuggestions:", error.toString());
    return [];
  }
}

function filterAppsBySearch(query) {
  try {
    console.log("filterAppsBySearch called with:", query);
    
    var ss = SpreadsheetApp.openById(
      "1kDFS1VMKfhqRUiasKxEF5qp9sTPEAgiXmdL_q6RGWqo"
    );
    var sheet = ss.getSheets()[0];
    var lastRow = sheet.getLastRow();
    
    if (lastRow < 2) return [];

    var data = sheet.getRange(2, 1, lastRow - 1, 4).getValues();
    var results = [];
    
    query = String(query).toLowerCase();
    
    for (var i = 0; i < data.length; i++) {
      var row = data[i];
      var name = String(row[0] || '').toLowerCase();
      var link = String(row[1] || '').toLowerCase();
      var description = String(row[2] || '').toLowerCase();
      var id = String(row[3] || '').toLowerCase();
      
      if (name.includes(query) || link.includes(query) || description.includes(query) || id.includes(query)) {
        results.push({
          name: row[0] || '',
          link: row[1] || '',
          description: row[2] || '',
          id: row[3] || ''
        });
      }
    }
    
    console.log("Found results:", results.length);
    return results;
    
  } catch (error) {
    console.error("Error in filterAppsBySearch:", error.toString());
    return [];
  }
}