const PDFDocument = require("pdfkit");

const generateRoadmapPDF = (roadmap, res) => {

    const doc = new PDFDocument({
        margin: 50,
        size: "A4"
    });

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
        "Content-Disposition",
        "attachment; filename=CareerRoadmap.pdf"
    );

    doc.pipe(res);

    const ai = roadmap.roadmap;

    // =========================
    // Header
    // =========================

    doc
        .fontSize(24)
        .fillColor("#2563EB")
        .text("CareerPilot AI Roadmap", {
            align: "center"
        });

    doc.moveDown();

    doc
        .fontSize(16)
        .fillColor("black")
        .text(`Target Role : ${roadmap.targetRole}`);

    doc.text(`Dream Company : ${roadmap.dreamCompany}`);

    doc.text(`Duration : ${roadmap.duration}`);

    doc.moveDown();

    // =========================
    // Candidate Summary
    // =========================

    doc
        .fontSize(18)
        .fillColor("#2563EB")
        .text("Candidate Summary");

    doc.moveDown(0.5);

    doc
        .fontSize(12)
        .fillColor("black")
        .text(ai.candidateSummary);

    doc.moveDown();

    // =========================
    // Learning Strategy
    // =========================

    doc
        .fontSize(18)
        .fillColor("#2563EB")
        .text("Learning Strategy");

    doc.moveDown(0.5);

    doc
        .fontSize(12)
        .fillColor("black")
        .text(ai.learningStrategy);

    doc.moveDown();

    // =========================
    // Weekly Roadmap
    // =========================

    doc
        .fontSize(20)
        .fillColor("#2563EB")
        .text("Weekly Roadmap");

    doc.moveDown();

    ai.roadmap.forEach((week) => {

        doc
            .fontSize(16)
            .fillColor("#111827")
            .text(`Week ${week.week} : ${week.title}`);

        doc.moveDown(0.3);

        doc
            .fontSize(12)
            .fillColor("black")
            .text(`Duration : ${week.duration}`);

        doc.text(`Objective :`);

        doc.text(week.objective);

        doc.moveDown(0.5);

        doc.text("Topics");

        week.topics.forEach((topic) => {

            doc.text(`• ${topic}`);

        });

        doc.moveDown(0.5);

        doc.text("Resources");

        week.resources.forEach((resource) => {

            doc.text(`• ${resource}`);

        });

        doc.moveDown(0.5);

        doc.text(`Mini Project : ${week.project}`);

        doc.moveDown(0.5);

        doc.text("Expected Outcome");

        doc.text(week.expectedOutcome);

        doc.moveDown();

        doc.moveTo(50, doc.y)
            .lineTo(550, doc.y)
            .strokeColor("#D1D5DB")
            .stroke();

        doc.moveDown();

    });

    // =========================
    // Projects
    // =========================

    doc
        .fontSize(20)
        .fillColor("#2563EB")
        .text("Recommended Projects");

    doc.moveDown();

    ai.projects.forEach((project) => {

        doc
            .fontSize(15)
            .fillColor("black")
            .text(project.title);

        doc.fontSize(12);

        doc.text(`Difficulty : ${project.difficulty}`);

        doc.text(project.description);

        doc.text(
            `Tech Stack : ${project.techStack.join(", ")}`
        );

        doc.text(
            `Resume Value : ${project.resumeValue}`
        );

        doc.moveDown();

    });

    // =========================
    // Interview Preparation
    // =========================

    doc
        .fontSize(20)
        .fillColor("#2563EB")
        .text("Interview Preparation");

    doc.moveDown(0.5);

    doc
        .fontSize(12)
        .fillColor("black")
        .text(ai.interviewPreparation);

    doc.moveDown();

    // =========================
    // Resources
    // =========================

    doc
        .fontSize(20)
        .fillColor("#2563EB")
        .text("Learning Resources");

    doc.moveDown();

    ai.resources.forEach((resource) => {

        doc
            .fontSize(14)
            .fillColor("black")
            .text(resource.title);

        doc.fontSize(12);

        doc.text(`Category : ${resource.category}`);

        doc.text(resource.reason);

        doc.moveDown();

    });



    

    doc.end();

};

module.exports = {
    generateRoadmapPDF,
};