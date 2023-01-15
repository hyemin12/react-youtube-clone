import { countries } from "countries-list";

export const convertCountry = (code) => {
  // countries.code
  if (!code) {
    return;
  }
  const arr = Object.entries(countries);
  const result = arr.filter((country) => country[0] === code)[0][1];

  // result 객체내용
  // captial: 수도
  // currency: 화폐단위
  // name: 나라 이름(영어)
  // native: 나라명
  // phone: 국가코드 (전화)

  return result.native;
};
