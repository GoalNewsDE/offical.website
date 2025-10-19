/**
 * Table Renderer (Singleton)
 * Renders data as HTML tables
 */

const TableRenderer = (function () {
  let instance = null;

  class TableRendererImpl {
    /**
     * Render data as an HTML table
     * @param {Array<Array<string>>} data - The data to render, first row will be headers
     * @param {string} containerId - The ID of the container element
     */
    render(data, containerId) {
      const container = document.getElementById(containerId);

      if (!data || data.length === 0) {
        container.innerHTML = "No data found.";
        return;
      }

      let table = "<table>";

      // First row as headers
      const headerRow = data[0];
      table += "<tr>";
      for (let columnIndex = 0; columnIndex < headerRow.length; columnIndex++) {
        table += "<th>" + this.escapeHtml(headerRow[columnIndex]) + "</th>";
      }
      table += "</tr>";

      // Remaining rows as data
      for (let rowIndex = 1; rowIndex < data.length; rowIndex++) {
        const row = data[rowIndex];
        table += "<tr>";
        for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
          table += "<td>" + this.escapeHtml(row[columnIndex]) + "</td>";
        }
        table += "</tr>";
      }

      table += "</table>";
      container.innerHTML = table;
    }

    /**
     * Display an error message
     * @param {string|Error} error - The error to display
     * @param {string} containerId - The ID of the container element
     */
    renderError(error, containerId) {
      const container = document.getElementById(containerId);
      const message =
        error.result?.error?.message || error.message || String(error);
      container.innerHTML = "Error loading data: " + this.escapeHtml(message);
    }

    /**
     * Escape HTML to prevent XSS
     * @param {string} text - The text to escape
     * @returns {string} The escaped text
     */
    escapeHtml(text) {
      const div = document.createElement("div");
      div.textContent = text;
      return div.innerHTML;
    }
  }

  return {
    /**
     * Get the singleton instance
     * @returns {TableRendererImpl}
     */
    getInstance: function () {
      if (!instance) {
        instance = new TableRendererImpl();
      }
      return instance;
    },
  };
})();
