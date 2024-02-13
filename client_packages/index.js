require('./extensions/browser3d');

const TEST_URL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

// instance
var browser = new mp.Browser3d(TEST_URL, 1920, 1080, new mp.Vector3(0, 0, 73), 160, 0.005);

// Debug commands
mp.events.add("playerCommand", (command) => {
    switch(command) {
        case "geturl":
            mp.gui.chat.push(`url: ${browser.url}`);
            break;
        case "hide":
            browser.hide();
            break;
        case "show":
            browser.show();
            break;
        case "focus":
            browser.setInputFocused(true);
            break;
        case "unfocus":
            browser.setInputFocused(false);
            break;
        case "destory":
            browser.destroy();
            browser = null;
            break;
        case "create":
            browser = new mp.Browser3d(TEST_URL, 1920, 1080, new mp.Vector3(0, 0, 73), 160, 0.005);
            break;
    }
});

// F2 Key
mp.keys.bind(0x71, false, () => {
    mp.gui.cursor.visible = !mp.gui.cursor.visible;
});