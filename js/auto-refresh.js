/**
 * Auto-refresh utility for periodic data updates
 */

const AutoRefresh = (function () {
  let instance = null;

  class AutoRefreshImpl {
    constructor() {
      this.intervals = new Map();
    }

    /**
     * Start auto-refreshing by executing a callback function
     * @param {Function} callback - Function to execute on each refresh (can be async)
     * @param {number} intervalMs - Refresh interval in milliseconds
     * @param {string} [name] - Optional name for logging purposes
     * @returns {string} refreshId - ID to use for stopping refresh
     */
    start(callback, intervalMs = 300000, name = 'refresh') {
      const refreshId = `${name}_${Date.now()}`;

      const update = async () => {
        try {
          await callback();
          console.log(`[AutoRefresh] Executed ${name} at ${new Date().toLocaleTimeString()}`);
        } catch (error) {
          console.error(`[AutoRefresh] Error executing ${name}:`, error);
        }
      };

      // Initial execution
      update();

      // Set up interval
      const intervalId = setInterval(update, intervalMs);
      this.intervals.set(refreshId, intervalId);

      console.log(`[AutoRefresh] Started ${name} (every ${intervalMs}ms)`);
      return refreshId;
    }

    /**
     * Stop auto-refreshing
     * @param {string} refreshId - The refresh ID returned from start()
     */
    stop(refreshId) {
      const intervalId = this.intervals.get(refreshId);
      if (intervalId) {
        clearInterval(intervalId);
        this.intervals.delete(refreshId);
        console.log(`[AutoRefresh] Stopped ${refreshId}`);
      }
    }

    /**
     * Stop all auto-refreshing
     */
    stopAll() {
      this.intervals.forEach((intervalId) => clearInterval(intervalId));
      this.intervals.clear();
      console.log('[AutoRefresh] Stopped all refreshes');
    }
  }

  return {
    /**
     * Get the singleton instance
     * @returns {AutoRefreshImpl}
     */
    getInstance: function () {
      if (!instance) {
        instance = new AutoRefreshImpl();
      }
      return instance;
    },
  };
})();
