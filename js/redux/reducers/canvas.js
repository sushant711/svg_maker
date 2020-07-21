import { CANVAS_MODES } from '../../constants';
import {CANVAS__SET_MODE, CANVAS__SET_REF_IMAGE, CANVAS__SET_REF_IMAGE_OPACITY} from '../actions';
import { reducer } from '../../utils';

const initial_state = {
  mode: CANVAS_MODES.edit,
  ref_img_src: 'http://2.bp.blogspot.com/-duG2Fz2J_58/UyC8h0nR7vI/AAAAAAAAOjI/o9NgcHHGShg/s1600/kraft_paper_texture_texturise.jpg',
  ref_img_opacity: 0.5
};

export default reducer(initial_state, {
  [CANVAS__SET_MODE]: (state, payload) => {
    return {
      ...state,
      mode: payload
    };
  },
  [CANVAS__SET_REF_IMAGE]: (state, payload) => {
    return {
      ...state,
      ref_img_src: payload
    };
  },
  [CANVAS__SET_REF_IMAGE_OPACITY]: (state, payload) => {
    return {
      ...state,
      ref_img_opacity: payload
    };
  }
});