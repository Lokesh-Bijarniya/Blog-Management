import mongoose from "mongoose";

const isEmpty = function (value) {
    if (typeof value === 'undefined' || value === null || (typeof value === 'object' && Object.keys(value).length === 0)) {
        return true;
    }

    if (typeof value === "string" && value.trim().length === 0) return true;

    return false;
};


const isValidName = function (name) {
    const regex = /^[a-zA-Z0-9\s\-'.,]+$/;
    return regex.test(name);
};

  

const isValidEmail = function (email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const isValidPassword = function (password) {
    var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    return regex.test(password);
};

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
};

export {isEmpty, isValidName, isValidEmail, isValidPassword, isValidObjectId};