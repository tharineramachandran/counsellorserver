import React, { useState, useEffect, useReducer } from 'react';
import { useForm, useStep } from 'react-hooks-helper';
import Registration_First from './_Registration_First';
import Registration_Second from './_Registration_Second';
import Registration_Result from './_RegistrationResult';


const defaultData = {
    COUNSELLOR_NAME: "",
    COUNSELLOR_AGE: ""
}

const steps = [
    { id: 'names' },
    { id: 'address' },
    { id: 'result' }
]

const RegistrationMultiStepForm = () => {

    const [formData, setForm] = useForm(defaultData);

    const { step, navigation } = useStep({
        steps,
        initialStep: 0
    })

    const props = { formData, setForm, navigation }

    switch (step.id) {
        case 'names':
            return <Registration_First {...props} />

        case 'address':
            return <Registration_Second {...props} />

        case 'result':
            return <Registration_Result {...props} />
    }

    console.log(step);

    return (
        <React.Fragment>
        </React.Fragment>

    )

}

export default RegistrationMultiStepForm;