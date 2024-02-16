import { Injectable } from '@nestjs/common';
import { UserService } from '../authentication/services/user.service';
import { SalesService } from '../sales/sales.service';
const PDFDocument = require('pdfkit-table');

@Injectable()
export class ReportService {
  constructor(private userService: UserService, private saleService: SalesService) { }

  async getReport() {
    return 'Report Generated';
  }

  async generarPDF(): Promise<Buffer> {
    const pdfBuffer: Buffer = await new Promise(async (resolve) => {
      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
        autoFirstPage: false,
      });

      let pageNumber = 0;
      doc.on('pageAdded', () => {
        pageNumber++;
        let bottom = doc.page.margins.bottom;

        // if (pageNumber > 1) {
        //   doc.image(
        //     // join(process.cwd(), 'uploads/logoCanal.png'),
        //     doc.page.width - 100,
        //     5,
        //     { fit: [45, 45], align: 'center' },
        //   );
        //   doc
        //     .moveTo(50, 55)
        //     .lineTo(doc.page.width - 50, 55)
        //     .stroke();
        // }

        doc.page.margins.bottom = 0;
        doc.font('Helvetica').fontSize(14);
        doc.text(
          'Pág. ' + pageNumber,
          0.5 * (doc.page.width - 100),
          doc.page.height - 50,
          {
            width: 100,
            align: 'center',
            lineBreak: false,
          },
        );
        doc.page.margins.bottom = bottom;
      });

      doc.addPage();
      //   doc.image(
      //     // join(process.cwd(), 'uploads/logoCanal.png'),
      //     doc.page.width / 2 - 100,
      //     150,
      //     { width: 200 },
      //   );
      doc.text('', 0, 400);
      doc.font('Helvetica-Bold').fontSize(24);
      doc.text('CONSTRU SERVICES', {
        width: doc.page.width,
        align: 'center',
      });
      doc.moveDown();

      // doc.addPage();
      // doc.text('', 50, 70);
      // doc.font('Helvetica-Bold').fontSize(20);
      // doc.text('PDF Generado en nuestro servidor');
      // doc.moveDown();
      // doc.font('Helvetica').fontSize(16);
      // doc.text(
      //   'Esto es un ejemplo de como generar un pdf en nuestro servidor nestjs',
      // );

      doc.addPage();
      doc.text('', 50, 70);
      doc.fontSize(24);
      doc.moveDown();
      doc.font('Helvetica').fontSize(20);
      doc.text('Reporte Final de Ventas', {
        width: doc.page.width - 100,
        align: 'center',
      });

      // getting the users
      const users = await this.userService.findAll();
      console.log(
        users.map((elem) => ({
          id: elem.id,
          nombre: elem.name,
        })),
      );
      const ventas = await this.saleService.findAll();
      console.log(ventas);
      const table = {
        title: 'Reporte de Ventas',
        subtitle: 'Reporte Final de ventas',
        // headers: [
        //   {
        //     label: 'id',
        //     property: 'id',
        //     width: 60,
        //   },
        //   {
        //     label: 'cliente',
        //     property: 'cliente',
        //     width: 100
        //   },
        // ],

        headers: [
          { label: "Cliente", property: 'cliente', width: 60, renderer: null },
          { label: "Fecha", property: 'fecha', width: 150, renderer: null },
          { label: "Total Facturado", property: 'total', width: 100, renderer: null },
          // { label: "Price 2", property: 'price2', width: 100, renderer: null },
          // { label: "Price 3", property: 'price3', width: 80, renderer: null },
          // { label: "Price 4", property: 'price4', width: 43,
          //   renderer: (value, indexColumn, indexRow, row, rectRow, rectCell) => { return `U$ ${Number(value).toFixed(2)}` }
          // },
        ],

        datas: ventas.map((elem) => ({
          cliente: elem.client,
          fecha: elem.date,
          total: elem.total,
        }))
        // datas: users.map((elem) => ({
        //   id: elem.id,
        //   nombre: elem.name,
        // })),
        // rows: [{ id: 1, name: 'juan' }],
      };

      doc.table(table, {
        columnsSize: [150, 350],
      });

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
      doc.end();
    });

    return pdfBuffer;
  }
}
