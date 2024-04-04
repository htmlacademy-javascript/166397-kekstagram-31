import {renderThumbnails} from './render-thumbnails.js';
import {setFileUploadControlEvent} from './form.js';
import {getData} from './api.js';
import {showAlertGet} from './util.js';
import {saveThumbnails} from './photo-modal.js';
import {setFiltersClick} from './filters.js';

getData().then((photos) => {
  saveThumbnails(photos);
  renderThumbnails(photos);

  setFiltersClick(photos);
}).catch(showAlertGet);

setFileUploadControlEvent();
