import isServer from './isServer';
import { camelize, isObject } from './util';
const trimArr = function (s) {
    return (s || '').split(' ').filter((item) => !!item.trim());
};
export const on = function (element, event, handler, useCapture = false) {
    if (element && event && handler) {
        element === null || element === void 0 ? void 0 : element.addEventListener(event, handler, useCapture);
    }
};
export const off = function (element, event, handler, useCapture = false) {
    if (element && event && handler) {
        element === null || element === void 0 ? void 0 : element.removeEventListener(event, handler, useCapture);
    }
};
export const once = function (el, event, fn) {
    const listener = function (...args) {
        if (fn) {
            fn.apply(this, args);
        }
        off(el, event, listener);
    };
    on(el, event, listener);
};
export function hasClass(el, cls) {
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
export function addClass(el, cls) {
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
export function removeClass(el, cls) {
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
export const getStyle = function (element, styleName) {
    var _a;
    if (isServer)
        return '';
    if (!element || !styleName)
        return '';
    styleName = camelize(styleName);
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
export function setStyle(element, styleName, value) {
    if (!element || !styleName)
        return;
    if (isObject(styleName)) {
        Object.keys(styleName).forEach((prop) => {
            setStyle(element, prop, styleName[prop]);
        });
    }
    else {
        styleName = camelize(styleName);
        element.style[styleName] = value;
    }
}
export function removeStyle(element, style) {
    if (!element || !style)
        return;
    if (isObject(style)) {
        Object.keys(style).forEach((prop) => {
            setStyle(element, prop, '');
        });
    }
    else {
        setStyle(element, style, '');
    }
}
export const isScroll = (el, isVertical) => {
    if (isServer)
        return null;
    const determinedDirection = isVertical === null || isVertical === undefined;
    const overflow = determinedDirection
        ? getStyle(el, 'overflow')
        : isVertical
            ? getStyle(el, 'overflow-y')
            : getStyle(el, 'overflow-x');
    return overflow.match(/(scroll|auto|overlay)/);
};
export const getScrollContainer = (el, isVertical) => {
    if (isServer)
        return;
    let parent = el;
    while (parent) {
        if ([window, document, document.documentElement].includes(parent)) {
            return window;
        }
        if (isScroll(parent, isVertical)) {
            return parent;
        }
        parent = parent.parentNode;
    }
    return parent;
};
export const isInContainer = (el, container) => {
    if (isServer || !el || !container)
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
export const getOffsetTop = (el) => {
    let offset = 0;
    let parent = el;
    while (parent) {
        offset += parent.offsetTop;
        parent = parent.offsetParent;
    }
    return offset;
};
export const getOffsetTopDistance = (el, containerEl) => {
    return Math.abs(getOffsetTop(el) - getOffsetTop(containerEl));
};
export const stop = (e) => e.stopPropagation();
