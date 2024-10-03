import { useState, useEffect, useMemo } from "react";

export const useForm = (initialFormValue = {}, formValidations = {}) => {
    
    const [formValue, setFormValue] = useState(initialFormValue);
    const [formValidation, setFormValidations] = useState({});

    useEffect(() => {
        createValidators();
    }, [formValue]);

    useEffect(() => {
        setFormValue( initialFormValue )
    }, [ initialFormValue ]);

    const isFormValid = useMemo(() => {
        for (const formValid of Object.keys( formValidation )) {
            if ( formValidation[formValid] !== null ) return false
        }
        return true;
    }, [ formValidation ]);

    const hanldeChange = ({ target }) => {
        const { name, value } = target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const reset = () => {
        setFormValue( initialFormValue );
    }

    const createValidators = () => {
        const formCheckedValues = {};
        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage = 'Este campo es requerido'] = formValidations[formField];
            formCheckedValues[`${formField}Valid`] = fn(formValue[formField]) ? null : errorMessage;
            setFormValidations(formCheckedValues)
        }
    }

    return {
        hanldeChange,
        ...formValue,
        formValue,
        reset,

        ...formValidation,
        formValidations,
        isFormValid
    }
}
