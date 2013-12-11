goog.provide('annotorious.events.ui');

goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.events.EventType');

annotorious.events.ui.hasTouch = 'ontouchstart' in window;

annotorious.events.ui.hasMouse = !annotorious.events.ui.hasTouch; // Just for readability

/**
 * Human interface events.
 * @enum {string}
 */
annotorious.events.ui.EventType = {

  DOWN:  goog.events.EventType.MOUSEDOWN,

  OVER:  goog.events.EventType.MOUSEOVER,

  MOVE:  goog.events.EventType.MOUSEMOVE,

  UP:    goog.events.EventType.MOUSEUP,

  OUT:   goog.events.EventType.MOUSEOUT,

  CLICK: goog.events.EventType.CLICK

}

/**
  * To get screen coordinates while taking into consideration mobile and the offset of the screen
  * @param {Object} event the DOM Event object
  * @param {Element} parent the parent element that triggers the event
  */
annotorious.events.ui.sanitizeCoordinates = function(event, parent) {
  var points = false;
  var offset = annotorious.dom.getOffset;
  
  if (!event.offsetX || !event.offsetY && event.event_.changedTouches) {
    points = {
      x: event.event_.changedTouches[0].clientX - offset(parent).left,
      y: event.event_.changedTouches[0].clientY - offset(parent).top
    };
  } else {
    points = {
      x: event.offsetX,
      y: event.offsetY
    };
  }
  
  return points;
};
