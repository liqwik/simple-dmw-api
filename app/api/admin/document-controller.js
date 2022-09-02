const HttpResponse = require('app/api/core/http-response');
const { documentService } = require('app/services/admin');
const { ALLOW_OFFICER } = require('app/utils/constant');
const { getPagination } = require('app/utils/pagination');
const { getFilterQuery } = require('app/utils/querystring-util');

const PDFDocument = require('pdfkit');
const { documentRepo } = require('app/repos');

const routePrefix = '/docs';

module.exports = {
  index: {
    route: routePrefix,
    guard: {
      allow: ALLOW_OFFICER,
    },
    action: async (ctx) => {
      const { q, fq, sb, docStart, docEnd, isSign, status } = ctx.query;
      const { limit, page } = getPagination(ctx.query);
      const filter = getFilterQuery(fq);

      const result = await documentService.getList(
        {
          filter: { ...filter, docStart, docEnd, isSign, status },
          search: q,
          searchFields: ['docNo', 'docIn.no'],
        },
        {
          limit,
          page,
          sort: sb,
        }
      );

      return HttpResponse.ok(ctx, result);
    },
  },

  count: {
    route: `${routePrefix}/c`,
    guard: {
      allow: ALLOW_OFFICER,
    },
    action: async (ctx) => {
      const { fq, q } = ctx.query;
      const filter = getFilterQuery(fq);

      const total = await documentService.count({
        filter,
        search: q,
        searchFields: ['docNo'],
      });

      return HttpResponse.ok(ctx, { total });
    },
  },

  get: {
    route: `${routePrefix}/:id`,
    guard: {
      allow: ALLOW_OFFICER,
    },
    action: async (ctx) => {
      const { id } = ctx.params;
      const entity = await documentService.getDetail(id);

      if (!entity) return HttpResponse.notFound(ctx);

      return HttpResponse.ok(ctx, entity);
    },
  },

  create: {
    route: routePrefix,
    method: 'post',
    guard: {
      allow: [...ALLOW_OFFICER],
    },
    action: async (ctx) => {
      const { user } = ctx.state;
      const { signRemark } = ctx.request.body;
      const body = {
        ...ctx.request.body,
        isSign: !!signRemark,
        createdBy: user,
        updatedBy: user,
      };

      const result = await documentService.create(body);

      return HttpResponse.ok(ctx, result);
    },
  },

  update: {
    route: `${routePrefix}/:id`,
    method: 'put',
    guard: {
      allow: ALLOW_OFFICER,
    },
    action: async (ctx) => {
      const { id } = ctx.params;
      const { user } = ctx.state;
      const { signRemark } = ctx.request.body;
      const body = {
        ...ctx.request.body,
        isSign: !!signRemark,
        updatedBy: user,
      };

      const result = await documentService.update(id, body);

      if (!result) return HttpResponse.notFound(ctx);

      return HttpResponse.ok(ctx);
    },
  },

  delete: {
    route: `${routePrefix}/:id`,
    method: 'delete',
    guard: {
      allow: ALLOW_OFFICER,
    },
    action: async (ctx) => {
      const { id } = ctx.params;

      const result = await documentService.solfDelete(id);

      if (!result) return HttpResponse.notFound(ctx);

      return HttpResponse.ok(ctx);
    },
  },

  exportPdf: {
    route: `${routePrefix}/:id/export`,
    // guard: {
    //   allow: ALLOW_OFFICER,
    // },
    action: async (ctx) => {
      const data = await documentRepo.model
        .findById(ctx.params.id)
        .populate('institutionId', 'name');

      if (!data) return HttpResponse.notFound(ctx);

      const { docNo, docLunarDate, institutionId, docDescription } = data;

      // Create a document
      const titleFont = 'assets/fonts/KHMMOOL1.ttf';
      const bodyFont = 'assets/fonts/KhmerOSbattambang.ttf';
      const logo = 'assets/kandal-logo.png';
      const divider = 'assets/divider.png';

      const doc = new PDFDocument({
        font: bodyFont,
        size: 'A4',
        margins: { top: 16, left: 16, right: 16, bottom: 0 },
      });

      const { width: pageWidth, height: pageHeight } = doc.page;

      // Embed a font, set the font size, and render some text
      doc.fontSize(12);
      doc.font(titleFont);
      doc.text('ព្រះរាជាណាចក្រកម្ពុជា', { align: 'center', lineGap: 6 });
      doc.text('ជាតិ សាសនា ព្រះមហាក្សត្រ', { align: 'center' });
      doc.image(divider, (doc.page.width - 64) / 2, 64, {
        width: '64',
      });

      doc.image(logo, doc.x + 16, doc.y, { fit: [64, 64], align: 'center' });
      doc.text('រដ្ឋបាលខេត្តកណ្តាល');
      doc.image(divider, doc.x + 20, doc.y + 4, {
        width: '64',
      });

      doc.moveDown();

      doc.text('កំណត់បង្ហាញលិខិតចូល', { align: 'center' });

      const linePosDocNo = doc.y;
      doc.font(bodyFont);
      doc.text('លិខិតលេខ : ', 16, linePosDocNo);
      doc.text(docNo, 80, linePosDocNo);

      const docNoWidth = doc.widthOfString(docNo);
      doc.text(docLunarDate, docNoWidth + 92, linePosDocNo);
      doc.text('រាជធានីភ្នំពេញ', docNoWidth + 92, doc.y);

      doc.text(`របស់ : ${institutionId && institutionId.name}`, 16, doc.y);

      const descLinePos = doc.y;
      doc.font(titleFont);
      doc.text('កម្មវត្ថុ : ', 16, descLinePos);

      if (docDescription && docDescription.startsWith('{')) {
        const delta = JSON.parse(docDescription);

        delta.ops.forEach(({ insert, attributes }, idx) => {
          doc.font(bodyFont);

          if (attributes && attributes.font === 'Moul') {
            doc.font(titleFont);
            doc.text(
              insert,
              idx === 0 ? 60 : doc.x,
              idx === 0 ? descLinePos : doc.y + 2,
              {
                continued: true,
              }
            );
            doc.y -= 2;

            return;
          }

          if (idx === 0) {
            doc.text(insert, 60, descLinePos, {
              continued: true,
            });
          } else {
            doc.text(insert, {
              continued: true,
            });
          }
        });
      } else {
        doc.font(bodyFont);
        doc.text(docDescription, 60, descLinePos, {
          align: 'justify',
        });
      }

      doc.moveDown();
      doc.font(titleFont);
      const columnWidth = pageWidth / 3;
      const tableHeight = Math.floor((pageHeight - doc.y) / 2 + doc.y);

      doc.moveTo(0, doc.y).lineTo(pageWidth, doc.y).stroke();
      doc.moveTo(columnWidth, doc.y).lineTo(columnWidth, tableHeight).stroke();
      doc
        .moveTo(columnWidth * 2, doc.y)
        .lineTo(columnWidth * 2, tableHeight)
        .stroke();

      const currentY = doc.y + 8;
      doc.text('នាយករដ្ឋបាល', 60, currentY);
      doc.text('នាយកទីចាត់ការ', 250, currentY);
      doc.text('ការិយាល័យជំនាញ', 450, currentY);

      const columnWidth2 = pageWidth / 2;

      doc.moveTo(0, tableHeight).lineTo(pageWidth, tableHeight).stroke();
      doc
        .moveTo(columnWidth2, tableHeight)
        .lineTo(columnWidth2, pageHeight)
        .stroke();

      doc.text('អភិបាលខេត្ត', 118, tableHeight + 8);
      doc.text('អភិបាលរងខេត្តទទួលបន្ទុក', 386, tableHeight + 8);

      // Pipe its output somewhere, like to a file or HTTP response
      // See below for browser usage
      doc.pipe(ctx.res);

      doc.end();

      ctx.res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=document.pdf',
      });

      return new Promise((resolve) => ctx.res.on('finish', resolve));
    },
  },
};
