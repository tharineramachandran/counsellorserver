import React, { useState, useEffect, useReducer } from 'react';
import { useForm, useStep } from 'react-hooks-helper';
import Edit_First from './Edit_First'; 
import Edit_Fifth from './Edit_Fifth';
import Edit_Second from './Edit_Second';
import Edit_Third from './Edit_Third'; 
import Edit_Fourth from './Edit_Fourth';
import Edit_Sixth from './Edit_Sixth';

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

    COUNSELLOR_EXISTING_QUALIFICATION_INSTITUTE : [],
    COUNSELLOR_EXISTING_COUNSELLING_DETAILS:[],


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
    { id: 'Counsellor_details' },
    { id: 'Counsellor_photo' },
    { id: 'Counsellor_about' }, 
    { id: 'Counsellor_availability' },
    { id: 'Counsellor_documents' },
    { id: 'Counsellor_changepassword' } 
]

const RegistrationMultiStepForm = () => {

    const [formData, setForm] = useForm(defaultData);

    const { step, navigation } = useStep({ steps, initialStep: 0})

    const props = { formData, setForm, navigation, step}

    switch (step.id) {
        case 'Counsellor_details':
            return <Edit_First {...props} />

        case 'Counsellor_photo':
            return <Edit_Second {...props} />

        case 'Counsellor_about':
            return <Edit_Third {...props} />
 
        case 'Counsellor_availability':
            return <Edit_Fourth {...props} />
            
        case 'Counsellor_documents':
            return <Edit_Fifth {...props} />

        case 'Counsellor_changepassword':
            return <Edit_Sixth {...props} />

    }

    console.log("steps=", step);

    return (
        <React.Fragment>
        </React.Fragment>

    )

}

export default RegistrationMultiStepForm;