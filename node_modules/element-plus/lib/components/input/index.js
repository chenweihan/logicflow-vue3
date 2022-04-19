'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var withInstall = require('element-plus/lib/utils/with-install');
var vue = require('vue');
var tokens = require('element-plus/lib/tokens');
var hooks = require('element-plus/lib/hooks');
var constants = require('element-plus/lib/utils/constants');
var util = require('element-plus/lib/utils/util');
var isServer = require('element-plus/lib/utils/isServer');
var isDef = require('element-plus/lib/utils/isDef');
var shared = require('@vue/shared');
var props = require('element-plus/lib/utils/props');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var isServer__default = /*#__PURE__*/_interopDefaultLegacy(isServer);

let hiddenTextarea = void 0;
const HIDDEN_STYLE = `
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
`;
const CONTEXT_STYLE = [
  "letter-spacing",
  "line-height",
  "padding-top",
  "padding-bottom",
  "font-family",
  "font-weight",
  "font-size",
  "text-rendering",
  "text-transform",
  "width",
  "text-indent",
  "padding-left",
  "padding-right",
  "border-width",
  "box-sizing"
];
function calculateNodeStyling(targetElement) {
  const style = window.getComputedStyle(targetElement);
  const boxSizing = style.getPropertyValue("box-sizing");
  const paddingSize = parseFloat(style.getPropertyValue("padding-bottom")) + parseFloat(style.getPropertyValue("padding-top"));
  const borderSize = parseFloat(style.getPropertyValue("border-bottom-width")) + parseFloat(style.getPropertyValue("border-top-width"));
  const contextStyle = CONTEXT_STYLE.map((name) => `${name}:${style.getPropertyValue(name)}`).join(";");
  return { contextStyle, paddingSize, borderSize, boxSizing };
}
function calcTextareaHeight(targetElement, minRows = 1, maxRows) {
  var _a;
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement("textarea");
    document.body.appendChild(hiddenTextarea);
  }
  const { paddingSize, borderSize, boxSizing, contextStyle } = calculateNodeStyling(targetElement);
  hiddenTextarea.setAttribute("style", `${contextStyle};${HIDDEN_STYLE}`);
  hiddenTextarea.value = targetElement.value || targetElement.placeholder || "";
  let height = hiddenTextarea.scrollHeight;
  const result = {};
  if (boxSizing === "border-box") {
    height = height + borderSize;
  } else if (boxSizing === "content-box") {
    height = height - paddingSize;
  }
  hiddenTextarea.value = "";
  const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
  if (util.isNumber(minRows)) {
    let minHeight = singleRowHeight * minRows;
    if (boxSizing === "border-box") {
      minHeight = minHeight + paddingSize + borderSize;
    }
    height = Math.max(minHeight, height);
    result.minHeight = `${minHeight}px`;
  }
  if (util.isNumber(maxRows)) {
    let maxHeight = singleRowHeight * maxRows;
    if (boxSizing === "border-box") {
      maxHeight = maxHeight + paddingSize + borderSize;
    }
    height = Math.min(maxHeight, height);
  }
  result.height = `${height}px`;
  (_a = hiddenTextarea.parentNode) == null ? void 0 : _a.removeChild(hiddenTextarea);
  hiddenTextarea = void 0;
  return result;
}

