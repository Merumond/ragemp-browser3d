# ragemp-browser3d
This resource offers a simplified system for creating and interacting with 3D browsers

## Installation
- Place the "extensions" folder in the "client_packages" folder
- Add the code from index.js to your index.js
- Start the server!

## API
```JS
/**
  * Create browser
  * @param {string} url                      Link to display window
  * @param {number} width                    Window width
  * @param {number} height                   Window height
  * @param {object} position                 Window position on 3d world (example: new mp.Vector3(0, 0, 74) )
  * @param {number} heading                  Rotate window
  * @param {number} scale                    Width and height multiplier (default: 1)
  * @param {number} alpha                    Transparency regulation
*/
var browser = new mp.Browser3d(url, width, height, position, heaading, scale?=1, alpha?=255);

/**
  * Destroy browser
*/
browser.destroy();

/**
  * Update browser position
  * @param {number} x
  * @param {number} y
  * @param {number} z
*/
browser.setPosition(x, y, z);

/**
  * Update browser heading
  * @param {number} heading
*/
browser.setHeading(heading);

/**
  * Hide browser
*/
browser.hide();

/**
  * Show browser
*/
browser.show();

/**
  * Setting the ability to interact with the browser through the game
  * @param {bool} toggle
*/
browser.setInputFocused(toggle);

/**
  * Getting interaction state of browser
  * @return {bool} result                 True or False   
*/
browser.isFocused();

/**
  * Check if the browser is ready for use using browserDomReady
  * @return {bool} result                 True or False   
*/
browser.isReady();             
```

## Notes
If you have any difficulties using it or ideas for improvement, you can write to me in the Discord PM

## Author
Discord - @merumond
