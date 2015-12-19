import app from 'app';
import Store from 'jfs';
import path from 'path';

const prefsPath = path.join(app.getPath('userData'), 'prefs.json');
const db = new Store(prefsPath);

/**
 * Save the given (key, value) pair asynchronously.
 * Returns immediately and logs errors.
 */
function set(key, value) {
  db.save(key, value, function(err) {
    if (err) {
      console.error(err);
    } else {
      log('set', key, '=', JSON.stringify(value));
    }
  });
}

/**
 * Retrieve the value synchronously.
 */
function get(key, defaultValue) {
  const value = db.getSync(key);
  if (value == undefined || value instanceof Error) {
    return defaultValue;
  }
  return value;
}

/**
 * Remove the given key.
 */
function unset(key) {
  db.delete(key, function(err) {
    if (err) {
      console.error(err);
    } else {
      log('unset', key);
    }
  });
}

/**
 * Remove all the keys.
 */
function clear() {
  db.all(function(err, valuesMap) {
    if (err) {
      console.error(err);
    } else {
      log('unsetting all keys');
      Object.keys(valuesMap).forEach(unset);
    }
  });
}

export default {
  set,
  get,
  unset,
  clear
};