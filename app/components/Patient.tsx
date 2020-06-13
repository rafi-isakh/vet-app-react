import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import MaterialTable, { Column } from 'material-table';
import patientPageStyle from './PatientPageStyle';
import Pets from './Pets';

interface Row {
  name: string;
  address: string;
  contact: string;
}

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

type Props = {
  drawer: boolean;
};

export default function Patient(props: Props) {
  const classes = patientPageStyle();
  const { drawer } = props;
  const [state, setState] = React.useState<TableState>({
    columns: [
      { title: 'Nama pemilik', field: 'name' },
      { title: 'Alamat', field: 'address' },
      { title: 'Kontak', field: 'contact' }
    ],
    data: [
      {
        name: 'Irsyad',
        address: 'Jl Permata Tamansari Asri 3 no 9',
        contact: '08172300229'
      },
      {
        name: 'Oskar',
        address: 'Jl Gumuruh Belakang no 55',
        contact: '0818618061'
      }
    ]
  });

  return (
    <div className={drawer ? classes.shiftRight : classes.root}>
      <CssBaseline />
      <MaterialTable
        title="Data Pasien"
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
        detailPanel={() => {
          return <Pets />;
        }}
        options={{
          actionsColumnIndex: -1
        }}
      />
    </div>
  );
}
