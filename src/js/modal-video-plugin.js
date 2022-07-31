"use strict";

import ModalVideo from "modal-video/lib/core";

let btns = document.querySelectorAll('[data-video-id]')

if (btns.length) {
    new ModalVideo(btns);
}
