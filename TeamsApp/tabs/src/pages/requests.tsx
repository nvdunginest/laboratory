import React from "react";
import requestService, { IRequest } from "../services/request.service";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AttachmentUpload from "../components/Upload";

export default function Requests(): JSX.Element {
  const [open, setOpen] = React.useState(false);

  const [requests, setRequests] = React.useState<IRequest[]>([]);
  const [requestSelected, setRequestSelected] = React.useState<IRequest | null>(
    null
  );

  const refresh = async () => {
    try {
      const data = await requestService.getRequests();
      setRequests(data);
      if (requestSelected != null) {
        setRequestSelected(
          data.find((x) => x.id === requestSelected.id) ?? null
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = (request: IRequest) => {
    setRequestSelected(request);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRequestSelected(null);
  };

  const receiveHandle = async () => {
    if (requestSelected)
      try {
        await requestService.receive(requestSelected.id, "Admin");
        refresh();
      } catch (error) {
        console.log(error);
      }
  };

  const closeHandle = async () => {
    if (requestSelected)
      try {
        await requestService.close(requestSelected.id, "Admin");
        refresh();
      } catch (error) {
        console.log(error);
      }
  };

  React.useEffect(() => {
    refresh();
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => handleOpen(row)}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.ownerEmail}</TableCell>
                <TableCell align="right">{row.ownerPhone}</TableCell>
                <TableCell align="right">
                  {requestService.getStatusName(row.status)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {requestSelected && (
          <>
            <DialogTitle id="alert-dialog-title">
              {requestSelected?.ownerPhone} - {requestSelected?.ownerEmail}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {requestSelected.id}
                <AttachmentUpload
                  requestId={requestSelected.id}
                  onSuccess={refresh}
                />
                <div>
                  <p>Tệp đính kèm:</p>
                  <ul>
                    {requestSelected.attachments.map((x) => (
                      <li>{x.filename}</li>
                    ))}
                  </ul>
                </div>
              </DialogContentText>
            </DialogContent>
          </>
        )}
        <DialogActions>
          {requestSelected?.status === 0 && (
            <Button size="small" onClick={receiveHandle} color="success">
              Tiếp nhận
            </Button>
          )}
          {requestSelected?.status === 1 && (
            <Button size="small" onClick={closeHandle} color="primary">
              Trả kết quả
            </Button>
          )}

          <Button size="small" onClick={handleClose} color="error" autoFocus>
            Ẩn
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
