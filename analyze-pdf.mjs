import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function analyzePDF() {
  // Try both paths
  const paths = [
    './public/2024.pdf',
    'c:\\Users\\ikrig\\Documents\\ai-implementor\\tax-refund\\106\\2024.pdf'
  ];

  let pdfBuffer;
  let foundPath;
  for (const p of paths) {
    try {
      pdfBuffer = fs.readFileSync(p);
      foundPath = p;
      console.log('Found PDF at:', p);
      break;
    } catch (e) {
      console.log('Not found at:', p);
    }
  }

  if (!pdfBuffer) {
    console.error('PDF not found at any location');
    return;
  }

  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const pages = pdfDoc.getPages();
  
  console.log('\nPDF Analysis:');
  console.log('Pages:', pages.length);
  console.log('Page Size:', pages[0].getWidth(), 'x', pages[0].getHeight());

  // Try to get form fields
  const form = pdfDoc.getForm();
  const fields = form.getFields();
  
  console.log('\nForm Fields Found:', fields.length);
  if (fields.length > 0) {
    console.log('\nField Names:');
    fields.forEach((field, idx) => {
      console.log(`${idx + 1}. ${field.getName()}`);
    });
  } else {
    console.log('No interactive form fields detected (flat PDF)');
    console.log('\nThis is a flat PDF template - needs custom form generation');
  }
}

analyzePDF().catch(err => console.error('Error:', err.message));
