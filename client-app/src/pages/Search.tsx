import React, { useState } from "react";

import { LayoutContext } from "../components/Layout";
import { IconButton } from "../components/ui-shared";
import { Grid, LinearProgress, TextField, Typography } from "@material-ui/core";

import service, { RequestApiModel } from "../services/request";

export default function Search(): JSX.Element {
  const { changeIndex } = React.useContext(LayoutContext);
  const [id, setId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);
  const [request, setRequest] = useState<RequestApiModel | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setRequest(null);
    try {
      const data = await service.getById(id, email, phone);
      setRequest(data);
    } catch {
      setRequest(null);
      setError("Thông tin không chính xác!");
      console.log("err");
    } finally {
      setLoading(false);
    }
  };

  const getStatus = (status: number): string => {
    switch (status) {
      case 0:
        return "Mới";
      case 1:
        return "Đã tiếp nhận";
      case 2:
        return "Đã trả kết quả";
      default:
        return "Không xác định";
    }
  };

  const handleDownload = async (fileId: string, fileName: string) => {
    if (request)
      try {
        await service.downloadFileById(request.id, fileId, fileName);
      } catch (error) {
        console.log(error);
      }
  };

  React.useEffect(() => {
    changeIndex(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container>
      <Grid item container xs={12} spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Tra cứu yêu cầu</Typography>
        </Grid>
        <Grid item container xs={12} md={4} spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              label="Mã yêu cầu"
              name="id"
              type="text"
              variant="outlined"
              value={id}
              fullWidth
              onChange={(e) => {
                setId(e.currentTarget.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              placeholder="abc@email.com"
              value={email}
              fullWidth
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              name="phone"
              label="Số điện thoại"
              type="phone"
              variant="outlined"
              placeholder="0123456789"
              value={phone}
              fullWidth
              onChange={(e) => {
                setPhone(e.currentTarget.value);
              }}
            />
          </Grid>
        </Grid>
        {loading ? (
          <Grid item xs={12}>
            <LinearProgress />
          </Grid>
        ) : (
          <Grid container item xs={12} spacing={2}>
            {error && (
              <Grid item xs={12}>
                <Typography color="error" variant="subtitle2">
                  {error}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <IconButton
                variant="contained"
                color="primary"
                text="Tra cứu"
                icon="search"
                onClick={handleSubmit}
              />
            </Grid>
          </Grid>
        )}
        {request && (
          <Grid item container xs={12} spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Mã yêu cầu: {request.id}</Typography>
            </Grid>
            <Grid item xs={12}>
              Email: <strong>{request.ownerEmail}</strong>
            </Grid>
            <Grid item xs={12}>
              Phone: <strong>{request.ownerPhone}</strong>
            </Grid>
            <Grid item xs={12}>
              Trạng thái: <strong>{getStatus(request.status)}</strong>
            </Grid>
            <Grid item xs={12} spacing={2}>
              {request.attachments.map((x) => (
                <>
                  <Grid item xs={12}>
                    {x.filename}
                    <IconButton
                      icon="file-download"
                      text="Download"
                      onClick={() => handleDownload(x.id, x.filename)}
                    />
                  </Grid>
                </>
              ))}
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
