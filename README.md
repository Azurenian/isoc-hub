# 🚀 ISOC Hub Development Instructions

Welcome to the **ISOC Hub** project! This guide will help you implement the core features of our web application. The basic scaffolding (navigation, dark/light mode, and views) is already set up for you.

---

## 📚 **Essential Resources**

Before you start, bookmark these essential references:

- 🎨 **[Bootstrap Documentation](https://getbootstrap.com/docs/5.3/)** - For styling and components
- 🔗 **[Bootstrap Icons](https://icons.getbootstrap.com/)** - For icons and visual elements
- ⚙️ **[Google Apps Script Documentation](https://developers.google.com/apps-script/overview)** - For backend functionality

---

## 🎯 **Project Overview**

You'll be building **two main views** with specific features:

### 🏠 **Hub View** - The Main Dashboard
### ⚙️ **Settings View** - Configuration Panel

---

## 🏠 **Hub View Features**

### 📋 **1. Dynamic Card List Display**

**What is a Card?**
> 🃏 A **card** is a flexible container component in Bootstrap that displays content in a visually appealing, organized way. Think of it like a digital business card or a product tile in an online store. Cards typically have a white background, rounded corners, and subtle shadows to make them stand out from the page background.

**What you need to build:**
- Display cards based on spreadsheet data
- Each card shows: Web App Name, Description, and a clickable link button

**Data Source:**
- **Spreadsheet columns:**
  - **Column A**: Web App Name (title)
  - **Column B**: Link (URL)
  - **Column C**: Description
- **Starting from Row 2** (Row 1 contains headers)

**Card Requirements:**
- **Title**: Display the Web App Name prominently
- **Description**: Show a brief description of the app
- **Button**: Clicking opens the link in a **new tab**

---

### 🎛️ **2. Control Buttons**

**Location:** Upper right corner of the Hub View

**Buttons needed:**
1. **🟢 Add Button** - Bootstrap `btn-success` (green/primary color)
2. **🟡 Edit Button** - Bootstrap `btn-warning` (yellow/warning color)  
3. **🔴 Delete Button** - Bootstrap `btn-danger` (red/danger color)
4. **🔄 Refresh Button** - Bootstrap `btn-info` (blue/info color)

> 💡 **What is Bootstrap?** Bootstrap provides pre-built CSS classes for styling. Instead of writing custom CSS, you can use classes like `btn-success` to instantly get a green button!

---

### 📝 **3. Add/Edit Modal Implementation**

**What is a Modal?**
> 🪟 A **modal** is a popup window that appears on top of your main content. It's like a dialog box that focuses the user's attention on a specific task without leaving the current page.

**Modal Requirements:**
- **Triggered by:** Add button OR Edit button
- **Form fields:**
  - Web App Name (text input)
  - Link (URL input)
  - Description (textarea)

**Functionality:**
- **Add mode:** Creates a new entry (appends to spreadsheet)
- **Edit mode:** Updates existing entry (overwrites spreadsheet row)
- **After saving:** Automatically refresh the card list

---

## ⚙️ **Settings View Features**

### 🗂️ **1. Spreadsheet ID Configuration**

**What you need to build:**
- Text input field for Spreadsheet ID
- Save button to store the new ID

**Technical Implementation:**
> 🔧 **What is PropertiesService?** Google Apps Script's PropertiesService is like a simple database that stores key-value pairs. It's perfect for saving configuration settings that persist between app sessions.

```javascript
// Example usage:
PropertiesService.getScriptProperties().setProperty('SPREADSHEET_ID', newId);
const storedId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
```

---

### 📋 **2. Sheet Name Configuration**

**What you need to build:**
- Text input field for Sheet Name
- **Default value:** 'Hublist'
- Save functionality using PropertiesService

**Purpose:** This allows users to switch between different sheets within the same spreadsheet for data sources.

---

## 🛠️ **Technical Terms Explained**

### 🎯 **Frontend vs Backend**
- **Frontend:** What users see and interact with (HTML, CSS, JavaScript)
- **Backend:** Server-side logic that handles data (Google Apps Script functions)

### 🔄 **CRUD Operations**
- **C**reate: Add new records
- **R**ead: Display existing records  
- **U**pdate: Modify existing records
- **D**elete: Remove records

### 📡 **API Calls**
When your frontend needs data from the backend, it makes "API calls" - think of it as your webpage asking Google Sheets for information.

### 🎨 **Bootstrap Classes Quick Reference**
- `btn btn-success`: Green button
- `btn btn-warning`: Yellow button  
- `btn btn-danger`: Red button
- `btn btn-info`: Blue button
- `modal`: Creates a popup dialog
- `card`: Creates a styled content container

---

## 🗺️ **Implementation Roadmap**

### **Phase 1: Hub View Cards** 📋
1. Create backend function to read spreadsheet data
2. Build frontend function to display cards
3. Implement "open in new tab" functionality

### **Phase 2: CRUD Operations** ⚙️
1. Design and implement Add/Edit modal
2. Create backend functions for Create, Update, Delete
3. Add refresh functionality

### **Phase 3: Settings Panel** 🔧
1. Build settings form interface
2. Implement PropertiesService storage
3. Connect settings to main application

---

## 💡 **Pro Tips for Success**

### 🔍 **Debugging**
- Use `console.log()` to track what your code is doing
- Check the browser's Developer Tools (F12) for errors

### 📖 **Learning Approach**
- Start with small, working pieces
- Test frequently as you build
- Don't hesitate to consult the documentation links above

### 🤝 **Collaboration**
- Comment your code clearly
- Use meaningful variable names
- Ask questions when stuck!

---

## 🎉 **Ready to Start?**

You now have a clear roadmap for building the ISOC Hub! Remember:
- **Take it step by step** - Don't try to build everything at once
- **Test early and often** - Make sure each piece works before moving on
- **Use the resources** - Bootstrap and Apps Script docs are your friends

**Happy coding!** 🚀

---

*Need help? Don't hesitate to ask questions and collaborate with your team!*