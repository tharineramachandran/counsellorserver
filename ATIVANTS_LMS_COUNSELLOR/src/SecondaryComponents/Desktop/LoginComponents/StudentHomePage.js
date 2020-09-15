import React, {useState} from 'react';


const StudentHomePage = () => {

    const [array, SetArray] = useState([{name:'',age:''}])

    return(
        array.map(x =>{
            return(
            <select
            name="CT_QUALIFICATION_CODE"
            value={x.CT_QUALIFICATION_CODE}
            // onChange={(e) => handleInputChange(e, i)}
            placeholder="select your country"
        >
            <option selected hidden>
                More country
            </option>
            {/* {qualificationsList} */}
        </select>
        )    
    })
    )
}

export default StudentHomePage;