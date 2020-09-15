import React, { useState, useEffect, useReducer } from 'react';
import { useForm, useStep } from 'react-hooks-helper';
import Registration_First from './_Registration_First';
import Registration_Last from './_Registration_Last';
import Registration_Result from './_RegistrationResult';
import Registration_Second from './_Registration_Second';
import Registration_Third from './_Registration_Third';
import Registration_Fourth from './_Registration_Fourth';
import Registration_Fifth from './_Registration_Fifth';
import Registration_Sixth from './_Registration_Sixth';



const defaultData = {

    //FIRST REGISTRATION PAGE
    COUNSELLOR_FIRST_NAME: "",
    COUNSELLOR_LAST_NAME: "",
    COUNSELLOR_EMAIL: "",
    COUNSELLOR_PHONE_NUMBER: "",
    COUNSELLOR_COUNTRY_CODE: "",
    COUNSELLOR_COUNSELLING_DETAILS:"",
    COUNSELLOR_COUNSELLING_SUBJECT_CODE: "",
    COUNSELLOR_COUNSELLING_LEVEL_CODE: "",
    COUNSELLOR_HOURLY_RATE: "",
    COUNSELLOR_REGISTRATION_STATUS_CODE: "",
    COUNSELLOR_QUALIFICATION_INSTITUTE : [],
    COUNSELLOR_COUNSELLING_DETAILS:[],

    //SECOND REGISTRATION PAGE
    COUNSELLOR_PHOTO: "",

    //THIRD REGISTRATION PAGE
    COUNSELLOR_HEADLINE: "",
    COUNSELLOR_ABOUT_DESCRIPTION: "",

    //FOURTH REGISTRATION PAGE
    COUNSELLOR_VIDEO_URL: "",

    //FIFTH REGISTRATION PAGE
    COUNSELLOR_TIME_ZONE_CODE: "",
    COUNSELLOR_AVAILABILITY_MONDAY: "",
    COUNSELLOR_AVAILABILITY_TIME_MONDAY_FROM: "",
    COUNSELLOR_AVAILABILITY_TIME_MONDAY_TO: "",

    COUNSELLOR_AVAILABILITY_TUESDAY: "",
    COUNSELLOR_AVAILABILITY_TIME_TUESDAY_FROM: "",
    COUNSELLOR_AVAILABILITY_TIME_TUESDAY_TO: "",

    COUNSELLOR_AVAILABILITY_WEDNESDAY: "",
    COUNSELLOR_AVAILABILITY_TIME_WEDNESDAY_FROM: "",
    COUNSELLOR_AVAILABILITY_TIME_WEDNESDAY_TO: "",

    COUNSELLOR_AVAILABILITY_THURSDAY: "",
    COUNSELLOR_AVAILABILITY_TIME_THURSDAY_FROM: "",
    COUNSELLOR_AVAILABILITY_TIME_THURSDAY_TO: "",

    COUNSELLOR_AVAILABILITY_FRIDAY: "",
    COUNSELLOR_AVAILABILITY_TIME_FRIDAY_FROM: "",
    COUNSELLOR_AVAILABILITY_TIME_FRIDAY_TO: "",

    COUNSELLOR_AVAILABILITY_SATURDAY: "",
    COUNSELLOR_AVAILABILITY_TIME_SATURDAY_FROM: "",
    COUNSELLOR_AVAILABILITY_TIME_SATURDAY_TO: "",

    COUNSELLOR_DOCUMENT_IMAGE: "",

}

const steps = [
    { id: 'Counsellor_details' },
    { id: 'Counsellor_photo' },
    { id: 'Counsellor_about' },
    { id: 'Counsellor_video' },
    { id: 'Counsellor_availability' },
    { id: 'Counsellor_documents' }
]

const RegistrationMultiStepForm = () => {

    const [formData, setForm] = useForm(defaultData);

    const { step, navigation } = useStep({ steps, initialStep: 0})

    const props = { formData, setForm, navigation, step}

    switch (step.id) {
        case 'Counsellor_details':
            return <Registration_First {...props} />

        case 'Counsellor_photo':
            return <Registration_Second {...props} />

        case 'Counsellor_about':
            return <Registration_Third {...props} />

        case 'Counsellor_video':
            return <Registration_Fourth {...props} />

        case 'Counsellor_availability':
            return <Registration_Fifth {...props} />
            
        case 'Counsellor_documents':
            return <Registration_Sixth {...props} />

        // case 'Registration_Fourth':
        //     return <Registration_Last {...props} />

    }

    console.log("steps=", step);

    return (
        <React.Fragment>
        </React.Fragment>

    )

}

export default RegistrationMultiStepForm;