import React from 'react';
import { useReactToPrint } from 'react-to-print';

const ThermalPrinter = () => {
  const componentRef = React.useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <div ref={componentRef}>
        <h1>Hello World!</h1>
      </div>
      <button onClick={handlePrint}>Print</button>
    </div>
  );
};

export default ThermalPrinter;
