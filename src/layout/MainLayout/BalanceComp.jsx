import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  TextField,
  Typography,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import CloseIcon from '@mui/icons-material/Close';
import {
  useCreateTradeMutation,
  useGetBalanceQuery,
  useGetTradesQuery,
} from 'store/reducers/balanceApi';
import { setBalanceOpen } from 'store/reducers/action';
import { useAuth } from 'contexts/index';

const BalanceComp = () => {
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const { balanceOpen } = useSelector((state) => state.action);
  const [inputOne, setInputOne] = useState(0);

  const { data: balanceData = {}, refetch: refetchBalance } = useGetBalanceQuery(null, {
    skip: !isAuthenticated,
  });
  const {
    data: tradesData = [],
    error: tradesError,
    refetch: refetchTrades,
  } = useGetTradesQuery(null, {
    skip: !balanceOpen,
  });
  const [createTrade, { error: createTradeError }] = useCreateTradeMutation();

  const handleCreateTrade = () => {
    createTrade(inputOne);
  };

  return (
    <>
      <Button
        onClick={() => dispatch(setBalanceOpen(true))}
        sx={{ display: 'flex', alignItems: 'center' }}
        ml={2}
      >
        баланс: {balanceData?.balance || 0} KZT
      </Button>
      <IconButton onClick={refetchBalance}>
        <RefreshIcon />
      </IconButton>
      <Dialog onClose={() => dispatch(setBalanceOpen(false))} open={balanceOpen}>
        <DialogTitle
          justifyContent="space-between"
          display="flex"
          alignItems="center"
          id="customized-dialog-title"
        >
          Действия с балансом
          <IconButton aria-label="close" onClick={() => dispatch(setBalanceOpen(false))}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent display="flex" direction="column" dividers>
          <Stack direction="column">
            <Stack minHeight="40vh" maxHeight="40vh" overflow="auto">
              <Button onClick={refetchTrades}>показать открытые сделки</Button>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">карта для оплаты</TableCell>
                      <TableCell align="right">сумма&nbsp;(KZT)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tradesData?.length > 0 && typeof tradesData !== 'string' ? (
                      tradesData.map((trade) => (
                        <TableRow key={trade.id}>
                          <TableCell>{trade.card_for_pay}</TableCell>
                          <TableCell align="right">{trade.amount}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <Typography>{tradesError?.data || 'No trades found'}</Typography>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
            <Stack>
              <TextField
                type="text"
                name="input1"
                value={inputOne}
                onChange={(event) => setInputOne(Number(event.target.value))}
                id="amount"
                label="на сколько пополнить кошелёк"
                variant="outlined"
              />
              <Button onClick={handleCreateTrade}>создать сделку</Button>
              {createTradeError && (
                <Alert severity="error">{createTradeError.data || 'Error creating trade'}</Alert>
              )}
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BalanceComp;
