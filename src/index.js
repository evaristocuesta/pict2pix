import Pict2Pix from "./pict2pix.js";

var pict2PixArray = {};

export function animate(config) {
    if (!pict2PixArray[config.image.id]) {
        pict2PixArray[config.image.id] = {pict2pix: new Pict2Pix(config), running: true};
    }
    pict2PixArray[config.image.id].running = true;
    pict2PixArray[config.image.id].pict2pix.start();
}

export function stop(id) {
    pict2PixArray[id].running = false;
    pict2PixArray[id].pict2pix.stop();
}

function startAll() {
    for (var key in pict2PixArray) {
        if (pict2PixArray[key].running) {
            pict2PixArray[key].pict2pix.start();
        }
    }
}

function stopAll() {
    for (var key in pict2PixArray) {
        if (pict2PixArray[key].running) {
            pict2PixArray[key].pict2pix.stop();
        }
    }
}

function handleVisibilityChange() {
    if (document.visibilityState === "hidden") {
        stopAll();
    } else  {
        startAll();
    }
  }
  
  document.addEventListener("visibilitychange", handleVisibilityChange, false);
  