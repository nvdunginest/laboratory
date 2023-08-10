import axiosInstance from "./instance.service";

type IStatus = {
  id: number;
  name: string;
};

const RequestStatus: IStatus[] = [
  {
    id: 0,
    name: "Chờ xác nhận",
  },
  {
    id: 1,
    name: "Đã tiếp nhận",
  },
  {
    id: 2,
    name: "Đã trả kết quả",
  },
  {
    id: 3,
    name: "Từ chối",
  },
];

const getStatusName = (status: number): string => {
  return RequestStatus.find((x) => x.id === status)?.name ?? "";
};

export type IRequest = {
  id: string;
  ownerEmail: string;
  createdTime: Date;
  status: number;
  ownerPhone: string;
  logs: ILog[];
  attachments: IAttachment[];
};

export type ILog = {
  id: string;
  time: Date;
  user: string;
  actionType: number;
  requestId: string;
  request: null;
};

export type IAttachment = {
  filePath: string;
  filename: string;
  id: string;
  requestId: string;
};

async function getRequests(): Promise<IRequest[]> {
  const res = await axiosInstance.get("requests");
  return res.data;
}

async function receive(requestId: string, user: string): Promise<IRequest[]> {
  const res = await axiosInstance.put(`requests/${requestId}/receive`, {
    user: user,
  });
  return res.data;
}

async function close(requestId: string, user: string): Promise<IRequest[]> {
  const res = await axiosInstance.put(`requests/${requestId}/close`, {
    user: user,
  });
  return res.data;
}

const requestService = {
  getRequests,
  getStatusName,

  receive,
  close,
};

export default requestService;
