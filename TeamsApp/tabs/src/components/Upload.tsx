import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import styled from "styled-components";
import { Button } from "@mui/material";
const chunkSize = 1048576 * 3; //its 3MB, increase the number measure in mb
const baseUrl = process.env.REACT_APP_ECOBA_API
  ? process.env.REACT_APP_ECOBA_API
  : "http://localhost:8001";
type Props = {
  requestId: string;
  onSuccess: () => void;
};

const AttachmentItem = styled.div`
  position: relative;
  height: 66px;
  padding: 8px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  margin-top: 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;
`;

export default function AttachmentUpload({ requestId, onSuccess }: Props) {
  const [file, setFile] = useState<File | null>();
  const [counter, setCounter] = useState(1);
  const [fileToBeUpload, setFileToBeUpload] = useState<File>();
  const [beginningOfTheChunk, setBeginningOfTheChunk] = useState(0);
  const [endOfTheChunk, setEndOfTheChunk] = useState(chunkSize);
  const [progress, setProgress] = useState<number>(0);
  const [fileGuid, setFileGuid] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [chunkCount, setChunkCount] = useState(0);

  useEffect(() => {
    if (fileSize > 0) {
      fileUpload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileSize, progress]);

  useEffect(() => {
    getFileContext();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const getFileContext = () => {
    if (file) {
      setFileSize(file.size);
      const _totalCount =
        file.size % chunkSize === 0
          ? file.size / chunkSize
          : Math.floor(file.size / chunkSize) + 1; // Total count of chunks will have been upload to finish the file
      console.log(_totalCount);
      setChunkCount(_totalCount);
      setFileToBeUpload(file);
      const fileId = uuidv4() + "." + file.name.split(".").pop();
      setFileGuid(fileId);
    }
  };
  const fileUpload = () => {
    setCounter(counter + 1);
    if (counter <= chunkCount) {
      if (fileToBeUpload != null) {
        var chunk = fileToBeUpload.slice(beginningOfTheChunk, endOfTheChunk);
        uploadChunk(chunk);
      }
    }
  };
  const uploadChunk = async (chunk: any) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/requests/${requestId}/attachments/start-session`,
        chunk,
        {
          params: {
            id: counter,
            fileName: fileGuid,
          },
          headers: { "Content-Type": "application/json" },
          timeout: 600,
        }
      );
      const data = response.data;
      if (data.isSuccess) {
        setBeginningOfTheChunk(endOfTheChunk);
        setEndOfTheChunk(endOfTheChunk + chunkSize);
        if (counter === chunkCount) {
          await uploadCompleted();
        } else {
          var percentage = (counter / chunkCount) * 100;
          setProgress(percentage);
        }
      } else {
        console.log("Error Occurred:", data.errorMessage);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const uploadCompleted = async () => {
    if (file) {
      var formData = new FormData();
      formData.append("fileName", fileGuid);
      const response = await axios.post(
        `${baseUrl}/api/requests/${requestId}/attachments/finish-session`,
        {},
        {
          params: {
            fileName: fileGuid,
            fileRealName: file.name,
          },
          data: formData,
        }
      );
      const data = response.data;
      if (data.isSuccess) {
        setProgress(100);
        clearUploadHandle();
        onSuccess();
      }
    }
  };

  const clearUploadHandle = () => {
    setFile(null);
    setCounter(1);
    setFileToBeUpload(undefined);
    setBeginningOfTheChunk(0);
    setEndOfTheChunk(chunkSize);
    setProgress(0);
    setFileGuid("");
    setFileSize(0);
    setChunkCount(0);
  };
  return (
    <AttachmentItem>
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          }
        }}
      />
      <Button title="Hủy" onClick={clearUploadHandle} />
    </AttachmentItem>
  );
}
