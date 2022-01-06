
/************************************************************
 * Discription => *
 * This component is about the log erros in DB *
 * functionality *
 * *
 * About => *
 * This API is done by *
 * Parag Badgujar *
 ************************************************************/


const isEmpty = (value) => {
    value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
}

module.exports = isEmpty