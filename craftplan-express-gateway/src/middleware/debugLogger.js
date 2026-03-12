/**
 * Debug logging utility for API events and payloads.
 * Usage: const debug = require('../middleware/debugLogger'); debug('message', data)
 */
function debugLogger(message, data) {
  if (process.env.DEBUG_API === 'true') {
    if (data !== undefined) {
      console.log(`[DEBUG] ${message}:`, JSON.stringify(data, null, 2));
    } else {
      console.log(`[DEBUG] ${message}`);
    }
  }
}

module.exports = debugLogger;
