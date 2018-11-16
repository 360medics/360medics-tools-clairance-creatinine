/**
 * Form and input validator functions.
 */
export class FormValidator {
    required: any = {};
    validators: any = {};

    /**
     * Input data can
     * fieldName1: {
     *     required: true,
     *     validator: (value): boolean => { return true }
     * },
     * fieldName2: (value): boolean => {
     *     return true
     * },
     */
    constructor(input: any)
    {
        this.validators = input;

        // count number of functions
        for (let fieldName in input) {
            // this.required[fieldName] = input['required'];
            // this.validators[fieldName] = input['validator'];
            //
            //     // the field keey
            //     if (typeof input[fieldName] === 'function') {
            //
            //         // first case, the validator looks like "fieldName2": () => {...}
            //         this.required[fieldName] = false
            //         this.validators[fieldName] = input[fieldName]
            //
            //     } else {
            //         // first case, the validator looks like "fieldName2": { required: true, validator: () => {...} }
            //         this.required[fieldName] = input['required'];
            //         this.validators[fieldName] = input['validator'];
            //     }
        }
    }

    formIsValid()
    {

    }

    isRequired(fieldName: string)
    {
        return (typeof this.required[fieldName] === 'undefined') ? false : this.required[fieldName];
    }

    validate(fieldName: string, value: any): boolean
    {
        const typeOfValidator = (typeof this.validators[fieldName])

        if (typeOfValidator === 'undefined')  {
            return null
        }

        if (typeOfValidator !== 'object' && typeOfValidator !== 'function') {
            console.warn(`FormValidator function for input named "${fieldName}" does not exist`)
            return null
        } else {

            if (typeOfValidator === 'object')  {
                return this.validators[fieldName]['validator'](value)

            } else if (typeOfValidator === 'function') {
                return this.validators[fieldName](value)

            } else {
                return null
            }
        }
    }

    isEmptyOrNull(value: any): boolean
    {
        return (typeof(value) === 'undefined' || value == null || value.trim() === '') ? true : false;
    }

    isEmptyNullOrFalse(value: any)
    {
        return (this.isEmptyOrNull(value) || value === false || value === 0 || value == '0') ? true : false;
    }
}
