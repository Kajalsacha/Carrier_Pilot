const PDFDocument = require("pdfkit");

const generateRoadmapPDF = (roadmap, res) => {

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
        "Content-Disposition",
        "attachment; filename=CareerRoadmap.pdf"
    );

    doc.pipe(res);

    doc.fontSize(20).text("CareerPilot AI");

    doc.moveDown();

    doc.text(`Target Role: ${roadmap.targetRole}`);
    doc.text(`Dream Company: ${roadmap.dreamCompany}`);
    doc.text(`Duration: ${roadmap.duration}`);

    doc.end();
};

module.exports = {
    generateRoadmapPDF
};