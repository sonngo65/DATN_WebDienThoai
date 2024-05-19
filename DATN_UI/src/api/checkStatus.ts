import { AxiosResponse } from "axios";
import { Exception } from "sass";

const translateStatusToMassage = (status: number) => {
  switch (status) {
    case 401:
      return "please login again ";
    case 403:
      return "you do not have permission to view the photos.";
    default:
      return "these was an errhor retrieving the workplace info. Please try a gain.";
  }
};
const checkStatus = (response: AxiosResponse) => {
  if (response.status >= 200 && response.status <= 300) {
    return response;
  } else {
    const errorForDev = {
      status: response.status,
      statusText: response.statusText,
      url: response.headers,
    };
    console.log("http detail for debugging : ", JSON.stringify(errorForDev));
    let errorMessage = translateStatusToMassage(response.status);
    throw new Error(errorMessage);
  }
};

export default checkStatus;
