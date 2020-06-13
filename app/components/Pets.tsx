import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import MaterialTable, { Column } from 'material-table';
import petPageStyle from './PetPageStyle';

interface Row {
  name: string;
  type: string;
}

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

export default function Pets() {
  const classes = petPageStyle();

  const [state, setState] = React.useState<TableState>({
    columns: [
      { title: 'Nama peliharaan', field: 'name' },
      { title: 'Jenis hewan', field: 'type' }
    ],
    data: [
      { name: 'Abu', type: 'Persian' },
      { name: 'Lady', type: 'Pomeranian' }
    ]
  });

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MaterialTable
        columns={state.columns}
        data={state.data}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setState(prevState => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return { ...prevState, data };
                });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState(prevState => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setState(prevState => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            })
        }}
        options={{
          actionsColumnIndex: -1,
          search: false,
          toolbar: false,
          paging: false,
          selection: true
        }}
      />
    </div>
  );
}
