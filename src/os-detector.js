/**
 * os-detector — Lightweight client-side OS detection
 *
 * Features:
 *  • Detects iOS, Android, Windows, macOS, Linux, ChromeOS
 *  • Sets data-os, data-platform, data-device on <html>
 *  • Zero dependencies, ~500 bytes gzipped
 *  • Script tag or ES module
 *
 * Usage:
 *   <script src="os-detector.js"><\/script>
 *
 *   CSS:   [data-os="ios"] .android-btn { display: none; }
 *   JS:    OSDetect.is('ios')  → true/false
 *
 * @license MIT
 */

(function () {
  'use strict';

  var ua = navigator.userAgent || navigator.vendor || '';
  var platform = navigator.platform || '';

  // --- Detection ---

  function detectOS() {
    // iOS (iPhone, iPad, iPod) — note: iPadOS 13+ reports "Macintosh"
    if (/iPad|iPhone|iPod/.test(ua) || (platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
      return { os: 'ios', device: /iPad/.test(ua) ? 'ipad' : /iPhone/.test(ua) ? 'iphone' : 'ipod', platform: 'apple' };
    }

    // Android (excluding ChromeOS)
    if (/Android/.test(ua) && !/CrOS/.test(ua)) {
      return { os: 'android', device: /Mobile/.test(ua) ? 'phone' : 'tablet', platform: 'google' };
    }

    // ChromeOS
    if (/CrOS/.test(ua)) {
      return { os: 'chromeos', device: 'desktop', platform: 'google' };
    }

    // Windows
    if (/Windows/.test(ua)) {
      return { os: 'windows', device: /Phone/.test(ua) ? 'phone' : 'desktop', platform: 'microsoft' };
    }

    // macOS
    if (/Macintosh|Mac OS X/.test(ua)) {
      return { os: 'macos', device: 'desktop', platform: 'apple' };
    }

    // Linux (desktop)
    if (/Linux/.test(ua)) {
      return { os: 'linux', device: 'desktop', platform: 'linux' };
    }

    return { os: 'unknown', device: 'unknown', platform: 'unknown' };
  }

  function parseOSVersion(info) {
    var version = null;

    if (info.os === 'ios') {
      var m = ua.match(/OS (\d+)_(\d+)/);
      if (m) version = m[1] + '.' + m[2];
    } else if (info.os === 'android') {
      var m = ua.match(/Android (\d+)\.(\d+)/);
      if (m) version = m[1] + '.' + m[2];
    } else if (info.os === 'windows') {
      var m = ua.match(/Windows NT (\d+\.\d+)/);
      if (m) version = m[1];
    } else if (info.os === 'macos') {
      var m = ua.match(/Mac OS X (\d+)[_](\d+)[_]?(\d+)?/);
      if (m) version = m[1] + '.' + m[2] + (m[3] ? '.' + m[3] : '');
    }

    return version;
  }

  // --- Run ---

  var info = detectOS(ua);
  info.version = parseOSVersion(info);

  // Set attributes on <html>
  var html = document.documentElement;
  html.setAttribute('data-os', info.os);
  html.setAttribute('data-platform', info.platform);
  html.setAttribute('data-device', info.device);
  if (info.version) {
    html.setAttribute('data-os-version', info.version);
  }

  // --- Public API ---

  var OSDetect = {
    /** Full detection result */
    info: info,

    /** Quick check: OSDetect.is('ios') → true/false */
    is: function (os) {
      return info.os === os.toLowerCase();
    },

    /** Convenience shortcuts */
    isIOS: function () { return info.os === 'ios'; },
    isAndroid: function () { return info.os === 'android'; },
    isWindows: function () { return info.os === 'windows'; },
    isMacOS: function () { return info.os === 'macos'; },
    isLinux: function () { return info.os === 'linux'; },
    isChromeOS: function () { return info.os === 'chromeos'; },
    isMobile: function () { return info.device === 'phone'; },
    isTablet: function () { return info.device === 'tablet'; },
    isApple: function () { return info.platform === 'apple'; },

    /** Trigger callback when DOM is ready (idempotent) */
    ready: function (fn) {
      if (document.readyState !== 'loading') {
        fn();
      } else {
        document.addEventListener('DOMContentLoaded', fn);
      }
    }
  };

  // Expose globally
  window.OSDetect = OSDetect;

  // ES module export (when loaded as type="module")
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = OSDetect;
  }
})();
