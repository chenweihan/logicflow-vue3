import { warn } from 'vue';
import { isObject } from '@vue/shared';
import fromPairs from 'lodash/fromPairs';
const wrapperKey = Symbol();
export const propKey = Symbol();
export function buildProp(option, key) {
    if (!isObject(option) || !!option[propKey])
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
                warn(`Invalid prop: validation failed${key ? ` for prop "${key}"` : ''}. Expected one of [${allowValuesText}], got value ${JSON.stringify(val)}.`);
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
        [propKey]: true,
    };
}
export const buildProps = (props) => fromPairs(Object.entries(props).map(([key, option]) => [
    key,
    buildProp(option, key),
]));
export const definePropType = (val) => ({ [wrapperKey]: val });
export const keyOf = (arr) => Object.keys(arr);
export const mutable = (val) => val;
export const componentSize = ['large', 'medium', 'small', 'mini'];
