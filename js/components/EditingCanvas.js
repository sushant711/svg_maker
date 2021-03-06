import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { HotKeys, configure as hotkeys_configure } from "react-hotkeys";
import { to_opacity_float, wrap_svg } from "../utils";
import { canvas__set_dimensions, editor__add_new_unit_path, editor__select_unit_path,
         editor__add_line,  editor__add_cubic, editor__add_smooth_cubic, editor__add_quadratic,
         editor__add_smooth_quadratic, editor__toggle_enclosure, editor__reposition_point,
         editor__reposition_unit_path, editor__reposition_first_control_pt,
         editor__reposition_second_control_pt, editor__delete_element } from '../redux/actions';
import LayerSet from '../core/Layer';

hotkeys_configure({
  ignoreRepeatedEventsWhenKeyHeldDown: false
});

const POSITIONS = {
  UP:    {coords: [0, -1], keyCode: 'up'},
  DOWN:  {coords: [0, 1],  keyCode: 'down'},
  LEFT:  {coords: [-1, 0], keyCode: 'left'},
  RIGHT: {coords: [1, 0],  keyCode: 'right'}
}

class EditingCanvas extends Component {
  constructor(props) {
    super(props);
    this._position_based_actions = this._getPositionBasedActions();
    this._keyMap = this._getKeyMap();
    this._keyHandlers = this._getKeyHandlers();
  }

  _getPositionBasedActions() {
    return {
      MV_ELEMENT: {
        key: pos_key => `MV_ELEMENT_${pos_key}`,
        keyCode: pos_key => {
          const pos_key_code = POSITIONS[pos_key].keyCode;
          return [`${pos_key_code}`, `shift+${pos_key_code}`];
        },
        fn: (pos_key, event) => {
          event.preventDefault();
          console.log(`MV_ELEMENT_${pos_key}`);
          let coords = POSITIONS[pos_key].coords;
          coords = event.shiftKey ? coords.map(d => d*10) : coords;
          this.props.editor__reposition_point(...coords);
        }
      },
      MV_UNIT_PATH: {
        key: pos_key => `MV_UNIT_PATH_${pos_key}`,
        keyCode: pos_key => {
          const pos_key_code = POSITIONS[pos_key].keyCode;
          return [`alt+${pos_key_code}`, `alt+shift+${pos_key_code}`];
        },
        fn: (pos_key, event) => {
          event.preventDefault();
          console.log(`MV_UNIT_PATH_${pos_key}`);
          let coords = POSITIONS[pos_key].coords;
          coords = event.shiftKey ? coords.map(d => d*10) : coords;
          this.props.editor__reposition_unit_path(...coords);
        }
      },
      MV_FIRST_CONTROL_PT: {
        key: pos_key => `MV_FIRST_CONTROL_PT_${pos_key}`,
        keyCode: pos_key => {
          const pos_key_code = POSITIONS[pos_key].keyCode;
          return [`1+${pos_key_code}`, `1+shift+${pos_key_code}`];
        },
        fn: (pos_key, event) => {
          event.preventDefault();
          console.log(`MV_FIRST_CONTROL_PT_${pos_key}`);
          let coords = POSITIONS[pos_key].coords;
          coords = event.shiftKey ? coords.map(d => d*10) : coords;
          this.props.editor__reposition_first_control_pt(...coords);
        }
      },
      MV_SECOND_CONTROL_PT: {
        key: pos_key => `MV_SECOND_CONTROL_PT_${pos_key}`,
        keyCode: pos_key => {
          const pos_key_code = POSITIONS[pos_key].keyCode;
          return [`2+${pos_key_code}`, `2+shift+${pos_key_code}`];
        },
        fn: (pos_key, event) => {
          event.preventDefault();
          console.log(`MV_SECOND_CONTROL_PT_${pos_key}`);
          let coords = POSITIONS[pos_key].coords;
          coords = event.shiftKey ? coords.map(d => d*10) : coords;
          this.props.editor__reposition_second_control_pt(...coords);
        }
      }
    }
  }

  _getRepositionKeyMap() {
    let key_map = {};
    let action = null;
    for (let pos_key in POSITIONS) {
      for (let action_key in this._position_based_actions) {
        action = this._position_based_actions[action_key];
        key_map[action.key(pos_key)] = action.keyCode(pos_key);
      }
    }
    return key_map;
  }

  _getRepositionHandlerMap() {
    let fn_map = {};
    let action = null;
    for (let pos_key in POSITIONS) {
      for (let action_key in this._position_based_actions) {
        action = this._position_based_actions[action_key];
        fn_map[action.key(pos_key)] = action.fn.bind(this, pos_key);
      }
    }
    return fn_map;
  }

