import React, { useState } from 'react';
import EscPos from 'escpos';
import HtmlToText from 'html-to-text';

async function findPrinter() {
  const printers = await EscPos.USB.findPrinter();
  return printers[0]; // Assumes there is only one Aures ODP333 printer connected to the computer
}

function PrintButton() {
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrintClick = async () => {
    setIsPrinting(true);

    try {
      // Connect to the printer
      const options = { encoding: 'GB18030' };
      const printer = await findPrinter();
      const printerDevice = new EscPos.Printer(printer, { driver: EscPos.AuresODP, ...options });

      // Convert HTML to plain text
      // const html = '<html><head><title>Test Page</title></head><body><h1>Hello, world!</h1></body></html>';
      // const text = HtmlToText.fromString(html);

      // Set printer font size and alignment
      printerDevice
          .align('center')
          .font('a')
          .style('bu')
          .size(1, 1)
          .text('Test Page\n\n');

      // Print plain text content
      // printerDevice.text(text);

      // Cut paper and close connection
      printerDevice
          .cut()
          .close();

    } catch (error) {
      console.log(error);
    }

    setIsPrinting(false);
  };

  return (
    <button onClick={handlePrintClick} disabled={isPrinting}>
      {isPrinting ? 'Printing...' : 'Print'}
    </button>
  );
}

export default PrintButton;
