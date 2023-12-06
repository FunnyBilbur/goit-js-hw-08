import { images } from './gallery-items.js';

const gallery = document.querySelector('.gallery');
const markup = images.map(({ preview, original, description }) =>
    `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"/>
    </a>
    </li>`
);
// console.log(markup);

gallery.insertAdjacentHTML("beforeend", markup.join(""));

gallery.addEventListener('click', onClick);
function onClick(evt) {
    evt.preventDefault();
    const { target } = evt;
    if (!target.classList.contains("gallery__image")) {
        // console.log('Bye');
        return;
    }
    // console.log('Hello');
    // console.dir(target);

    const alt = target.dataset.source ?? target.closest(".gallery__image").dataset.source;
    const currentImg = images.find(({ original }) => original === alt);

    // console.log('Alt:', alt);
    // console.log('CurrentImg', currentImg);
    // console.log(currentImg.description);

    const instance = basicLightbox.create(
        `<div>
    <img class="gallery__images"
    src="${currentImg.original}"
    alt="${currentImg.description}"/>
    </div>`);
    instance.show();

    // if (instance.visible()) {
    //     console.log('Invisible');
    //     addEventListener('keydown', onKey);
    // }

    // if (!instance.visible()) {
    //     console.log('Visible');
    //     removeEventListener('keydown', onKey, false);

    // }

    // if (instance.visible()) {
    //     console.log('Not Visible');

    // }
    let isOpen = false;
    if (instance.visible()) {
        isOpen = true;
        addEventListener('keydown', onKey);
    }

    if (isOpen == false) {
        removeEventListener('keydown', onKey);
    }

    function onKey(params) {
        if (params.code === "Escape") {
            instance.close();
            console.log(params);
            console.log('Instance:', instance.visible());
            instance.close();
        }
    }

    // if (!instance.visible()) {
    //     console.log(params);
    //     // return;
    // }

    // gallery.removeEventListener('keydown', onKey);








}