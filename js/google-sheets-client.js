/**
 * Google Sheets API Client
 * Handles initialization and data fetching from Google Sheets
 */

class GoogleSheetsClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.initialized = false;
  }

  /**
   * Initialize the Google API client
   */
  async init() {
    if (this.initialized) {
      return;
    }

    // Load the client library
    await new Promise((resolve) => gapi.load("client", resolve));

    await gapi.client.init({
      apiKey: this.apiKey,
      discoveryDocs: [
        "https://sheets.googleapis.com/$discovery/rest?version=v4",
      ],
    });

    this.initialized = true;
  }

  /**
   * Fetch data from a Google Sheet
   * @param {string} spreadsheetId - The ID of the spreadsheet
   * @param {string} range - The range to fetch (e.g., "Sheet1!A1:D10")
   * @returns {Promise<Array<Array<string>>>} The values from the sheet
   */
  async fetchData(spreadsheetId, range) {
    if (!this.initialized) {
      await this.init();
    }

    const response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    return response.result.values || [];
  }
}
