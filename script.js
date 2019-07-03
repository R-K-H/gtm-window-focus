function () {
  var visible = true;

  function focused() {
    if (!visible) {
      window.dataLayer.push({
        'event' : 'windowStatus',
        'eventCategory' : 'Activity',
        'eventAction' : 'window-status',
        'eventLabel' 'focused'
      });
    }
  }

  function unfocused() {
    if (visible) {
      window.dataLayer.push({
        'event' : 'windowStatus',
        'eventCategory' : 'Activity',
        'eventAction' : 'window-status',
        'eventLabel' 'unfocused'
      });
    }
  }

  // Standards:
  if ('hidden' in document) {
    document.addEventListener('visibilitychange',
        function() {(document.hidden ? unfocused : focused)()});
  }
  if ('mozHidden' in document) {
    document.addEventListener('mozvisibilitychange',
        function() {(document.mozHidden ? unfocused : focused)()});
  }
  if ('webkitHidden' in document) {
    document.addEventListener('webkitvisibilitychange',
        function() {(document.webkitHidden ? unfocused : focused)()});
  }
  if ('msHidden' in document) {
    document.addEventListener('msvisibilitychange',
        function() {(document.msHidden ? unfocused : focused)()});
  }
  // IE 9 and lower:
  if ('onfocusin' in document) {
    document.onfocusin = focused;
    document.onfocusout = unfocused;
  }
  // All others:
  window.onpageshow = window.onfocus = focused;
  window.onpagehide = window.onblur = unfocused;
}
