import { useEffect, useState } from "react";

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

/**
 *
 * @param {number} index select index if index is undefined his function return an array
 * 
 */
export const uriParser = (index) => {
    if (index) return document.location.pathname.split("/")[index];
    return document.location.pathname.split("/");
  };


  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
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

  export const truncateText = (text, maxLength = 10) => {
    let textTruncate = text?.substring(0, maxLength) + "...";
  
    return textTruncate;
  };


