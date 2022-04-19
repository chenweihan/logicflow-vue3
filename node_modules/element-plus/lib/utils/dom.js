"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stop = exports.getOffsetTopDistance = exports.getOffsetTop = exports.isInContainer = exports.getScrollContainer = exports.isScroll = exports.removeStyle = exports.setStyle = exports.getStyle = exports.removeClass = exports.addClass = exports.hasClass = exports.once = exports.off = exports.on = void 0;
const isServer_1 = __importDefault(require("./isServer"));
const util_1 = require("./util");
const trimArr = function (s) {
    return (s || '').split(' ').filter((item) => !!item.trim());
};
const on = function (element, event, handler, useCapture = false) {
    if (element && event && handler) {
        element === null || element === void 0 ? void 0 : element.addEventListener(event, handler, useCapture);
    }
};
exports.on = on;
const off = function (element, event, handler, useCapture = false) {
    if (element && event && handler) {
        element === null || element === void 0 ? void 0 : element.removeEventListener(event, handler, useCapture);
    }
};
exports.off = off;
const once = function (el, event, fn) {
    const listener = function (...args) {
        if (fn) {
            fn.apply(this, args);
        }
        (0, exports.off)(el, event, listener);
    };
    (0, exports.on)(el, event, listener);
};
exports.once = once;
function hasClass(el, cls) {
    if (!el || !cls)
        return false;
    if (cls.indexOf(' ') !== -1)
        throw new Error('className should not contain space.');
    if (el.classList) {
        return el.classList.contains(cls);
    }
    else {
        const className = el.getAttribute('class') || '';
        return className.split(' ').includes(cls);
    }
}
exports.hasClass = hasClass;
function addClass(el, cls) {
    if (!el)
        return;
    let className = el.getAttribute('class') || '';
    const curClass = trimArr(className);
    const classes = (cls || '')
        .split(' ')
        .filter((item) => !curClass.includes(item) && !!item.trim());
    if (el.classList) {
        el.classList.add(...classes);
    }
    else {
        className += ` ${classes.join(' ')}`;
        el.setAttribute('class', className);
    }
}
exports.addClass = addClass;
function removeClass(el, cls) {
    if (!el || !cls)
        return;
    const classes = trimArr(cls);
    let curClass = el.getAttribute('class') || '';
    if (el.classList) {
        el.classList.remove(...classes);
        return;
    }
    classes.forEach((item) => {
        curClass = curClass.replace(` ${item} `, ' ');
    });
    const className = trimArr(curClass).join(' ');
    el.setAttribute('class', className);
}
exports.removeClass = removeClass;
const getStyle = function (element, styleName) {
    var _a;
    if (isServer_1.default)
        return '';
    if (!element || !styleName)
        return '';
    styleName = (0, util_1.camelize)(styleName);
    if (styleName === 'float') {
        styleName = 'cssFloat';
    }
    try {
        const style = element.style[styleName];
        if (style)
            return style;
        const computed = (_a = document.defaultView) === null || _a === void 0 ? void 0 : _a.getComputedStyle(element, '');
        return computed ? computed[styleName] : '';
    }
    catch (e) {
        return element.style[styleName];
    }
};
exports.getStyle = getStyle;
function setStyle(element, styleName, value) {
    if (!element || !styleName)
        return;
    if ((0, util_1.isObject)(styleName)) {
        Object.keys(styleName).forEach((prop) => {
            setStyle(element, prop, styleName[prop]);
        });
    }
    else {
        styleName = (0, util_1.camelize)(styleName);
        element.style[styleName] = value;
    }
}
exports.setStyle = setStyle;
function removeStyle(element, style) {
    if (!element || !style)
        return;
    if ((0, util_1.isObject)(style)) {
        Object.keys(style).forEach((prop) => {
            setStyle(element, prop, '');
        });
    }
    else {
        setStyle(element, style, '');
    }
}
exports.removeStyle = removeStyle;
const isScroll = (el, isVertical) => {
    if (isServer_1.default)
        return null;
    const determinedDirection = isVertical === null || isVertical === undefined;
    const overflow = determinedDirection
        ? (0, exports.getStyle)(el, 'overflow')
        : isVertical
            ? (0, exports.getStyle)(el, 'overflow-y')
            : (0, exports.getStyle)(el, 'overflow-x');
    return overflow.match(/(scroll|auto|overlay)/);
};
exports.isScroll = isScroll;
const getScrollContainer = (el, isVertical) => {
    if (isServer_1.default)
        return;
    let parent = el;
    while (parent) {
        if ([window, document, document.documentElement].includes(parent)) {
            return window;
        }
        if ((0, exports.isScroll)(parent, isVertical)) {
            return parent;
        }
        parent = parent.parentNode;
    }
    return parent;
};
exports.getScrollContainer = getScrollContainer;
const isInContainer = (el, container) => {
    if (isServer_1.default || !el || !container)
        return false;
    const elRect = el.getBoundingClientRect();
    let containerRect;
    if (container instanceof Element) {
        containerRect = container.getBoundingClientRect();
    }
    else {
        containerRect = {
            top: 0,
            right: window.innerWidth,
            bottom: window.innerHeight,
            left: 0,
        };
    }
    return (elRect.top < containerRect.bottom &&
        elRect.bottom > containerRect.top &&
        elRect.right > containerRect.left &&
        elRect.left < containerRect.right);
};
exports.isInContainer = isInContainer;
const getOffsetTop = (el) => {
    let offset = 0;
    let parent = el;
    while (parent) {
        offset += parent.offsetTop;
        parent = parent.offsetParent;
    }
    return offset;
};
exports.getOffsetTop = getOffsetTop;
const getOffsetTopDistance = (el, containerEl) => {
    return Math.abs((0, exports.getOffsetTop)(el) - (0, exports.getOffsetTop)(containerEl));
};
exports.getOffsetTopDistance = getOffsetTopDistance;
const stop = (e) => e.stopPropagation();
exports.stop = stop;
