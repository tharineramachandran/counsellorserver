import React, { useState, useEffect, useReducer } from 'react';
import { useForm, useStep } from 'react-hooks-helper';
import Registration_First from './_Registration_First';
import Registration_Last from './_Registration_Last';
import Registration_Result from './_RegistrationResult';
import Registration_Second from './_Registration_Second';
import Registration_Fourth from './_Registration_Fourth';



const defaultData = {

    //FIRST REGISTRATION PAGE
    COUNSELLOR_FIRST_NAME: "indrajit",
    COUNSELLOR_LAST_NAME: "maurya",
    COUNSELLOR_EMAIL: "indra@activants.com",
    COUNSELLOR_PHONE_NUMBER: "12321321",
    COUNSELLOR_COUNTRY_CODE: "",
    COUNSELLOR_COUNSELLING_SUBJECT_CODE: "",
    COUNSELLOR_COUNSELLING_LEVEL_CODE: "",
    COUNSELLOR_HOURLY_RATE: "",
    COUNSELLOR_QUALIFICATION_CODE: "",
    COUNSELLOR_INSTITUTION_TYPE_CODE: "",
    COUNSELLOR_REGISTRATION_STATUS_CODE: "",

    //SECOND REGISTRATION PAGE
    COUNSELLOR_PHOTO: {},

    //THIRD REGISTRATION PAGE
    COUNSELLOR_PHOTO_DESCRIPTION: "",
    COUNSELLOR_ABOUT_DESCRIPTION: "",

    //FOURTH REGISTRATION PAGE
    COUNSELLOR_VIDEO_URL: "",

    //FIFTH REGISTRATION PAGE
    COUNSELLOR_TIME_ZONE_CODE: "",
    COUNSELLOR_AVAILABILITY_DATE: "",
    COUNSELLOR_AVAILABILITY_TIME_FROM: "",
    COUNSELLOR_AVAILABILITY_TIME_TO: "",

    COUNSELLOR_DOCUMENT_NAME: "",
    COUNSELLOR_DOCUMENT_TYPE: ""

}

const steps = [
    { id: 'Counsellor_details' },
    { id: 'Counsellor_photo' },
    { id: 'Counsellor_about' },
    { id: 'Registration_Fourth' }
]

const RegistrationMultiStepForm = () => {

    const [formData, setForm] = useForm(defaultData);

    const { step, navigation } = useStep({
        steps,
        initialStep: 0
    })

    const props = { formData, setForm, navigation }

    switch (step.id) {
        case 'Counsellor_details':
            return <Registration_First {...props} />

        case 'Counsellor_photo':
            return <Registration_Second {...props} />

        case 'Counsellor_about':
            return <Registration_Fourth {...props} />

        case 'Registration_Fourth':
            return <Registration_Last {...props} />
    }

    console.log(step);

    return (
        <React.Fragment>
        </React.Fragment>

    )

}

export default RegistrationMultiStepForm;