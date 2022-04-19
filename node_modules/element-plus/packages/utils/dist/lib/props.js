"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentSize = exports.mutable = exports.keyOf = exports.definePropType = exports.buildProps = exports.buildProp = exports.propKey = void 0;
const vue_1 = require("vue");
const shared_1 = require("@vue/shared");
const fromPairs_1 = __importDefault(require("lodash/fromPairs"));
const wrapperKey = Symbol();
exports.propKey = Symbol();
function buildProp(option, key) {
    if (!(0, shared_1.isObject)(option) || !!option[exports.propKey])
        return option;
    const { values, required, default: defaultValue, type, validator } = option;
    const _validator = values || validator
        ? (val) => {
            let valid = false;
            let allowedValues = [];
            if (values) {
                allowedValues = [...values, defaultValue];
                valid || (valid = allowedValues.includes(val));
            }
            if (validator)
                valid || (valid = validator(val));
            if (!valid && allowedValues.length > 0) {
                const allowValuesText = [...new Set(allowedValues)]
                    .map((value) => JSON.stringify(value))
                    .join(', ');
                (0, vue_1.warn)(`Invalid prop: validation failed${key ? ` for prop "${key}"` : ''}. Expected one of [${allowValuesText}], got value ${JSON.stringify(val)}.`);
            }
            return valid;
        }
        : undefined;
    return {
        type: typeof type === 'object' &&
            Object.getOwnPropertySymbols(type).includes(wrapperKey)
            ? type[wrapperKey]
            : type,
        required: !!required,
        default: defaultValue,
        validator: _validator,
        [exports.propKey]: true,
    };
}
exports.buildProp = buildProp;
const buildProps = (props) => (0, fromPairs_1.default)(Object.entries(props).map(([key, option]) => [
    key,
    buildProp(option, key),
]));
exports.buildProps = buildProps;
const definePropType = (val) => ({ [wrapperKey]: val });
exports.definePropType = definePropType;
const keyOf = (arr) => Object.keys(arr);
exports.keyOf = keyOf;
const mutable = (val) => val;
exports.mutable = mutable;
exports.componentSize = ['large', 'medium', 'small', 'mini'];
