import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { DataGrid, DataGridProps, GridRowParams, GridRowsProp } from '@mui/x-data-grid';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchEtfs,
  fetchStocks,
  selectEtfs,
  selectStocks,
  setEtfsPageInfo,
  setStocksPageInfo,
  selectLoading,
} from '../app/slices/stocks-etfs-slice';
import { EquityType } from '../models/stocksEtfs';
import { StyledStocksEtfsTableContainer } from './styles';

interface IProps {
  equityType: EquityType;
}

function StocksEtfsTable({ equityType }: IProps) {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const stocks = useAppSelector(selectStocks);
  const etfs = useAppSelector(selectEtfs);
  const loading = useAppSelector(selectLoading);

  useEffect(() => {
    if (equityType === 'STOCK') {
      dispatch(fetchStocks({ page: stocks.page, pageSize: stocks.pageSize }));
    }
  }, [dispatch, stocks.page, stocks.pageSize, equityType]);

  useEffect(() => {
    if (equityType === 'ETF') {
      dispatch(fetchEtfs({ page: etfs.page, pageSize: etfs.pageSize }));
    }
  }, [dispatch, etfs.page, etfs.pageSize, equityType]);

  function handlePageChange(page: number) {
    const setPageInfo = equityType === 'STOCK' ? setStocksPageInfo : setEtfsPageInfo;
    const pageSize = equityType === 'STOCK' ? stocks.pageSize : etfs.pageSize;
    dispatch(setPageInfo({ page, pageSize }));
  }

  function handlePageSizeChange(pageSize: number) {
    const setPageInfo = equityType === 'STOCK' ? setStocksPageInfo : setEtfsPageInfo;
    dispatch(setPageInfo({ page: 0, pageSize }));
  }

  function getGridProps() {
    const isStock = equityType === 'STOCK';
    const data = isStock ? stocks : etfs;
    const gridProps = {
      rowCount: data.totalElements,
      page: data.page,
      pageSize: data.pageSize,
      loading: loading[isStock ? 'stocks' : 'etfs'],
      rows: data.data as GridRowsProp,
      columns: [
        { field: 'name', headerName: 'Company', flex: 1, sortable: false },
        { field: 'symbol', headerName: 'Symbol', flex: 1, sortable: false },
      ],
    } as DataGridProps;

    return gridProps;
  }

  function handleRowClick(params: GridRowParams) {
    history.push(`/${equityType.toLowerCase()}s/${params.row.symbol}`);
  }

  return (
    <StyledStocksEtfsTableContainer clickableRow>
      <DataGrid
        {...getGridProps()}
        disableColumnFilter
        disableColumnMenu
        disableSelectionOnClick
        rowsPerPageOptions={[10, 25, 50, 100]}
        paginationMode="server"
        pagination
        classes={{ root: 'table', row: 'row' }}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onRowClick={handleRowClick}
      />
    </StyledStocksEtfsTableContainer>
  );
}

export default StocksEtfsTable;
