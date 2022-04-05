import { useEffect, useState } from "react";
import dayjs from "dayjs";

//ATOB TOKEN
export const atobToken = (key, index) => {
  if (sessionStorage.getItem(key) !== null) {
    const res = JSON.parse(
      window.atob(sessionStorage.getItem(key).split(".")[1])
    );
    if (index) {
      return res[index];
    }
    return res;
  }
};

//CALCULATE AGE
export const calculateAge = (date) => {
  let today = new Date();
  let birthDate = new Date(date);
  let age_now = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age_now--;
  }
  return age_now;
};

//URI PARSER
/**
 *
 * @param {number} index select index if index is undefined his function return an array
 *
 */
export const uriParser = (index) => {
  if (index) return document.location.pathname.split("/")[index];
  return document.location.pathname.split("/");
};

//HOOKS GET DIMENSIONS
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  if (width && height) {
    return {
      width,
      height,
    };
  }
}
export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

//DATE DIFF
export const getDateDiff = (date1, date2) => {
  let diff = {};
  let tmp = new Date(date2) - new Date(date1);
  tmp = Math.floor(tmp / 1000);
  diff.sec = tmp % 60;
  tmp = Math.floor((tmp - diff.sec) / 60);
  diff.min = tmp % 60;
  tmp = Math.floor((tmp - diff.min) / 60);
  diff.hour = tmp % 24;
  tmp = Math.floor((tmp - diff.hour) / 24);
  diff.day = tmp;

  return diff;
};

//TRUNCATE TEXT
export const truncateText = (text, maxLength = 10) => {
  let textTruncate = text?.substring(0, maxLength) + "...";

  return textTruncate;
};

//CONTACTANATION NAME
export const concatName = (firstname, lastname) => {
  if (firstname && !lastname) return firstname;
  if (lastname && !firstname) return lastname;
  if (lastname && firstname) return firstname + " " + lastname;
};

//FORMAT DATE
export const formatDate = (date, format = "DD/MM/YYYY HH:mm") => {
  return dayjs(date).format(format);
};

//DATA URL TO FILE
export const dataURLtoFile = (dataurl, filename = `filename-${Date.now()}`) => {
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

//BLOB TO BASE 64
export const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        if (typeof reader.result === "string") {
          return resolve(reader.result);
        } else {
          return reject(new Error("Could not convert blob to base64"));
        }
      };
    } catch (e) {
      return reject(e);
    }
  });
};

//CANVAS TO BLOB
export const canvasToBlob = (canvas) => {
  return new Promise((resolve, reject) => {
    try {
      canvas.toBlob((blob) => {
        if (!blob) {
          return reject(new Error("Could not convert canvas to blob"));
        }
        return resolve(blob);
      });
    } catch (e) {
      return reject(e);
    }
  });
};

//CONVERT IMAGE TO BASE 64
export const imageToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

// TITLE CASE STRING
export const titleCaseString = (data) =>
  data
    .toLowerCase()
    .split(" ")
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");

// CONVERT STRING TO ARRAY
export const convertStringToArray = (para, removeSpaces = false) =>
  removeSpaces ? [...para].filter((item) => item !== " ") : [...para];

// COUNT INSTANCE IN ARRAY
export const countInstanceInArray = (arr) =>
  arr.reduce((obj, item) => {
    if (!obj[item]) obj[item] = 0;
    obj[item]++;
    return obj;
  }, {});

// SUM OF AN ARRAY
export const sumOfAnArray = (arr, initialValue = 0) =>
  arr.reduce((a, b) => a + b, initialValue);

// ARRAY IN OBJECT
export const inArrayOfObjects = (arr, key, value) =>
  arr.find((ar) => ar[key] === value);

// FIND ARRAY INDEX
export const findArrayIndex = (arr, key, value) =>
  arr.findIndex((ar) => ar[key] === value);

// GET UNIQUE LIST
export const getUniqueList = (arr) =>
  arr.filter(
    (ar, index, list) =>
      list.findIndex((p) => JSON.stringify(ar) === JSON.stringify(p)) === index
  );

//VALIDATION
export const validationProps = (error, errorMessage) => ({
  error,
  errorMessage,
});

export const isBlank = (value) => {
  const trimmedVal = value.trim();
  if (!trimmedVal && trimmedVal.length === 0) {
    return true;
  }
  return false;
};

export const validateName = (value, message, validLength = 3) => {
  if (isBlank(value) || value.length < validLength) {
    return validationProps(true, message);
  }
  return validationProps(false, "");
};

export const validateMobile = (value, message) => {
  if (/^\d{10}$/.test(value)) {
    return validationProps(false, "");
  }
  return validationProps(true, message);
};

export const validateEmail = (value, message) => {
  /* eslint-disable */
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(String(value).toLowerCase())) return validationProps(false, "");
  return validationProps(true, message);
  /* eslint-enable */
};

export const validateOption = (value, message) => {
  if (isBlank(value) || !value) {
    return validationProps(true, message);
  }
  return validationProps(false, "");
};

export const validatePassword = (value, message, validLength = 6) => {
  if (isBlank(value) || value.length < validLength) {
    return validationProps(true, message);
  }
  return validationProps(false, "");
};
