import {renderThumbnails} from './render-thumbnails.js';
import {registerFileDownloadControlEvent, closeModalForm} from './form.js';
import {setUserFormSubmit} from './validate-form.js';
import {getData} from './api.js';
import {showAlertGet} from './util.js';
import {saveThumbnails} from './photo-modal.js';

getData().then((photos) => {
  saveThumbnails(photos);
  renderThumbnails(photos);
}).catch(() => {
  showAlertGet();
});

registerFileDownloadControlEvent();
setUserFormSubmit(closeModalForm);


