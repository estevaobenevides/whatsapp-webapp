const appPath = require('electron').remote.app.getAppPath();
const initPath = require('path').join(appPath, 'scripts', 'renderer', 'init.js');
require(initPath).inject('webview');

require('renderer/preload/events');
require('renderer/preload/listeners');
require('renderer/preload/notification');
require('renderer/preload/profile-picture-download');
