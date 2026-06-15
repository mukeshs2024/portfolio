export const dynamic = 'force-static';

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { education, hackathonsAndEvents, certifications, projects, experiences, skillGroups } from "@/lib/portfolio";

function wrapText(text: string, maxChars: number) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxChars) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }

  if (current) lines.push(current);
  return lines;
}

export async function GET() {
  const inline = true;
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([612, 792]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const margin = 36;
  const width = page.getWidth() - margin * 2;
  let cursorY = 756;

  const write = (text: string, x: number, y: number, size = 9.5, isBold = false) => {
    page.drawText(text, {
      x,
      y,
      size,
      font: isBold ? bold : font,
      color: isBold ? rgb(0.07, 0.11, 0.25) : rgb(0.2, 0.25, 0.33),
    });
  };

  const sectionTitle = (text: string) => {
    cursorY -= 6;
    write(text.toUpperCase(), margin, cursorY, 10.5, true);
    page.drawLine({
      start: { x: margin, y: cursorY - 3 },
      end: { x: page.getWidth() - margin, y: cursorY - 3 },
      thickness: 0.5,
      color: rgb(0.85, 0.87, 0.9),
    });
    cursorY -= 14;
  };

  const paragraph = (text: string, size = 9, lineGap = 11.5) => {
    const maxChars = Math.max(50, Math.floor(width / (size * 0.48)));
    for (const line of wrapText(text, maxChars)) {
      write(line, margin, cursorY, size, false);
      cursorY -= lineGap;
    }
  };

  // Header
  write("Mukesh S", margin, cursorY, 20, true);
  cursorY -= 20;
  write("AI & Data Science Student | Aspiring Data Analyst", margin, cursorY, 10.5, false);
  cursorY -= 14;
  write("vprlks20@gmail.com | 9003474487 | Coimbatore, Tamil Nadu | github.com/mukeshs2024 | linkedin.com/in/mukesh-s-6a1a78333", margin, cursorY, 8.5, false);
  cursorY -= 16;

  // Summary
  sectionTitle("Professional Summary");
  paragraph(
    "AI & Data Science student focused on Data Analytics, Business Intelligence, dashboard development, SQL analysis, and transforming data into meaningful business insights. Experienced in database design, backend FastAPI interfaces, and workflow automation."
  );

  // Experience
  sectionTitle("Internship Experience");
  for (const exp of experiences) {
    write(`${exp.role} — ${exp.organization} (${exp.duration})`, margin, cursorY, 9.5, true);
    cursorY -= 11.5;
    for (const resp of exp.responsibilities) {
      write(`• ${resp}`, margin + 10, cursorY, 8.5, false);
      cursorY -= 10.5;
    }
    write(`Technologies: ${exp.tech.join(", ")}`, margin + 10, cursorY, 8.5, false);
    cursorY -= 12;
  }

  // Projects
  sectionTitle("Key Projects");
  for (const project of projects) {
    write(`${project.title} [Status: ${project.status}]`, margin, cursorY, 9.5, true);
    cursorY -= 11.5;
    paragraph(`Problem: ${project.problem}`, 8.5, 10.5);
    paragraph(`Solution: ${project.solution}`, 8.5, 10.5);
    paragraph(`Business Value: ${project.businessValue}`, 8.5, 10.5);
    write(`Tech Stack: ${project.tech.join(", ")}`, margin, cursorY, 8.5, false);
    cursorY -= 12;
  }

  // Skills
  sectionTitle("Skills & Technologies");
  const skillText = skillGroups.map((group) => `${group.title}: ${group.items.join(", ")}`).join(" | ");
  paragraph(skillText, 8.5, 11);

  // Education
  sectionTitle("Education");
  write(`${education.college} — ${education.degree}`, margin, cursorY, 9.5, true);
  cursorY -= 11.5;
  write(`Batch: ${education.duration} | Cumulative GPA: ${education.cgpa} / 10.0`, margin, cursorY, 8.5, false);
  cursorY -= 14;

  // Certifications & Hackathons
  sectionTitle("Certifications & Hackathons");
  const certText = certifications.map((c) => `${c.title} (${c.issuer})`).join(" | ");
  paragraph(`Certifications: ${certText}`, 8.5, 11);
  
  const hackText = hackathonsAndEvents.map((h) => `${h.title}: ${h.description}`).join(" | ");
  paragraph(`Hackathons & Events: ${hackText}`, 8.5, 11);

  const pdfBytes = await pdf.save();

  return new Response(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": inline
        ? 'inline; filename="Mukesh-S-Resume.pdf"'
        : 'attachment; filename="Mukesh-S-Resume.pdf"',
    },
  });
}