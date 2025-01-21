import sortImgae from '../../../res/sort.png'
import sortUpImgae from '../../../res/sort-up.png'
import sortDownImgae from '../../../res/sort-down.png'

import '../Dashboard.css'

import Loader from '../../../../santasoft/components/loader/Loader'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import TransactionNewInput from './TransactionNewInput'
import { clearTransactionNewInput } from './TransactionNewInput'

import TransactionsRates from './TransactionsRates'
import TableSummary from '../../../table/TableSummary'
import TableActions from '../../../table/TableActions'
import TableHeader from '../../../table/TableHeader'
import TransactionTableBody from './TransactionTableBody'

import { useState, useEffect } from 'react'
import React from 'react'

import { ip } from '../../../../../App'

function Transactions({ user, refresh, dealer, setDealer, date, dropdownLists, rates, setRates, dataSummary, setDataSummary, fetchedData, setFetchedData, onUpdateHandler, addMessageHandler }) {

  const [isloading, setIsLoading] = useState(false)

  const [filter, setFilter] = useState('empty')

  const [sort, setSort] = useState('empty')

  const getFormattedDate = (formattedDate) => {
    formattedDate = formattedDate.split('-')
    return formattedDate[2] + '-' + formattedDate[1] + '-' + formattedDate[0]
  }

  const [userInput, setUserInput] = useState(
    {
      "id": null,
      "dealer_name": user.name,
      "c_name": '',
      "cif": '',
      "branch_code": '0',
      "cltype": '',
      "recv": 'N',
      "product": '',
      "calc": '.',
      "days": 0,
      "vdate": getFormattedDate(date),
      "days2": 0,
      "vdate2": getFormattedDate(date),
      "ccy": '',
      "n_c": 'Nor',
      "export": '',
      "importt": '',
      "deal_rate": '',
      "i_b_rate": '',
      "third_ccy_cross": '',
      "i_b_premium": '',
      "option_premium": '',
      "third_ccy_premium": '',
      "branch": '',
      "spread": '',
      "profit": '',
      "nostro_ac": '',
      "ttdate": getFormattedDate(date),
      "timestamp": '',
      "at_risk_income_fwd": '',
      "at_risk_income_salam": '',
      "take_up_loss": '',
      "pkr": '',
      "usd": '',
      "salam_yield": '',
      "fbp_profit": '',
      "salam_cost": '',
      "fbp_loss": '',
      "fwd_take_up": '',
      "take_close": '.',
      "c_rem": '',
    }
  )

  useEffect(() => {
    setUserInput({ ...userInput, vdate: getFormattedDate(date), vdate2: getFormattedDate(date), ttdate: getFormattedDate(date) })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const submitHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sfe01/fbUmedhohi0D$p3j4C1cz90fJemU@h&yGgmqhSq@To44eQ0iOG/' + filter + '/' + sort + '/empty/' + date + '/' + dealer + '/0/', {
        method: 'POST',
        body: JSON.stringify(userInput),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Token ' + user.token + ''
        },
      })
      setIsLoading(false);

      let result = await response.json();

      if (response.status === 200) {
        setFetchedData([result.object, ...fetchedData]);
        eraseHandler();
        setDataSummary(result.summary);
        addMessageHandler({
          title: 'Transaction saved',
          content: result.message,
          type: 3
        })
      }

      else if (response.status === 400) {
        addMessageHandler({
          title: 'Transaction not saved',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 401) {
        addMessageHandler({
          title: 'Transaction not saved',
          content: 'Unable to saved due to unauthorized request.',
          type: 4
        })
      }

      else if (response.status === 412) {
        addMessageHandler({
          title: 'Transaction not saved',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 409) {
        addMessageHandler({
          title: 'Transaction not saved',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 406) {
        addMessageHandler({
          title: 'Transaction not saved',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 500) {
        addMessageHandler({
          title: 'Transaction not saved',
          content: result.message,
          type: 4
        })
      }
    }
    catch (err) {
      console.log(err.message);
    }
  };

  // const onUpdate = async () => {
  //   try{
  //     const response = await fetch(ip+'/sfe01/fbUmedhohi0D$p3j4C1cz90fJemU@h&yGgmqhSq@To44eQ0iOG/'+date+'/'+dealer+'/'+edit.object.id+'/', {
  //       method: 'PUT',
  //       body: JSON.stringify(edit.object),
  //       headers: {
  //         'Content-type': 'application/json; charset=UTF-8',
  //         'Authorization': 'Token '+ user.token +''
  //       },
  //     })

  //     let result = await response.json();

  //     if(response.status === 200){
  //       setFetchedData(current => 
  //         current.map(obj => {
  //           if(obj['id'] === edit.object['id']){
  //             return result.object
  //           }
  //           else{
  //             return obj
  //           }
  //         })
  //       );
  //       setDataSummary(result.summary);
  //       setEdit({column:'',object:{"id":0}});
  //       addMessageHandler({
  //         title: 'Transaction Updated',
  //         content: result.message,
  //         type: 3
  //       });
  //     }

  //     else if(response.status === 400){
  //       addMessageHandler({
  //         title: 'Transaction not updated',
  //         content: result.message,
  //         type: 4
  //       })
  //     }

  //     else if(response.status === 401){
  //       addMessageHandler({
  //         title: 'Transaction not updated',
  //         content: 'Unable to update due to unauthorized request.',
  //         type: 4
  //       })
  //     }

  //     else if(response.status === 404){
  //       addMessageHandler({
  //         title: 'Transaction not updated',
  //         content: result.message,
  //         type: 4
  //       })
  //     }

  //     else if(response.status === 409){
  //       addMessageHandler({
  //         title: 'Transaction not updated',
  //         content: result.message,
  //         type: 4
  //       })
  //     }

  //     else if(response.status === 406){
  //       addMessageHandler({
  //         title: 'Transaction not updated',
  //         content: result.message,
  //         type: 4
  //       })
  //     }

  //     else if(response.status === 412){
  //       addMessageHandler({
  //         title: 'Transaction not updated',
  //         content: result.message,
  //         type: 4
  //       })
  //     }

  //     else if(response.status === 500){
  //       addMessageHandler({
  //         title: 'Transaction not updated',
  //         content: result.message,
  //         type: 4
  //       })
  //     }
  //   }
  //   catch (err){
  //     console.log(err.message);
  //   }
  // }

  const deleteHandler = async () => {
    if (selectedRows.length > 1) {
      addMessageHandler({
        title: 'Multiple rows selected',
        content: 'Only one row can be deleted at a time',
        type: 2
      })
    }
    else {
      if (window.confirm("Selected deal will be deleted from the system!")) {
        try {
          setIsLoading(true);
          const response = await fetch(ip + '/sfe01/fbUmedhohi0D$p3j4C1cz90fJemU@h&yGgmqhSq@To44eQ0iOG/' + filter + '/' + sort + '/empty/' + date + '/' + dealer + '/' + selectedRows[0] + '/', {
            method: 'DELETE',
            body: JSON.stringify({ 'user': user.name }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
              'Authorization': 'Token ' + user.token + ''
            },
          })
          setIsLoading(false);

          let result = await response.json();

          if (response.status === 200) {
            setFetchedData(current =>
              current.filter(obj => obj['id'] !== selectedRows[0]).map(filterData => { return filterData })
            );
            setSelectedRows([]);
            setDataSummary(result.summary);
            addMessageHandler({
              title: 'Transaction Deleted',
              content: result.message,
              type: 3
            });
          }

          else if (response.status === 400) {
            addMessageHandler({
              title: 'Transaction not deleted',
              content: result.message,
              type: 2
            })
          }

          else if (response.status === 401) {
            addMessageHandler({
              title: 'Transaction not deleted',
              content: 'Unable to delete due to unauthorized request.',
              type: 4
            })
          }

          else if (response.status === 404) {
            addMessageHandler({
              title: 'Transaction not deleted',
              content: result.message,
              type: 4
            })
          }

          else if (response.status === 406) {
            addMessageHandler({
              title: 'Transaction not deleted',
              content: result.message,
              type: 4
            })
          }

          else if (response.status === 500) {
            addMessageHandler({
              title: 'Transaction not deleted',
              content: result.message,
              type: 4
            })
          }
        }
        catch (err) {
          console.log(err.message);
        }
      }
    }
  }

  const addDays = (maturity, days) => {
    var dealDate
    if (days === '') {
      days = '0'
    }
    days = parseInt(days)
    if (maturity === 'no') {
      dealDate = new Date(date);
      dealDate.setDate(dealDate.getDate() + days);
      dealDate = dealDate.getDate() + "-" + (dealDate.getMonth() + 1) + "-" + dealDate.getFullYear();
      setUserInput({ ...userInput, days: days, vdate: dealDate, vdate2: dealDate })
    }
    else {
      dealDate = userInput['vdate'];
      var splittedDate = dealDate.split('-')
      dealDate = splittedDate[2] + "-" + splittedDate[1] + "-" + splittedDate[0]
      dealDate = new Date(dealDate);
      dealDate.setDate(dealDate.getDate() + days);
      dealDate = dealDate.getDate() + "-" + (dealDate.getMonth() + 1) + "-" + dealDate.getFullYear();
      setUserInput({ ...userInput, days2: days, vdate2: dealDate })
    }
  }

  const eraseHandler = () => {
    clearTransactionNewInput();
    setUserInput({
      "id": null,
      "dealer_name": user.name,
      "c_name": '',
      "cif": '',
      "branch_code": '0',
      "cltype": '',
      "recv": 'N',
      "product": '',
      "calc": '.',
      "days": 0,
      "vdate": getFormattedDate(date),
      "days2": 0,
      "vdate2": getFormattedDate(date),
      "ccy": '',
      "n_c": 'Nor',
      "export": '',
      "importt": '',
      "deal_rate": '',
      "i_b_rate": '',
      "third_ccy_cross": '',
      "i_b_premium": '',
      "option_premium": '',
      "third_ccy_premium": '',
      "branch": '',
      "spread": '',
      "profit": '',
      "nostro_ac": '',
      "ttdate": getFormattedDate(date),
      "timestamp": '',
      "at_risk_income_fwd": '',
      "at_risk_income_salam": '',
      "take_up_loss": '',
      "pkr": '',
      "usd": '',
      "salam_yield": '',
      "fbp_profit": '',
      "salam_cost": '',
      "fbp_loss": '',
      "fwd_take_up": '',
      "take_close": '.',
      "c_rem": '',
    })
  }

  const [columns, setColumns] = useState([
    {
      label: 'Dealer',
      accessor: 'dealer_name',
      display: true,
      sortable: true
    },
    {
      label: 'Branch code',
      accessor: 'branch_code',
      display: true,
      sortable: true
    },
    {
      label: 'Customer name',
      accessor: 'c_name',
      display: true,
      sortable: true
    },
    {
      label: 'CIF',
      accessor: 'cif',
      display: true,
      sortable: true
    },
    {
      label: 'Client type',
      accessor: 'cltype',
      display: true,
      sortable: true
    },
    {
      label: 'N',
      accessor: 'recv',
      display: true,
      sortable: true
    },
    {
      label: 'Product',
      accessor: 'product',
      display: true,
      sortable: true
    },
    {
      label: 'Recv',
      accessor: 'calc',
      display: true,
      sortable: false
    },
    {
      label: 'Fixed days',
      accessor: 'days',
      display: true,
      sortable: true
    },
    {
      label: 'Option date',
      accessor: 'vdate',
      display: true,
      sortable: true
    },
    {
      label: 'Option days',
      accessor: 'days2',
      display: true,
      sortable: true
    },
    {
      label: 'Maturity date',
      accessor: 'vdate2',
      display: true,
      sortable: true
    },
    {
      label: 'Currency',
      accessor: 'ccy',
      display: true,
      sortable: true
    },
    {
      label: 'Norl./Cross',
      accessor: 'n_c',
      display: true,
      sortable: true
    },
    {
      label: 'Export',
      accessor: 'export',
      display: true,
      sortable: true
    },
    {
      label: 'Import',
      accessor: 'importt',
      display: true,
      sortable: true
    },
    {
      label: 'Deal rate',
      accessor: 'deal_rate',
      display: true,
      sortable: true
    },
    {
      label: 'I/B rate',
      accessor: 'i_b_rate',
      display: true,
      sortable: true
    },
    {
      label: '3rd ccy. cross',
      accessor: 'third_ccy_cross',
      display: true,
      sortable: true
    },
    {
      label: 'I/B premium',
      accessor: 'i_b_premium',
      display: true,
      sortable: true
    },
    {
      label: 'Option premium',
      accessor: 'option_premium',
      display: true,
      sortable: true
    },
    {
      label: '3rd ccy. premium',
      accessor: 'third_ccy_premium',
      display: true,
      sortable: true
    },
    {
      label: 'Branch',
      accessor: 'branch',
      display: true,
      sortable: true
    },
    {
      label: 'Spread',
      accessor: 'spread',
      display: true,
      sortable: true
    },
    {
      label: 'Profit',
      accessor: 'profit',
      display: true,
      sortable: true
    },
    {
      label: 'Nostro A/C',
      accessor: 'nostro_ac',
      display: true,
      sortable: true
    },
    {
      label: 'Value date',
      accessor: 'ttdate',
      display: true,
      sortable: true
    },
    {
      label: 'Timestamp',
      accessor: 'timestamp',
      display: true,
      sortable: true
    },
    {
      label: 'Fwd. at risk income',
      accessor: 'at_risk_income_fwd',
      display: true,
      sortable: true
    },
    {
      label: 'Salam L (income)',
      accessor: 'at_risk_income_salam',
      display: true,
      sortable: true
    },
    {
      label: 'Take up loss',
      accessor: 'take_up_loss',
      display: true,
      sortable: true
    },
    {
      label: 'Equiv. (Pkr)',
      accessor: 'pkr',
      display: true,
      sortable: true
    },
    {
      label: 'Equiv. (Usd)',
      accessor: 'usd',
      display: true,
      sortable: true
    },
    {
      label: 'Salam yield',
      accessor: 'salam_yield',
      display: true,
      sortable: true
    },
    {
      label: 'FBP profit',
      accessor: 'fbp_profit',
      display: true,
      sortable: true
    },
    {
      label: 'Salam cost',
      accessor: 'salam_cost',
      display: true,
      sortable: true
    },
    {
      label: 'FBP loss',
      accessor: 'fbp_loss',
      display: true,
      sortable: true
    },
    {
      label: 'Fwd. take up',
      accessor: 'take_up_loss',
      display: true,
      sortable: true
    },
    {
      label: 'Fwd. close out',
      accessor: 'take_close',
      display: true,
      sortable: true
    },
    {
      label: 'C rem',
      accessor: 'c_rem',
      display: true,
      sortable: true
    },

  ])

  const dataSummaryTitles = [
    {
      name: "Total export",
      accessor: "totalExport"
    },
    {
      name: "Total import",
      accessor: "totalImport"
    },
    {
      name: "Total profit",
      accessor: "totalProfit"
    },
    {
      name: "Total risk income forward",
      accessor: "totalAtRiskIncomeFwd"
    },
    {
      name: "Total risk income salam",
      accessor: "totalAtRiskIncomeSalam"
    },
    {
      name: "Total take-up loss",
      accessor: "totalTakeUpLoss"
    },
    {
      name: "Total pkr",
      accessor: "totalPkr"
    },
    {
      name: "Total usd",
      accessor: "totalUsd"
    },
  ]

  // Get Call

  const fetchAPI = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sfe01/fbUmedhohi0D$p3j4C1cz90fJemU@h&yGgmqhSq@To44eQ0iOG/' + filter + '/' + sort + '/empty/' + date + '/' + dealer + '/0/', {
        method: 'Get',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Token ' + user.token + ''
        },
      });
      setIsLoading(false);

      let result = await response.json();

      if (response.status === 200) {
        setFetchedData(result.transaction);
        setDataSummary(result.summary);
      }

      else if (response.status === 401) {
        addMessageHandler({
          title: 'Unable to load',
          content: 'Transaction grid failed to load due to unauthorized request.',
          type: 4
        })
      }

      else if (response.status === 500 || response.status === 406) {
        addMessageHandler({
          title: 'Unable to load',
          content: result.message,
          type: 4
        })
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchAPI();
    // let interval = setInterval(() => fetchAPI(), 1000 * 30);
    // // return () => clearTimeout(interval);
    // return function cleanup() {
    //   clearInterval(interval);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, filter, sort, dealer, date]);

  // 
  //  Paging 
  // 

  const [pageSize, setPageSize] = useState(50)

  const [currentPage, setCurrentPage] = useState(1);

  let totolPages = Math.ceil(dataSummary.count / pageSize)

  const onNextPage = () => {
    if (currentPage === totolPages) {
      setCurrentPage(totolPages)
    }
    else {
      setCurrentPage(currentPage + 1)
    }
  }

  const onPreviousPage = () => {
    if (currentPage === 1) {
      setCurrentPage(1)
    }
    else {
      setCurrentPage(currentPage - 1)
    }
  }

  const getPage = () => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return fetchedData.slice(firstPageIndex, lastPageIndex);
  }

  const [data, setData] = useState(getPage)

  useEffect(() => {
    setData(getPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize, fetchedData]);

  const [showPage, setShowPage] = useState(false)

  const onShowPageClicked = () => {
    if (showPage) {
      setShowPage(false)
    }
    else {
      setShowPage(true)
    }
  }

  const [page, setPage] = useState([
    {
      label: 50,
      status: true
    },
    {
      label: 100,
      status: false
    },
    {
      label: 200,
      status: false
    },
  ])

  const pageSizeSelect = (label) => {
    const newState = page.map(obj => {
      if (obj.label === label) {
        return { ...obj, status: true }
      }
      else {
        return { ...obj, status: false }
      }
    })
    setPage(newState)
    setPageSize(label)
  }

  // 
  //  Selecting Rows 
  // 

  const [selectedRows, setSelectedRows] = useState([])

  const onRowSelect = id => {
    if (selectedRows.includes(id)) {
      setSelectedRows(current =>
        current.filter(row => {
          return row !== id;
        }),
      );
    }
    else {
      setSelectedRows([...selectedRows, id])
    }
  }

  // 
  //  Columns Display 
  // 

  const [columnExpand, setColumnExpand] = useState(false)

  const [allColumns, setAllColumns] = useState(true)

  const onExpandSelectClicked = (accessor) => {
    if (accessor === 'all') {
      if (allColumns) {
        setAllColumns(false)
      }
      else {
        setAllColumns(true)
      }
      const newState = columns.map(obj => {
        if (allColumns) {
          return { ...obj, display: false }
        }
        else {
          return { ...obj, display: true }
        }
      })
      setColumns(newState)
    }
    else {
      const newState = columns.map(obj => {
        if (obj.accessor === accessor) {
          if (obj.display) {
            return { ...obj, display: false }
          }
          else {
            return { ...obj, display: true }
          }
        }
        return obj
      })
      setColumns(newState)
    }
  }

  const onExpandButtonClicked = () => {
    if (columnExpand) {
      setColumnExpand(false)
    }
    else {
      setColumnExpand(true)
    }
  }

  // 
  //  Sorting 
  // 

  const [sortField, setSortField] = useState("");

  const [order, setOrder] = useState("");

  const handleSortingChange = (accessor) => {
    if (order === '') {
      setOrder('asc')
      setSortField(accessor);
    }
    else if (order === 'asc') {
      setOrder('desc')
      setSortField(accessor);
    }
    else if (order === 'desc') {
      setOrder('')
      setSortField('');
    }
  };

  useEffect(() => {
    if (sortField !== '') {
      setSort(sortField + ',' + order)
    }
    else {
      setSort('empty')
    }
  }, [sortField, order]);

  const getSortingImage = (object) => {
    const image = object.sortable
      ? sortField === object.accessor && order === "asc"
        ? sortUpImgae
        : sortField === object.accessor && order === "desc"
          ? sortDownImgae
          : sortImgae
      : sortImgae;
    return image;
  }

  // 
  //  Filtering 
  // 

  const [filterFields, setFilterFields] = useState([
    // {
    //   label: 'Currency',
    //   accessor: 'ccy',
    //   'ccy': 'cccy'
    // },
  ])

  const onFilterSelect = (filterObject, value) => {
    setFilterFields([...filterFields, { label: filterObject.label, accessor: filterObject.accessor, [filterObject.accessor]: value }])
  }

  const onFilterItemDelete = (filterObject) => {
    console.log(filterObject)
    setFilterFields(filterFields =>
      filterFields.filter(obj => {
        return obj !== filterObject;
      }),
    )
  }

  useEffect(() => {
    if (filterFields.length) {
      setFilter(filterFields.map((item) => { return item.accessor + ',' + item[item.accessor] }))
    }
    else {
      setFilter('empty')
    }
  }, [filterFields]);

  // 
  //   Download
  // 

  const onDownloadButtonClicked = async () => {
    let fileName = 'santasoft - ' + new Date()
    if (selectedRows.length) {
      const selectedBlotter = data.filter(obj => {
        return selectedRows.includes(obj['id'])
      })
      const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";
      const ws = XLSX.utils.json_to_sheet(selectedBlotter);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const fileData = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(fileData, fileName + fileExtension);
    }
    else {
      try {
        setIsLoading(true);
        const response = await fetch(ip + '/sfe01/fbUmedhohi0D$p3j4C1cz90fJemU@h&yGgmqhSq@To44eQ0iOG/' + filter + '/' + sort + '/download/' + date + '/' + dealer + '/0/', {
          method: 'Get',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Token ' + user.token + ''
          },
        });
        setIsLoading(false);
        let result = await response.json();
        if (response.status === 200) {
          const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
          const fileExtension = ".xlsx";
          const ws = XLSX.utils.json_to_sheet(result.data);
          const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
          const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
          const data = new Blob([excelBuffer], { type: fileType });
          FileSaver.saveAs(data, fileName + fileExtension);
        }
        else {
          addMessageHandler({
            title: 'Unable to download',
            content: 'Someting went wrong. Please try agian later.',
            type: 4
          })
        }
      }
      catch (err) {
        console.log(err);
      }
    }
  }

  const actions = {
    "modifiable": true,
    "columns": columns,
    "data": data,
    "deleteHandler": deleteHandler,
    "eraseHandler": eraseHandler,
    "submitHandler": submitHandler,
    "onDownloadButtonClicked": onDownloadButtonClicked,
    "count": dataSummary.count,
    "currentPage": currentPage,
    "page": page,
    "pageSize": pageSize,
    "showPage": showPage,
    "pageSizeSelect": pageSizeSelect,
    "onShowPageClicked": onShowPageClicked,
    "onNextPage": onNextPage,
    "onPreviousPage": onPreviousPage,
    "selectedRows": selectedRows,
    "allColumns": allColumns,
    "columnExpand": columnExpand,
    "onExpandButtonClicked": onExpandButtonClicked,
    "onExpandSelectClicked": onExpandSelectClicked,
    "filterFields": filterFields,
    "onFilterSelect": onFilterSelect,
    "onFilterItemDelete": onFilterItemDelete,
  }

  const [dealerList, setDealerList] = useState([])

  useEffect(() => {
    async function fetchAPI() {
      try {

        const response = await fetch(ip + '/sfe01/DW@m9s20MEmCgB7Qaolee*9Lt4D3g6t8eaEAA0h8DD$Unppq2h/', {
          method: 'Get',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Token ' + user.token + ''
          },
        });

        let result = await response.json();

        if (response.status === 200) {
          setDealerList(result.dealerList);
        }

        else if (response.status === 401) {
          addMessageHandler({
            title: 'Unable to load',
            content: 'Dealers list failed to load due to unauthorized request.',
            type: 4
          })
        }

        else if (response.status === 500) {
          addMessageHandler({
            title: 'Unable to load',
            content: result.message,
            type: 4
          })
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchAPI()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='table-container dashboard-fourth-child'>

      {isloading && <Loader margin={'45%'} />}

      {/* Table Title */}
      <div className='table-container-name'>
        <p style={{ display: 'inline' }}>Transaction</p>
        <select onChange={e => setDealer(e.target.value)} value={dealer} style={{ float: 'right', marginRight: '10px', marginBottom: '0.1%', backgroundColor: '#071e31', color: 'white', fontSize: 'x-small', width: '150px', borderRadius: '10px', textAlign: 'center' }}>
          {dealerList.map((item, index) => (
            <option key={index} value={item.dealer}>{item.dealer}</option>
          ))}
        </select>
      </div>

      <TransactionsRates user={user} refresh={refresh} rates={rates} setRates={setRates} date={date} border={'1px solid rgb(148, 148, 148)'} addMessageHandler={addMessageHandler} />

      {/* Table Summary Bar */}
      <TableSummary dataSummaryTitles={dataSummaryTitles} dataSummary={dataSummary}/>

      {/* Table Actions Bar */}
      <TableActions actions={actions} />

      {/* Table Data Grid */}
      <div className='table-container-grid'>
        <table>
          <thead>
            <TableHeader columns={columns} getSortingImage={getSortingImage} handleSortingChange={handleSortingChange} />
          </thead>
          <tbody>
            <TransactionNewInput userInput={userInput} user={user} setUserInput={setUserInput} addDays={addDays} columns={columns} submitHandler={submitHandler} dropdownLists={dropdownLists} addMessageHandler={addMessageHandler} />
            {
              data.map((object) => (
                <TransactionTableBody columns={columns} object={object} onRowSelect={onRowSelect} dropdownLists={dropdownLists} onUpdateHandler={onUpdateHandler} />
              ))
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Transactions