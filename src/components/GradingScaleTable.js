import React from 'react';
import { Table } from 'react-bootstrap';

const GradingScaleTable = () => {
  const tableStyle = {
    // marginTop: '60px',
    marginTop : '10px',
  };

  const thTdStyle = {
    
    textAlign: 'center',
  };

  const thStyle = {
    backgroundColor: '#0fa3b1',
  };

  const tbodyTrStyle = {
    backgroundColor: '#b5e2fa',
  };

  const Thead = {
    backgroundColor: 'white',
    color : '#ff9770',
    fontSize : '26px',
    padding : '10px',
    fontFamily: "'Courier New', Courier, monospace",
    fontWeight: 'bold' 
  }

  return (
    <Table striped bordered hover style={tableStyle} className="text-center"> {/* Center-align content */}
      <thead>
        <tr>
          <th colSpan="3" style={Thead}>GRADING SCALE</th> {/* Set heading with colspan */}
        </tr>
        <tr>
          <th style={thStyle}>Marking Range</th>
          <th style={thStyle}>Grades</th>
          <th style={thStyle}>Remarks</th>
        </tr>
      </thead>
      <tbody>
        <tr style={tbodyTrStyle}>
          <td style={thTdStyle}>91-100</td>
          <td style={thTdStyle}>A1</td>
          <td>Excellent</td>
        </tr>
        <tr style={tbodyTrStyle}>
          <td style={thTdStyle}>81-90</td>
          <td style={thTdStyle}>A2</td>
          <td>Very Good</td>
        </tr>
        <tr style={tbodyTrStyle}>
          <td style={thTdStyle}>71-80</td>
          <td style={thTdStyle}>B1</td>
          <td>Good</td>
        </tr>
        <tr style={tbodyTrStyle}>
          <td style={thTdStyle}>61-70</td>
          <td style={thTdStyle}>B2</td>
          <td>Satisfactory</td>
        </tr>
        <tr style={tbodyTrStyle}>
          <td style={thTdStyle}>51-60</td>
          <td style={thTdStyle}>C1</td>
          <td>Satisfactory</td>
        </tr>
        <tr style={tbodyTrStyle}>
          <td style={thTdStyle}>40-50</td>
          <td style={thTdStyle}>C2</td>
          <td>Unsatisfactory</td>
        </tr>
        <tr style={tbodyTrStyle}>
          <td style={thTdStyle}>Below 40</td>
          <td style={thTdStyle}>D</td>
          <td>Fail</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default GradingScaleTable;

