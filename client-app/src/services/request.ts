import axios, { AxiosResponse } from "axios";

const apiUrl = "http://localhost:8001/api/requests";

export type LogApiModel = {
  id: string;
  time: Date;
  user: string;
  actionType: number;
};

export type AttachmentApiModel = {
  id: string;
  filename: string;
  filePath: string;
};

export type RequestApiModel = {
  id: string;
  ownerEmail: string;
  ownerPhone: string;
  status: number;
  createdTime: Date;

  logs: LogApiModel[];
  attachments: AttachmentApiModel[];
};

async function getById(
  id: string,
  email: string,
  phone: string
): Promise<RequestApiModel> {
  return (await axios.get(`${apiUrl}/${id}?email=${email}&phone=${phone}`))
    .data;
}

export type CreateModel = {
  ownerEmail: string;
  ownerPhone: string;
};

function create(model: CreateModel): Promise<AxiosResponse> {
  return axios.post(apiUrl, model);
}

function downloadFileById(
  requestId: string,
  fileId: string,
  fileName: string
): Promise<boolean> {
  return axios
    .get(`${apiUrl}/requests/${requestId}/attachments/${fileId}/download`, {
      responseType: "blob",
    })
    .then((res) => {
      const href = URL.createObjectURL(res.data);

      // create "a" HTML element with href to file & click
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", fileName); //or any other extension
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
      return true;
    });
}

const service = {
  create,
  getById,
  downloadFileById,
};

export default service;