var __defProp$1 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$1.call(b, prop))
      __defNormalProp$1(a, prop, b[prop]);
  if (__getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(b)) {
      if (__propIsEnum$1.call(b, prop))
        __defNormalProp$1(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const inputProps = props.buildProps(__spreadProps(__spreadValues$1({}, hooks.useFormItemProps), {
  modelValue: {
    type: props.definePropType(void 0),
    default: ""
  },
  type: {
    type: String,
    default: "text"
  },
  resize: {
    type: String,
    values: ["none", "both", "horizontal", "vertical"]
  },
  autosize: {
    type: props.definePropType([Boolean, Object]),
    default: false
  },
  autocomplete: {
    type: String,
    default: "off"
  },
  placeholder: {
    type: String
  },
  form: {
    type: String,
    default: ""
  },
  readonly: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  showPassword: {
    type: Boolean,
    default: false
  },
  showWordLimit: {
    type: Boolean,
    default: false
  },
  suffixIcon: {
    type: String,
    default: ""
  },
  prefixIcon: {
    type: String,
    default: ""
  },
  label: {
    type: String
  },
  tabindex: {
    type: [Number, String]
  },
  validateEvent: {
    type: Boolean,
    default: true
  },
  inputStyle: {
    type: props.definePropType([Object, Array, String]),
    default: () => props.mutable({})
  },
  maxlength: {
    type: [Number, String]
  }
}));
const inputEmits = {
  [constants.UPDATE_MODEL_EVENT]: (value) => shared.isString(value),
  input: (value) => shared.isString(value),
  change: (value) => shared.isString(value),
  focus: (evt) => evt instanceof FocusEvent,
  blur: (evt) => evt instanceof FocusEvent,
  clear: () => true,
  mouseleave: (evt) => evt instanceof MouseEvent,
  mouseenter: (evt) => evt instanceof MouseEvent,
  keydown: (evt) => evt instanceof KeyboardEvent,
  compositionstart: (evt) => evt instanceof CompositionEvent,
  compositionupdate: (evt) => evt instanceof CompositionEvent,
  compositionend: (evt) => evt instanceof CompositionEvent
};

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
const PENDANT_MAP = {
  suffix: "append",
  prefix: "prepend"
};
var script = vue.defineComponent({
  name: "ElInput",
  inheritAttrs: false,
  props: inputProps,
  emits: inputEmits,
  setup(props, { slots, emit, attrs: rawAttrs }) {
    const instance = vue.getCurrentInstance();
    const attrs = hooks.useAttrs();
    const elForm = vue.inject(tokens.elFormKey, void 0);
    const elFormItem = vue.inject(tokens.elFormItemKey, void 0);
    const { size: inputSize, disabled: inputDisabled } = hooks.useFormItem({});
    const input = vue.ref();
    const textarea = vue.ref();
    const focused = vue.ref(false);
    const hovering = vue.ref(false);
    const isComposing = vue.ref(false);
    const passwordVisible = vue.ref(false);
    const _textareaCalcStyle = vue.shallowRef(props.inputStyle);
    const inputOrTextarea = vue.computed(() => input.value || textarea.value);
    const needStatusIcon = vue.computed(() => {
      var _a;
      return (_a = elForm == null ? void 0 : elForm.statusIcon) != null ? _a : false;
    });
    const validateState = vue.computed(() => (elFormItem == null ? void 0 : elFormItem.validateState) || "");
    const validateIcon = vue.computed(() => constants.VALIDATE_STATE_MAP[validateState.value]);
    const containerStyle = vue.computed(() => rawAttrs.style);
    const computedTextareaStyle = vue.computed(() => [
      props.inputStyle,
      _textareaCalcStyle.value,
      { resize: props.resize }
    ]);
    const nativeInputValue = vue.computed(() => props.modelValue === null || props.modelValue === void 0 ? "" : String(props.modelValue));
    const showClear = vue.computed(() => props.clearable && !inputDisabled.value && !props.readonly && !!nativeInputValue.value && (focused.value || hovering.value));
    const showPwdVisible = vue.computed(() => props.showPassword && !inputDisabled.value && !props.readonly && (!!nativeInputValue.value || focused.value));
    const isWordLimitVisible = vue.computed(() => props.showWordLimit && !!props.maxlength && (props.type === "text" || props.type === "textarea") && !inputDisabled.value && !props.readonly && !props.showPassword);
    const textLength = vue.computed(() => Array.from(nativeInputValue.value).length);
    const inputExceed = vue.computed(() => !!isWordLimitVisible.value && textLength.value > Number(props.maxlength));
    const resizeTextarea = () => {
      const { type, autosize } = props;
      if (isServer__default["default"] || type !== "textarea")
        return;
      if (autosize) {
        const minRows = util.isObject(autosize) ? autosize.minRows : void 0;
        const maxRows = util.isObject(autosize) ? autosize.maxRows : void 0;
        _textareaCalcStyle.value = __spreadValues({}, calcTextareaHeight(textarea.value, minRows, maxRows));
      } else {
        _textareaCalcStyle.value = {
          minHeight: calcTextareaHeight(textarea.value).minHeight
        };
      }
    };
    const setNativeInputValue = () => {
      const input2 = inputOrTextarea.value;
      if (!input2 || input2.value === nativeInputValue.value)
        return;
      input2.value = nativeInputValue.value;
    };
    const calcIconOffset = (place) => {
      const { el } = instance.vnode;
      if (!el)
        return;
      const elList = Array.from(el.querySelectorAll(`.el-input__${place}`));
      const target = elList.find((item) => item.parentNode === el);
      if (!target)
        return;
      const pendant = PENDANT_MAP[place];
      if (slots[pendant]) {
        target.style.transform = `translateX(${place === "suffix" ? "-" : ""}${el.querySelector(`.el-input-group__${pendant}`).offsetWidth}px)`;
      } else {
        target.removeAttribute("style");
      }
    };
    const updateIconOffset = () => {
      calcIconOffset("prefix");
      calcIconOffset("suffix");
    };
    const handleInput = (event) => {
      let { value } = event.target;
      if (isComposing.value)
        return;
      if (value === nativeInputValue.value)
        return;
      if (props.maxlength) {
        const sliceIndex = inputExceed.value ? textLength.value : props.maxlength;
        value = Array.from(value).slice(0, Number(sliceIndex)).join("");
      }
      emit(constants.UPDATE_MODEL_EVENT, value);
      emit("input", value);
      vue.nextTick(setNativeInputValue);
    };
    const handleChange = (event) => {
      emit("change", event.target.value);
    };
    const focus = () => {
      vue.nextTick(() => {
        var _a;
        (_a = inputOrTextarea.value) == null ? void 0 : _a.focus();
      });
    };
    const blur = () => {
      var _a;
      (_a = inputOrTextarea.value) == null ? void 0 : _a.blur();
    };
    const handleFocus = (event) => {
      focused.value = true;
      emit("focus", event);
    };
    const handleBlur = (event) => {
      var _a;
      focused.value = false;
      emit("blur", event);
      if (props.validateEvent) {
        (_a = elFormItem == null ? void 0 : elFormItem.validate) == null ? void 0 : _a.call(elFormItem, "blur");
      }
    };
    const select = () => {
      var _a;
      (_a = inputOrTextarea.value) == null ? void 0 : _a.select();
    };
    const handleCompositionStart = (event) => {
      emit("compositionstart", event);
      isComposing.value = true;
    };
    const handleCompositionUpdate = (event) => {
      var _a;
      emit("compositionupdate", event);
      const text = (_a = event.target) == null ? void 0 : _a.value;
      const lastCharacter = text[text.length - 1] || "";
      isComposing.value = !isDef.isKorean(lastCharacter);
    };
    const handleCompositionEnd = (event) => {
      emit("compositionend", event);
      if (isComposing.value) {
        isComposing.value = false;
        handleInput(event);
      }
    };
    const clear = () => {
      emit(constants.UPDATE_MODEL_EVENT, "");
      emit("change", "");
      emit("clear");
      emit("input", "");
    };
    const handlePasswordVisible = () => {
      passwordVisible.value = !passwordVisible.value;
      focus();
    };
    const suffixVisible = vue.computed(() => !!slots.suffix || !!props.suffixIcon || showClear.value || props.showPassword || isWordLimitVisible.value || !!validateState.value && needStatusIcon.value);
    vue.watch(() => props.modelValue, () => {
      var _a;
      vue.nextTick(resizeTextarea);
      if (props.validateEvent) {
        (_a = elFormItem == null ? void 0 : elFormItem.validate) == null ? void 0 : _a.call(elFormItem, "change");
      }
    });
    vue.watch(nativeInputValue, () => setNativeInputValue());
    vue.watch(() => props.type, () => {
      vue.nextTick(() => {
        setNativeInputValue();
        resizeTextarea();
        updateIconOffset();
      });
    });
    vue.onMounted(() => {
      setNativeInputValue();
      updateIconOffset();
      vue.nextTick(resizeTextarea);
    });
    vue.onUpdated(() => {
      vue.nextTick(updateIconOffset);
    });
    const onMouseLeave = (evt) => {
      hovering.value = false;
      emit("mouseleave", evt);
    };
    const onMouseEnter = (evt) => {
      hovering.value = true;
      emit("mouseenter", evt);
    };
    const handleKeydown = (evt) => {
      emit("keydown", evt);
    };
    return {
      input,
      textarea,
      attrs,
      inputSize,
      validateState,
      validateIcon,
      containerStyle,
      computedTextareaStyle,
      inputDisabled,
      showClear,
      showPwdVisible,
      isWordLimitVisible,
      textLength,
      hovering,
      inputExceed,
      passwordVisible,
      inputOrTextarea,
      suffixVisible,
      resizeTextarea,
      handleInput,
      handleChange,
      handleFocus,
      handleBlur,
      handleCompositionStart,
      handleCompositionUpdate,
      handleCompositionEnd,
      handlePasswordVisible,
      clear,
      select,
      focus,
      blur,
      onMouseLeave,
      onMouseEnter,
      handleKeydown
    };
  }
});

const _hoisted_1 = {
  key: 0,
  class: "el-input-group__prepend"
};
const _hoisted_2 = ["type", "disabled", "readonly", "autocomplete", "tabindex", "aria-label", "placeholder"];
const _hoisted_3 = {
  key: 1,
  class: "el-input__prefix"
};
const _hoisted_4 = {
  key: 2,
  class: "el-input__suffix"
};
const _hoisted_5 = { class: "el-input__suffix-inner" };
const _hoisted_6 = {
  key: 3,
  class: "el-input__count"
};
const _hoisted_7 = { class: "el-input__count-inner" };
const _hoisted_8 = {
  key: 3,
  class: "el-input-group__append"
};
const _hoisted_9 = ["tabindex", "disabled", "readonly", "autocomplete", "aria-label", "placeholder"];
const _hoisted_10 = {
  key: 0,
  class: "el-input__count"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass([
      _ctx.type === "textarea" ? "el-textarea" : "el-input",
      _ctx.inputSize ? "el-input--" + _ctx.inputSize : "",
      {
        "is-disabled": _ctx.inputDisabled,
        "is-exceed": _ctx.inputExceed,
        "el-input-group": _ctx.$slots.prepend || _ctx.$slots.append,
        "el-input-group--append": _ctx.$slots.append,
        "el-input-group--prepend": _ctx.$slots.prepend,
        "el-input--prefix": _ctx.$slots.prefix || _ctx.prefixIcon,
        "el-input--suffix": _ctx.$slots.suffix || _ctx.suffixIcon || _ctx.clearable || _ctx.showPassword,
        "el-input--suffix--password-clear": _ctx.clearable && _ctx.showPassword
      },
      _ctx.$attrs.class
    ]),
    style: vue.normalizeStyle(_ctx.containerStyle),
    onMouseenter: _cache[19] || (_cache[19] = (...args) => _ctx.onMouseEnter && _ctx.onMouseEnter(...args)),
    onMouseleave: _cache[20] || (_cache[20] = (...args) => _ctx.onMouseLeave && _ctx.onMouseLeave(...args))
  }, [
    vue.createCommentVNode(" input "),
    _ctx.type !== "textarea" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
      vue.createCommentVNode(" prepend slot "),
      _ctx.$slots.prepend ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
        vue.renderSlot(_ctx.$slots, "prepend")
      ])) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("input", vue.mergeProps({
        ref: "input",
        class: "el-input__inner"
      }, _ctx.attrs, {
        type: _ctx.showPassword ? _ctx.passwordVisible ? "text" : "password" : _ctx.type,
        disabled: _ctx.inputDisabled,
        readonly: _ctx.readonly,
        autocomplete: _ctx.autocomplete,
        tabindex: _ctx.tabindex,
        "aria-label": _ctx.label,
        placeholder: _ctx.placeholder,
        style: _ctx.inputStyle,
        onCompositionstart: _cache[0] || (_cache[0] = (...args) => _ctx.handleCompositionStart && _ctx.handleCompositionStart(...args)),
        onCompositionupdate: _cache[1] || (_cache[1] = (...args) => _ctx.handleCompositionUpdate && _ctx.handleCompositionUpdate(...args)),
        onCompositionend: _cache[2] || (_cache[2] = (...args) => _ctx.handleCompositionEnd && _ctx.handleCompositionEnd(...args)),
        onInput: _cache[3] || (_cache[3] = (...args) => _ctx.handleInput && _ctx.handleInput(...args)),
        onFocus: _cache[4] || (_cache[4] = (...args) => _ctx.handleFocus && _ctx.handleFocus(...args)),
        onBlur: _cache[5] || (_cache[5] = (...args) => _ctx.handleBlur && _ctx.handleBlur(...args)),
        onChange: _cache[6] || (_cache[6] = (...args) => _ctx.handleChange && _ctx.handleChange(...args)),
        onKeydown: _cache[7] || (_cache[7] = (...args) => _ctx.handleKeydown && _ctx.handleKeydown(...args))
      }), null, 16, _hoisted_2),
      vue.createCommentVNode(" prefix slot "),
      _ctx.$slots.prefix || _ctx.prefixIcon ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_3, [
        vue.renderSlot(_ctx.$slots, "prefix"),
        _ctx.prefixIcon ? (vue.openBlock(), vue.createElementBlock("i", {
          key: 0,
          class: vue.normalizeClass(["el-input__icon", _ctx.prefixIcon])
        }, null, 2)) : vue.createCommentVNode("v-if", true)
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" suffix slot "),
      _ctx.suffixVisible ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_4, [
        vue.createElementVNode("span", _hoisted_5, [
          !_ctx.showClear || !_ctx.showPwdVisible || !_ctx.isWordLimitVisible ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
            vue.renderSlot(_ctx.$slots, "suffix"),
            _ctx.suffixIcon ? (vue.openBlock(), vue.createElementBlock("i", {
              key: 0,
              class: vue.normalizeClass(["el-input__icon", _ctx.suffixIcon])
            }, null, 2)) : vue.createCommentVNode("v-if", true)
          ], 64)) : vue.createCommentVNode("v-if", true),
          _ctx.showClear ? (vue.openBlock(), vue.createElementBlock("i", {
            key: 1,
            class: "el-input__icon el-icon-circle-close el-input__clear",
            onMousedown: _cache[8] || (_cache[8] = vue.withModifiers(() => {
            }, ["prevent"])),
            onClick: _cache[9] || (_cache[9] = (...args) => _ctx.clear && _ctx.clear(...args))
          }, null, 32)) : vue.createCommentVNode("v-if", true),
          _ctx.showPwdVisible ? (vue.openBlock(), vue.createElementBlock("i", {
            key: 2,
            class: "el-input__icon el-icon-view el-input__clear",
            onClick: _cache[10] || (_cache[10] = (...args) => _ctx.handlePasswordVisible && _ctx.handlePasswordVisible(...args))
          })) : vue.createCommentVNode("v-if", true),
          _ctx.isWordLimitVisible ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_6, [
            vue.createElementVNode("span", _hoisted_7, vue.toDisplayString(_ctx.textLength) + " / " + vue.toDisplayString(_ctx.maxlength), 1)
          ])) : vue.createCommentVNode("v-if", true)
        ]),
        _ctx.validateState ? (vue.openBlock(), vue.createElementBlock("i", {
          key: 0,
          class: vue.normalizeClass(["el-input__icon", "el-input__validateIcon", _ctx.validateIcon])
        }, null, 2)) : vue.createCommentVNode("v-if", true)
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" append slot "),
      _ctx.$slots.append ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_8, [
        vue.renderSlot(_ctx.$slots, "append")
      ])) : vue.createCommentVNode("v-if", true)
    ], 64)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
      vue.createCommentVNode(" textarea "),
      vue.createElementVNode("textarea", vue.mergeProps({
        ref: "textarea",
        class: "el-textarea__inner"
      }, _ctx.attrs, {
        tabindex: _ctx.tabindex,
        disabled: _ctx.inputDisabled,
        readonly: _ctx.readonly,
        autocomplete: _ctx.autocomplete,
        style: _ctx.computedTextareaStyle,
        "aria-label": _ctx.label,
        placeholder: _ctx.placeholder,
        onCompositionstart: _cache[11] || (_cache[11] = (...args) => _ctx.handleCompositionStart && _ctx.handleCompositionStart(...args)),
        onCompositionupdate: _cache[12] || (_cache[12] = (...args) => _ctx.handleCompositionUpdate && _ctx.handleCompositionUpdate(...args)),
        onCompositionend: _cache[13] || (_cache[13] = (...args) => _ctx.handleCompositionEnd && _ctx.handleCompositionEnd(...args)),
        onInput: _cache[14] || (_cache[14] = (...args) => _ctx.handleInput && _ctx.handleInput(...args)),
        onFocus: _cache[15] || (_cache[15] = (...args) => _ctx.handleFocus && _ctx.handleFocus(...args)),
        onBlur: _cache[16] || (_cache[16] = (...args) => _ctx.handleBlur && _ctx.handleBlur(...args)),
        onChange: _cache[17] || (_cache[17] = (...args) => _ctx.handleChange && _ctx.handleChange(...args)),
        onKeydown: _cache[18] || (_cache[18] = (...args) => _ctx.handleKeydown && _ctx.handleKeydown(...args))
      }), null, 16, _hoisted_9),
      _ctx.isWordLimitVisible ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_10, vue.toDisplayString(_ctx.textLength) + " / " + vue.toDisplayString(_ctx.maxlength), 1)) : vue.createCommentVNode("v-if", true)
    ], 64))
  ], 38);
}

script.render = render;
script.__file = "packages/components/input/src/input.vue";

const ElInput = withInstall.withInstall(script);

exports.ElInput = ElInput;
exports["default"] = ElInput;
exports.inputEmits = inputEmits;
exports.inputProps = inputProps;
