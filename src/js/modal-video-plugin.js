import ModalVideo from "modal-video";

let btns = document.querySelectorAll('[data-video-id]')

if (btns.length) {

    new ModalVideo(btns, {
        channel: "youtube",
        autoplay: 1,
        mute: 1
    });
}
