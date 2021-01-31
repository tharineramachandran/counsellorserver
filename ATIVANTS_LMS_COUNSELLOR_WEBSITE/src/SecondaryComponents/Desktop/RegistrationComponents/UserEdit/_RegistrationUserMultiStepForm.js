import React, { useState, useEffect, useReducer } from 'react';
import { useForm, useStep } from 'react-hooks-helper';
import Edit_First from './Edit_First'; 
import Registration_Result from './_RegistrationResult';
import Edit_Second from './Edit_Second';
import Edit_Third from './Edit_Third';
import Edit_Fourth from './Edit_Fourth'; 

import Edit_Fifth from './Edit_Fifth'; 
 
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


    //FIRST REGISTRATION PAGE
    COUNSELLEE_FIRST_NAME: "",
    COUNSELLEE_LAST_NAME: "",
    COUNSELLEE_EMAIL: "",
    COUNSELLEE_PHONE_NUMBER: "",
    COUNSELLEE_COUNTRY_CODE: "",

    COUNSELLEE_COUNSELLING_SUBJECT_ID: "",
    COUNSELLEE_COUNSELLING_LEVEL_CODE: "",
    COUNSELLEE_HOURLY_RATE: "",
    
    COUNSELLEE_REGISTRATION_STATUS_CODE: "",
    COUNSELLEE_QUALIFICATION_INSTITUTE : [],
    COUNSELLEE_COUNSELLING_DETAILS:[],

    //SECOND REGISTRATION PAGE
    COUNSELLEE_PHOTO: "",

    //THIRD REGISTRATION PAGE
    COUNSELLEE_HEADLINE: "",
    COUNSELLEE_ABOUT_DESCRIPTION: "",

    //FOURTH REGISTRATION PAGE
    COUNSELLEE_VIDEO_URL: "",

    //FIFTH REGISTRATION PAGE
    COUNSELLEE_TIME_ZONE_CODE: "",
    COUNSELLEE_AVAILABILITY:[],

    COUNSELLEE_AVAILABILITY_MONDAY: [],
    COUNSELLEE_AVAILABILITY_TUESDAY: [],
    COUNSELLEE_AVAILABILITY_WEDNESDAY: [],
    COUNSELLEE_AVAILABILITY_THURSDAY: [],
    COUNSELLEE_AVAILABILITY_FRIDAY: [],
    COUNSELLEE_AVAILABILITY_SATURDAY: [],
    COUNSELLEE_DOCUMENT_IMAGE: [],

}

const steps = [
    { id: 'User_details' },
    { id: 'User_email' },
      { id: 'User_intro' },
     { id: 'User_password' }, 
     { id: 'User_pref' } 
]

const _RegistrationUserMultiStepForm = () => {

    const [formData, setForm] = useForm(defaultData);

    const { step, navigation } = useStep({ steps, initialStep: 0})

    const props = { formData, setForm, navigation, step}

    switch (step.id) {
        case 'User_details':
            return <Edit_First {...props} />

        case 'User_email':
            return <Edit_Second {...props} />
            case 'User_intro':
                return <Edit_Third {...props} />
                case 'User_password':
                    return <Edit_Fourth {...props} />
                    case 'User_pref':
                    return <Edit_Fifth {...props} />
        // case 'User_about':
        //     return <Edit_Third {...props} />

        // case 'User_video':
        //     return <Edit_Fourth {...props} />

        // case 'Counsellor_availability':
        //     return <Registration_Fifth {...props} />
            
        // case 'Counsellor_documents':
        //     return <Registration_Sixth {...props} />

        // case 'User_results':
        //     return <Registration_Result {...props} />

    }

    console.log("steps=", step);

    return (
        <React.Fragment>
        </React.Fragment>

    )

}

export default _RegistrationUserMultiStepForm;