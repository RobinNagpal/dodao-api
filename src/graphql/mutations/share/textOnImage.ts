import path from 'path';
import { PDFImage } from 'pdf-image';
import fs from 'fs';
import PDFDocument from 'pdfkit';
import data from './tidbits';
import sizeOf from 'image-size';

function writeTextToPdf() {
  const doc: PDFKit.PDFDocument = new PDFDocument({
    autoFirstPage: false,
  });

  doc.pipe(fs.createWriteStream(path.resolve(__dirname, 'output.pdf')));
  const backgroundImage = path.resolve(__dirname, 'background.png');
  let imgSize = sizeOf(backgroundImage);

  doc.font('Helvetica');
  doc.fontSize(100);
  data.map((text) => {
    doc.addPage({ size: [imgSize.width!, imgSize.height!] });
    doc.image(backgroundImage, 0, 0);
    doc.text(text, 20, 220, {
      width: imgSize.width! - 40,
      align: 'center',
    });
  });
  doc.end();
}

// pdf2Image();
async function extractImagesFromPdf() {
  const pdfPath = path.resolve('output.pdf');
  const pdfImage = new PDFImage(pdfPath, {
    combinedImage: false,
    convertOptions: {
      '-quality': '100',
    },
  });

  const pagePaths = await pdfImage.convertFile();
}
