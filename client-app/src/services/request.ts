import axios, { AxiosResponse } from 'axios';

const apiUrl = 'http://localhost:8001/api/requests';

export type LogApiModel = {
  id: string;
  time: Date;
  user: string;
  actionType: number;
}

export type AttachmentApiModel = {
  id: string;
  filename: string;
  filePath: string;
}

export type RequestApiModel = {
  id: string;
  ownerEmail: string;
  ownerPhone: string;
  status: number;
  createdTime: Date;

  logs: LogApiModel[];
  attachments: AttachmentApiModel[];
}

async function getById(id: string, email: string, phone: string): Promise<RequestApiModel> {
  return (await axios.get(`${apiUrl}/${id}?email=${email}&phone=${phone}`)).data;
}

export type CreateModel = {
  ownerEmail: string;
  ownerPhone: string;
}

function create(model: CreateModel): Promise<AxiosResponse> {
  return axios.post(apiUrl, model);
}

const service = {
  create,
  getById,
};

export default service;
