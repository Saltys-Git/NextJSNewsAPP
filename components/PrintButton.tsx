'use client'
import React, { useState } from 'react';
import EscPos from 'escpos';
import HtmlToText from 'html-to-text';

function PrintButton() {
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrintClick = () => {
    setIsPrinting(true);

    // Connect to the printer
    const options = { encoding: 'GB18030' };
    const printer = new EscPos.USB(); // Replace with your printer's vendorId and productId
    const printerDevice = new EscPos.Printer(printer, options);

    printer.open((error) => {
      if (error) {
        console.log(error);
      } else {
        // Convert HTML to plain text
        const html = '<html><head><title>Test Page</title></head><body><h1>Hello, world!</h1></body></html>';
        const text = HtmlToText.fromString(html);

        // Set printer font size and alignment
        printerDevice
            .align('CT')
            .font('A')
            .style('BU')
            .size(1, 1)
            .text('Test Page\n\n');

        // Print plain text content
        printerDevice.text(text);

        // Cut paper and close connection
        printerDevice
            .cut()
            .close();

        setIsPrinting(false);
      }
    });
  };

  return (
    <button onClick={handlePrintClick} disabled={isPrinting}>
      {isPrinting ? 'Printing...' : 'Print'}
    </button>
  );
}

export default PrintButton;
