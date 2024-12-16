import {
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  TextField,
  Typography,
  Alert
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import RefreshIcon from '@mui/icons-material/Refresh';
import CloseIcon from '@mui/icons-material/Close';

import { useState } from 'react';

const BalanceComp = () => {
  const [balance, setBalance] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [trades, setTrades] = useState([]);
  const [err, setErr] = useState('');
  const [err1, setErr1] = useState('');
  const [inputOne, setInputOne] = useState(0);

  function updateBelance() {
    fetch(process.env.REACT_APP_SERVER_URL + 'api/users/me/balance', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setBalance(result.balance);
      });
  }
  function checkTrades() {
    fetch(process.env.REACT_APP_SERVER_URL + 'api/trades/checkAll', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      }).catch((err)=>{
        setErr("error, try leter")
      });
  }

  function getTrades() {
    fetch(process.env.REACT_APP_SERVER_URL + 'api/trades/created', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (typeof result == 'string') 
          setErr(result);
        else {
          setTrades(result);
          console.log(result)}
      }).catch((err)=>{
        setErr("error, try leter")
      })
  }
  function createTrade(){
    if(typeof(inputOne) !== "number")
    {
       
    }
    fetch(process.env.REACT_APP_SERVER_URL + `api/trades/${inputOne}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        'Access-Control-Allow-Origin': '*',
        
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result !== 'ok') setErr1(result);
        else {console.log(result); setErr1("")}
      }).catch((err1)=>{
        setErr1("error, try leter")
      })
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)} sx={{ display: 'flex', alignItems: 'center' }} ml={2}>
        баланс: {balance} KZT
      </Button>
      <IconButton onClick={updateBelance}>
        <RefreshIcon />
      </IconButton>
      <Dialog onClose={() => setIsOpen(false)} open={isOpen}>
        <DialogTitle justifyContent="space-between" display={"flex"} alignItems={"center"} id="customized-dialog-title">
          действия с балансом
          <IconButton  aria-label="close" onClick={() => setIsOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent display="flex" direction="column" dividers>
          <Stack direction="column">
            <Stack minHeight={"40vh"} maxHeight={"40vh"} overflow={"auto"}>
              <Button
              onClick={() => {
                checkTrades();
                getTrades();
              }}
            >
              показать открытые сделки
            </Button>
            
            <TableContainer>
              <Table >
                <TableHead>
                  <TableRow>
                    <TableCell align="right">карта для оплаты</TableCell>
                    <TableCell align="right">сумма&nbsp;(KZT)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {trades.length>0? trades.map((trade) => (
                    <TableRow
                      key={trade.id}
                    >
                      <TableCell>
                        {trade.card_for_pay}
                      </TableCell>
                      <TableCell align="right">{trade.amount}</TableCell>
                    </TableRow>
                  )): <Typography>{err}</Typography>}
                </TableBody>
              </Table>
            </TableContainer>

            </Stack>
            <Stack>
              <TextField type="text" 
                name='input1' 
                value={inputOne} 
                onChange={(event) => setInputOne(event.target.value)}
                id="amount" 
                label="на сколько пополнить кошелёк" 
                variant="outlined" 
                />
              <Button onClick={()=>{createTrade()}}>создать сделку</Button>
              {err1 === ""?null: <Alert severity="error">{err1}</Alert>}
            </Stack>
          </Stack>
        </DialogContent>
        
      </Dialog>
    </>
  );
};

export default BalanceComp;
