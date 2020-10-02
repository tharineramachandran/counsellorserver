const pool = require("../database/Db_Connection");
const Countries = setCountries();
const Institutes = setInstitutes();
const Qualifications = setQualifications();    
const CounsellingSubjects = setCounsellingSubjects();
const CounsellingLevel = setCounsellingLevel();




async function setCountries() {

    var objCountries = [];
    allCountries = await pool.query('SELECT * FROM "CT_COUNTRY"');
    for (let i = 0; i < allCountries.rowCount; i++) {
        var code = allCountries.rows[i].CT_COUNTRY_CODE.toString();
        var name = allCountries.rows[i].CT_COUNTRY_NAME.toString();
        objCountries.push({ code: code, name: name });
    }
    return objCountries;
}
 
module.exports.getCountries = async function (data) {
    var value;
    var found = undefined;
    try {
        var promise = Promise.resolve(Countries);
        value = promise.then(function (val) {
            found = val.find(e => e.code === data);
            return found.name
        });
    } catch (e) {
        console.error("Failed to get country name ");
        console.error(e);
    }
    finally {
        return value;
    }
};


async function setCounsellingLevel() {

    var objCounsellingLevel = [];
    allCounsellingLevel = await pool.query('SELECT * FROM "CT_COUNSELLING_LEVEL"');
    for (let i = 0; i < allCounsellingLevel.rowCount; i++) {
        var code = allCounsellingLevel.rows[i].CT_COUNSELLING_LEVEL_CODE.toString();
        var name = allCounsellingLevel.rows[i].CT_COUNSELLING_LEVEL_NAME.toString();
        objCounsellingLevel.push({ code: code, name: name });
    }
    return objCounsellingLevel;
}
 
module.exports.getCounsellingLevelName = async function (data) {
    var value;
    var found = undefined;
    try {
        var promise = Promise.resolve(CounsellingLevel);
        value = promise.then(function (val) {
            found = val.find(e => e.code === data);
            return found.name
        });
    } catch (e) {
        console.error("Failed to get conselling level name ");
        console.error(e);
    }
    finally {
        return value;
    }
};






async function setCounsellingSubjects() {

    var objCounsellingSubjects = [];
    allCounsellingSubjects = await pool.query('SELECT * FROM "CT_COUNSELLING_SUBJECT"');
    for (let i = 0; i < allCounsellingSubjects.rowCount; i++) {
        var code = allCounsellingSubjects.rows[i].CT_COUNSELLING_SUBJECT_CODE.toString();
        var name = allCounsellingSubjects.rows[i].CT_COUNSELLING_SUBJECT_NAME.toString();
        objCounsellingSubjects.push({ code: code, name: name });
    }
    return objCounsellingSubjects;
}
 
module.exports.getCounsellingSubjectsName = async function (data) {
    var value;
    var found = undefined;
    try {
        var promise = Promise.resolve(CounsellingSubjects);
        value = promise.then(function (val) {
            found = val.find(e => e.code === data);
            return found.name
        });
    } catch (e) {
        console.error("Failed to get conselling subject name ");
        console.error(e);
    }
    finally {
        return value;
    }
};





async function setInstitutes() {

    var objInstitutes = [];
    allInstitutes = await pool.query('SELECT * FROM "CT_INSTITUTE"');
    for (let i = 0; i < allInstitutes.rowCount; i++) {
        var code = allInstitutes.rows[i].CT_INSTITUTE_CODE.toString();
        var name = allInstitutes.rows[i].CT_INSTITUTE_NAME.toString();
        objInstitutes.push({ code: code, name: name });
    }
    return objInstitutes;
}
 
module.exports.getInstituteName = async function (data) {
    var value;
    var found = undefined;
    try {
        var promise = Promise.resolve(Institutes);
        value = promise.then(function (val) {
            found = val.find(e => e.code === data);
            return found.name
        });
    } catch (e) {
        console.error("Failed to get institutes name ");
        console.error(e);
    }
    finally {
        return value;
    }
};


async function setQualifications() {

    var objQualifications = [];
    allQualifications = await pool.query('SELECT * FROM "CT_QUALIFICATION"');
    for (let i = 0; i < allQualifications.rowCount; i++) {
        var code = allQualifications.rows[i].CT_QUALIFICATION_CODE.toString();
        var name = allQualifications.rows[i].CT_QUALIFICATION_NAME.toString();
        objQualifications.push({ code: code, name: name });
    }
    return objQualifications;
}
 
module.exports.getQualificationsName = async function (data) {
    var value;
    var found = undefined;
    try {
        var promise = Promise.resolve(Qualifications);
        value = promise.then(function (val) {
            found = val.find(e => e.code === data);
            return found.name
        });
    } catch (e) {
        console.error("Failed to get qualifications name");
        console.error(e);
    }
    finally {
        return value;
    }
};
