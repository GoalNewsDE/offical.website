/**
 * Google Sheets API Facade (Singleton)
 * Provides a simple interface for fetching data from Google Sheets
 */

const SheetsAPI = (function () {
  let instance = null;

  class SheetsAPIImpl {
    constructor() {
      this.client = new GoogleSheetsClient(GOOGLE_SHEETS_CONFIG.apiKey);
    }

    /**
     * Fetch data from a specific range in the configured spreadsheet
     * @param {string} range - The range to fetch (e.g., "Sheet1!A1:D10")
     * @returns {Promise<Array<Array<string>>>} The values from the sheet
     */
    async fetch(range) {
      return await this.client.fetchData(
        GOOGLE_SHEETS_CONFIG.spreadsheetId,
        range
      );
    }

    /**
     * Fetch the Bundesliga 1 table
     * @returns {Promise<Array<Array<string>>>} The table data
     */
    async fetchBundesliga1Table() {
      return await this.fetch(GOOGLE_SHEETS_CONFIG.tables.table1Bundesliga);
    }

    /**
     * Fetch the Bundesliga 2 table
     * @returns {Promise<Array<Array<string>>>} The table data
     */
    async fetchBundesliga2Table() {
      return await this.fetch(GOOGLE_SHEETS_CONFIG.tables.table2Bundesliga);
    }

    /**
     * Fetch ticker
     * @returns {Promise<Array<Array<string>>>} The table data
     */
    async fetchTicker() {
      return await this.fetch(GOOGLE_SHEETS_CONFIG.tables.ticker);
    }
  }

  return {
    /**
     * Get the singleton instance
     * @returns {SheetsAPIImpl}
     */
    getInstance: function () {
      if (!instance) {
        instance = new SheetsAPIImpl();
      }
      return instance;
    },
  };
})();
