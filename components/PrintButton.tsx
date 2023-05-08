import React from 'react';
import { Printer, Text, Row } from 'react-thermal-printer';

const ThermalPrinter = () => {
  return (
    <Printer type="epson" width={42} characterSet="korea">
      <Text>Printing with React is easy!</Text>
      <Row left="Left text" right="Right text" />
    </Printer>
  );
};

export default ThermalPrinter;