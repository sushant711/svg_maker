import keyMirror from 'keymirror';

export const CONTROLS__SET_MODE = 'CONTROLS__SET_MODE';
export const CONTROLS__SET_REF_IMAGE = 'CONTROLS__SET_REF_IMAGE';
export const CONTROLS__SET_REF_IMAGE_OPACITY = 'CONTROLS__SET_REF_IMAGE_OPACITY';

export const EDITOR__SET_LAYER_DIMENSIONS = 'EDITOR__SET_LAYER_DIMENSIONS';
export const EDITOR__MOVE_TO = 'EDITOR__MOVE_TO';
export const EDITOR__ADD_LINE = 'EDITOR__ADD_LINE';
export const EDITOR__TOGGLE_ENCLOSURE = 'EDITOR__TOGGLE_ENCLOSURE';
export const EDITOR__REPOSITION_POINT = 'EDITOR__REPOSITION_POINT';
export const EDITOR__DELETE_ELEMENT = 'EDITOR__DELETE_ELEMENT';

export const LAYERS__ADD_LAYER = 'LAYERS__ADD_LAYER';
export const LAYERS__SELECT_LAYER = 'LAYERS__SELECT_LAYER';
export const LAYERS__SET_STROKE_WIDTH = 'LAYERS__SET_STROKE_WIDTH';
export const LAYERS__SET_STROKE = 'LAYERS__SET_STROKE';
export const LAYERS__SET_FILL = 'LAYERS__SET_FILL';


export const controls__set_mode = mode => ({
  type: CONTROLS__SET_MODE,
  payload: mode
});

export const controls__set_ref_image = ref_img_src => ({
  type: CONTROLS__SET_REF_IMAGE,
  payload: ref_img_src
});

export const controls__set_ref_image_opacity = ref_img_opacity => ({
  type: CONTROLS__SET_REF_IMAGE_OPACITY,
  payload: ref_img_opacity
});

export const editor__set_layer_dimensions = (width, height) => ({
  type: EDITOR__SET_LAYER_DIMENSIONS,
  payload: {width: width, height: height}
});

export const editor__move_to = (dx=0, dy=0) => ({
  type: EDITOR__MOVE_TO,
  payload: {dx: dx, dy: dy}
});

export const editor__add_line = (dx, dy) => ({
  type: EDITOR__ADD_LINE,
  payload: {dx: dx, dy: dy}
});

export const editor__toggle_enclosure = () => ({
  type: EDITOR__TOGGLE_ENCLOSURE,
  payload: null
});

export const editor__delete_element = () => ({
  type: EDITOR__DELETE_ELEMENT,
  payload: null
});

export const editor__reposition_point = (dx, dy) => ({
  type: EDITOR__REPOSITION_POINT,
  payload: {dx: dx, dy: dy}
});

export const layers__add_layer = () => ({
  type: LAYERS__ADD_LAYER,
  payload: null
});

export const layers__select_layer = idx => ({
  type: LAYERS__SELECT_LAYER,
  payload: idx
});

export const layers__set_stroke_width = (idx, stroke_width) => ({
  type: LAYERS__SET_STROKE_WIDTH,
  payload: {idx: idx, stroke_width: stroke_width}
});

export const layers__set_stroke = (idx, hex) => ({
  type: LAYERS__SET_STROKE,
  payload: {idx: idx, hex: hex}
});

export const layers__set_fill = (idx, hex) => ({
  type: LAYERS__SET_FILL,
  payload: {idx: idx, hex: hex}
});
