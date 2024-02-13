let allInstances = [];

class Browser3d {
    constructor(url, width, height, position, heading, scale = 1, alpha = 255) {
        this.url = url;
        this.width = width;
        this.height = height;
        this.position = position;
        this.heading = heading;
        this.scale = scale;
        this.alpha = alpha;

        this.instance = mp.browsers.newHeadless(url, width, height);

        this.instance.inputEnabled = false;
        this.instance.ready = false;

        allInstances.push(this);
    }

    setPosition(x, y, z) {
        this.position = new mp.Vector3(x, y, z);
    }

    setHeading(heading) {
        this.heading = heading;
    }

    destroy() {
        if (this.instance != null)
            this.instance.destroy();

        allInstances.splice(allInstances.indexOf(this), 1);
        return null;
    }

    setInputFocused(toggle) {
        this.instance.inputEnabled = toggle;
    }

    hide() {
        this.instance.active = false;
    }

    show() {
        this.instance.active = true;
    }

    get isFocused() {
        return this.instance.inputEnabled;
    }

    get isReady() {
        return this.instance.ready;
    }
};

mp.events.add({
    "render": () => {
        allInstances.forEach(element => {
            if (element.instance.active) {
                drawTexture3D(element.position, element.instance.headlessTextureDict, element.instance.headlessTextureName, {
                    scaleX: element.width * element.scale,
                    scaleY: element.height * element.scale,
                    heading: element.heading,
                    alpha: element.alpha,  
                });
            }
        });
    },

    "browserDomReady": (browser) => {
        var browser3d = allInstances.find(x => x.instance === browser);
        if (!browser3d || browser3d === undefined) return;

        browser3d.instance.ready = true;
    }
})

mp.Browser3d = Browser3d;

const getObjectOffset = function(position, heading, offset) {
    return mp.game.object.getObjectOffsetFromCoords(
        position.x,
        position.y,
        position.z,
        heading,
        offset.x,
        offset.y,
        offset.z
    );
};

const drawTexture3D = function(position, textureDict, textureName, {scaleX = 1, scaleY = 1, heading = 0, alpha = 255}) {
    if (!mp.game.graphics.hasStreamedTextureDictLoaded(textureDict)) {
        mp.game.graphics.requestStreamedTextureDict(textureDict, true);
        return;
    }

    let pos1 = new mp.Vector3(-0.5 * scaleX, 0, 0.5 * scaleY);
    let pos2 = new mp.Vector3(0.5 * scaleX, 0, 0.5 * scaleY);
    let pos3 = new mp.Vector3(-0.5 * scaleX, 0, -0.5 * scaleY);
    let pos4 = new mp.Vector3(0.5 * scaleX, 0, -0.5 * scaleY);

    let finalPos1 = getObjectOffset(position, heading, pos1);
    let finalPos2 = getObjectOffset(position, heading, pos2);
    let finalPos3 = getObjectOffset(position, heading, pos3);
    let finalPos4 = getObjectOffset(position, heading, pos4);

    mp.game.invoke('0x29280002282F1928', finalPos1.x, finalPos1.y, finalPos1.z, finalPos3.x, finalPos3.y, finalPos3.z, finalPos2.x, finalPos2.y, finalPos2.z, 255, 255, 255, alpha, textureDict, textureName, 0.000000001, 0.000000001, 0.000000001, 0.000000001, 0.999999999, 0.000000001, 0.999999999, 0.000000001, 0.000000001, );
    mp.game.invoke('0x29280002282F1928', finalPos3.x, finalPos3.y, finalPos3.z, finalPos4.x, finalPos4.y, finalPos4.z, finalPos2.x, finalPos2.y, finalPos2.z, 255, 255, 255, alpha, textureDict, textureName, 0.000000001, 0.999999999, 0.000000001, 0.999999999, 0.999999999, 0.000000001, 0.999999999, 0.000000001, 0.000000001, );
};