import fs from 'fs';
import sizeOf from 'image-size';
import path from 'path';
import { PDFImage } from 'pdf-image';
import PDFDocument from 'pdfkit';

export function writeTextToPdf(backgroundImagePath: string, contents: { title: string; content: string }[], outputPath: string) {
  const doc: PDFKit.PDFDocument = new PDFDocument({
    autoFirstPage: false,
  });

  doc.pipe(fs.createWriteStream(outputPath));
  let imgSize = sizeOf(backgroundImagePath);

  doc.font('Helvetica');
  doc.fontSize(100);
  contents.map((content) => {
    doc.addPage({ size: [imgSize.width!, imgSize.height!] });
    doc.image(backgroundImagePath, 0, 0);

    doc.text(content.title, 20, 220, {
      width: imgSize.width! - 40,
      align: 'center',
    });

    doc.text(content.content, 20, 370, {
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
