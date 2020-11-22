import React, { useState, useEffect, useReducer } from 'react';
import { useForm, useStep } from 'react-hooks-helper';
import Registration_First from './_Registration_First'; 
import Registration_Result from './_RegistrationResult';
import Registration_Second from './_Registration_Second';
import Registration_Third from './_Registration_Third';
import Registration_Fourth from './_Registration_Fourth'; 

const defaultData = {

    //FIRST REGISTRATION PAGE
    COUNSELLOR_FIRST_NAME: "",
    COUNSELLOR_LAST_NAME: "",
    COUNSELLOR_EMAIL: "",
    COUNSELLOR_PHONE_NUMBER: "",
    COUNSELLOR_COUNTRY_CODE: "",

    COUNSELLOR_COUNSELLING_SUBJECT_ID: "",
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
    COUNSELLOR_AVAILABILITY:[],

    COUNSELLOR_AVAILABILITY_MONDAY: [],
    COUNSELLOR_AVAILABILITY_TUESDAY: [],
    COUNSELLOR_AVAILABILITY_WEDNESDAY: [],
    COUNSELLOR_AVAILABILITY_THURSDAY: [],
    COUNSELLOR_AVAILABILITY_FRIDAY: [],
    COUNSELLOR_AVAILABILITY_SATURDAY: [],
    COUNSELLOR_DOCUMENT_IMAGE: [],

}

const steps = [
    { id: 'User_details' },
    { id: 'User_photo' },
    { id: 'User_about' },
    { id: 'User_video' },
    // { id: 'Counsellor_availability' },
    // { id: 'Counsellor_documents' },
    { id: 'User_results' } 
]

const _RegistrationUserMultiStepForm = () => {

    const [formData, setForm] = useForm(defaultData);

    const { step, navigation } = useStep({ steps, initialStep: 0})

    const props = { formData, setForm, navigation, step}

    switch (step.id) {
        case 'User_details':
            return <Registration_First {...props} />

        case 'User_photo':
            return <Registration_Second {...props} />

        case 'User_about':
            return <Registration_Third {...props} />

        case 'User_video':
            return <Registration_Fourth {...props} />

        // case 'Counsellor_availability':
        //     return <Registration_Fifth {...props} />
            
        // case 'Counsellor_documents':
        //     return <Registration_Sixth {...props} />

        case 'User_results':
            return <Registration_Result {...props} />

    }

    console.log("steps=", step);

    return (
        <React.Fragment>
        </React.Fragment>

    )

}

export default _RegistrationUserMultiStepForm;