  _getKeyMap() {
    return {
      ...this._getRepositionKeyMap(),
      ADD_NEW_UNIT_PATH: "n",
      SELECT_PREV_UNIT_PATH: "shift+,",
      SELECT_NEXT_UNIT_PATH: "shift+.",
      ADD_LINE: "l",
      ADD_CUBIC: "c",
      ADD_SMOOTH_CUBIC: "s",
      ADD_QUADRATIC: "q",
      ADD_SMOOTH_QUADRATIC: "t",
      TOGGLE_ENCLOSURE: "z",
      DELETE: ["del", "backspace"]
    };
  }

  _getKeyHandlers() {
    return {
      ...this._getRepositionHandlerMap(),
      ADD_NEW_UNIT_PATH: event => {
        event.preventDefault();
        console.log('ADD_NEW_UNIT_PATH');
        this.props.editor__add_new_unit_path();
      },
      SELECT_PREV_UNIT_PATH: event => {
        event.preventDefault();
        console.log('SELECT_PREV_UNIT_PATH');
        this.props.editor__select_unit_path(-1);
      },
      SELECT_NEXT_UNIT_PATH: event => {
        event.preventDefault();
        console.log('SELECT_NEXT_UNIT_PATH');
        this.props.editor__select_unit_path(1);
      },
      ADD_LINE: event => {
        event.preventDefault();
        console.log('ADD_LINE');
        this.props.editor__add_line(0, 0);
      },
      ADD_CUBIC: event => {
        event.preventDefault();
        console.log('ADD_CUBIC');
        this.props.editor__add_cubic(0, 0, 0, 0, 0, 0);
      },
      ADD_SMOOTH_CUBIC: event => {
        event.preventDefault();
        console.log('ADD_SMOOTH_CUBIC');
        this.props.editor__add_smooth_cubic(0, 0, 0, 0);
      },
      ADD_QUADRATIC: event => {
        event.preventDefault();
        console.log('ADD_QUADRATIC');
        this.props.editor__add_quadratic(0, 0, 0, 0);
      },
      ADD_SMOOTH_QUADRATIC: event => {
        event.preventDefault();
        console.log('ADD_SMOOTH_QUADRATIC');
        this.props.editor__add_smooth_quadratic(0, 0);
      },
      TOGGLE_ENCLOSURE: event => {
        event.preventDefault();
        console.log('TOGGLE_ENCLOSURE');
        this.props.editor__toggle_enclosure();
      },
      DELETE: event => {
        event.preventDefault();
        console.log('DELETE');
        this.props.editor__delete_element();
      }
    };
  }

  handleImgLoad(event) {
    this.props.canvas__set_dimensions(event.target.width, event.target.height);
  }

  render() {
    const ref_img_styles = {
      opacity: to_opacity_float(this.props.ref_img_opacity)
    };
    const {width, height} = this.props.canvas_dimensions;
    const layer_styles = {
      width: width,
      height: height,
      border: width ? '1px solid #000': '0'
    };
    const layer_to_edit = this.props.layer_set.layer_to_edit;

    return (
      <HotKeys className="hotkeys" keyMap={this._keyMap} handlers={this._keyHandlers}>
        <div className="editing-canvas-wrapper">
          <div className="mode-switcher">
            <Link to="/canvas/preview">Preview</Link>
          </div>
          <div className="status-bar">
            {layer_to_edit ? layer_to_edit.getLastElementRenderCode(): null}
          </div>
          <div className="editing-canvas">
            <div className="ref-img-wrapper" style={ref_img_styles}>
              <img src={this.props.ref_img_src} onLoad={this.handleImgLoad.bind(this)}/>
            </div>
            <div className="layer-wrapper" style={layer_styles}>
              {layer_to_edit ? wrap_svg([
                layer_to_edit.getPathCode(),
                layer_to_edit.getGuideCode()
              ], width, height): null}
            </div>
          </div>
        </div>
      </HotKeys>
    );
  }
}

EditingCanvas.propTypes = {
  ref_img_src: PropTypes.string,
  ref_img_opacity: PropTypes.string,
  layer_set: PropTypes.instanceOf(LayerSet),
  canvas_dimensions: PropTypes.object
};

const mapStateToProps = (state, props) => ({
  ref_img_src: state.canvas.ref_img_src,
  ref_img_opacity: state.canvas.ref_img_opacity,
  layer_set: state.layers.layer_set,
  canvas_dimensions: state.canvas.dimensions
});

const mapDispatchToProps = {
  canvas__set_dimensions,
  editor__reposition_point,
  editor__reposition_unit_path,
  editor__reposition_first_control_pt,
  editor__reposition_second_control_pt,
  editor__add_new_unit_path,
  editor__select_unit_path,
  editor__add_line,
  editor__add_cubic,
  editor__add_smooth_cubic,
  editor__add_quadratic,
  editor__add_smooth_quadratic,
  editor__toggle_enclosure,
  editor__delete_element
}

export default connect(mapStateToProps, mapDispatchToProps)(EditingCanvas);
