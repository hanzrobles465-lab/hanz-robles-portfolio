from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)
from reportlab.lib import colors

NAVY = colors.HexColor("#071a2f")
RED = colors.HexColor("#d62828")
MUTED = colors.HexColor("#5b6573")
BORDER = colors.HexColor("#dbe2ea")

styles = getSampleStyleSheet()

name_style = ParagraphStyle(
    "Name", parent=styles["Title"], fontName="Helvetica-Bold",
    fontSize=22, leading=24, textColor=NAVY, alignment=TA_LEFT, spaceAfter=2,
)
role_style = ParagraphStyle(
    "Role", parent=styles["Normal"], fontName="Helvetica-Bold",
    fontSize=12.5, textColor=RED, spaceAfter=6,
)
contact_style = ParagraphStyle(
    "Contact", parent=styles["Normal"], fontName="Helvetica",
    fontSize=9.0, textColor=MUTED, spaceAfter=1,
)
section_style = ParagraphStyle(
    "Section", parent=styles["Heading2"], fontName="Helvetica-Bold",
    fontSize=10.5, textColor=NAVY, spaceBefore=5, spaceAfter=2,
    borderPadding=0,
)
body_style = ParagraphStyle(
    "Body", parent=styles["Normal"], fontName="Helvetica",
    fontSize=8.6, leading=10.6, textColor=colors.HexColor("#102033"), spaceAfter=0,
)
job_title_style = ParagraphStyle(
    "JobTitle", parent=styles["Normal"], fontName="Helvetica-Bold",
    fontSize=9.0, textColor=colors.HexColor("#102033"), spaceAfter=0, spaceBefore=2,
)
job_date_style = ParagraphStyle(
    "JobDate", parent=styles["Normal"], fontName="Helvetica-Oblique",
    fontSize=8.2, textColor=MUTED, spaceAfter=1,
)
skill_cat_style = ParagraphStyle(
    "SkillCat", parent=styles["Normal"], fontName="Helvetica-Bold",
    fontSize=8.8, textColor=NAVY, spaceAfter=0,
)
skill_body_style = ParagraphStyle(
    "SkillBody", parent=styles["Normal"], fontName="Helvetica",
    fontSize=8.7, leading=11.2, textColor=colors.HexColor("#102033"), spaceAfter=3,
)

def hr():
    return HRFlowable(width="100%", thickness=0.8, color=BORDER, spaceBefore=2, spaceAfter=6)

story = []

story.append(Paragraph("Hanz Robles", name_style))
story.append(Paragraph("Web &amp; Frontend Developer &mdash; Full Stack knowledge", role_style))
story.append(Paragraph(
    "hanzrobles465@gmail.com &nbsp;|&nbsp; 090-8542-2726 &nbsp;|&nbsp; "
    "github.com/hanzrobles465-lab &nbsp;|&nbsp; "
    "linkedin.com/in/hanz-roblese-a20a391b5 &nbsp;|&nbsp; Nagoya, Japan",
    contact_style,
))
story.append(Paragraph(
    "Visa: Spouse of Japanese National &mdash; no work restrictions "
    "(valid until May 2027, renewal planned)",
    contact_style,
))
story.append(Spacer(1, 3))
story.append(hr())

story.append(Paragraph("PROFILE", section_style))
story.append(Paragraph(
    "Web and frontend developer with 5+ years of experience in web production and frontend "
    "development, combining professional work, freelance projects and practical portfolio "
    "applications. Focus areas: responsive web production, UI implementation, WordPress/ACF, "
    "JavaScript, React, TypeScript, forms/modals/component work, API integration, CRUD, "
    "authentication and basic Supabase/PostgreSQL implementation. Currently expanding into "
    "Full Stack and AI-assisted development, using AI tools (ChatGPT, Claude) within the "
    "development workflow for code generation, review, debugging, refactoring and technical "
    "research. Continuing a Systems Engineering degree online (classes do not affect work "
    "schedule), expected graduation December 2026.",
    body_style,
))

story.append(Paragraph("TECHNICAL SKILLS", section_style))
skills_table_data = [
    [Paragraph("Frontend", skill_cat_style),
     Paragraph("HTML5, CSS3, JavaScript, React, TypeScript, Tailwind CSS, Bootstrap, jQuery, "
               "API integration, accessibility, responsive design, CRUD", skill_body_style)],
    [Paragraph("Backend / Database", skill_cat_style),
     Paragraph("Node.js, Express.js, Supabase, PostgreSQL, authentication, Row Level Security "
               "(RLS), REST API, environment variables", skill_body_style)],
    [Paragraph("WordPress / CMS", skill_cat_style),
     Paragraph("WordPress, Advanced Custom Fields (ACF), Elementor, PHP basics", skill_body_style)],
    [Paragraph("UI / UX", skill_cat_style),
     Paragraph("Figma, Adobe XD, UI design, responsive design, accessibility", skill_body_style)],
    [Paragraph("Dev Tools", skill_cat_style),
     Paragraph("Git, GitHub, npm, Vite, CLI, VS Code, debugging", skill_body_style)],
    [Paragraph("AI-Assisted Dev", skill_cat_style),
     Paragraph("ChatGPT, Claude, prompt engineering, AI coding workflows (code generation, "
               "review, debugging, refactoring, documentation)", skill_body_style)],
]
skills_table = Table(skills_table_data, colWidths=[95, 400])
skills_table.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 0),
    ("RIGHTPADDING", (0, 0), (-1, -1), 6),
    ("TOPPADDING", (0, 0), (-1, -1), 0),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
]))
story.append(skills_table)

story.append(Paragraph("EXPERIENCE", section_style))

experience = [
    ("Freelance &mdash; Web Production / Frontend Development", "June 2024 &ndash; Present",
     "Individual and NDA client projects. Responsive UI, HTML/CSS/JavaScript, "
     "TypeScript, React, Vite, Tailwind CSS, WordPress/ACF/PHP basic updates, forms, modals, "
     "component improvements and website maintenance. Some project names/URLs are confidential "
     "under NDA; scope and technologies used can be discussed in interview."),
    ("Miwa Industry Co., Ltd. (Nagakute Factory) &mdash; Manufacturing / Inspection", "April 2024 &ndash; Present",
     "Non-IT role in automotive rubber parts manufacturing (inspection, processing, cleaning, "
     "packing, machine-setup support), maintained alongside freelance development. Built practical "
     "experience with quality, safety, punctuality and teamwork in a Japanese workplace."),
    ("3R DIM S.A.C. &mdash; Web Developer", "July 2021 &ndash; July 2024",
     "Corporate website development, updates and maintenance. UI implementation with HTML, CSS, "
     "JavaScript, TypeScript, React and Vite; responsive layouts; WordPress/ACF/PHP template "
     "updates; basic API, CRUD, authentication and database integration; Figma, Adobe XD, GitHub "
     "and SFTP workflows."),
    ("Electronica Solutions &mdash; Web Design Assistant / Digital Solutions", "June 2020 &ndash; February 2021",
     "Website updates, content organization, design implementation, form and responsive checks, "
     "and simple UI adjustments with HTML, CSS and JavaScript."),
    ("Calzados Azaleia Peru S.A. &mdash; Systems Intern / Web Design Support", "November 2019 &ndash; March 2020",
     "Internal content review, web information organization, page-update support, HTML/CSS "
     "fundamentals and simple visual adjustments for screens and materials."),
]

for title, dates, desc in experience:
    story.append(Paragraph(title, job_title_style))
    story.append(Paragraph(dates, job_date_style))
    story.append(Paragraph(desc, body_style))

story.append(Paragraph("EDUCATION", section_style))
story.append(Paragraph("Universidad Tecnol&oacute;gica del Per&uacute; &mdash; Systems Engineering (online)", job_title_style))
story.append(Paragraph("Final academic cycle &mdash; expected graduation December 2026", job_date_style))
story.append(Paragraph("Nagoya International Academy &mdash; Japanese language studies (graduate)", job_title_style))
story.append(Paragraph("April 2024 &ndash; April 2026 &mdash; reached conversational N3 level", job_date_style))

story.append(Paragraph("LANGUAGES", section_style))
story.append(Paragraph(
    "Spanish &mdash; Native &nbsp;|&nbsp; Japanese &mdash; N3 conversational (intermediate) "
    "&nbsp;|&nbsp; English &mdash; Basic to intermediate (technical reading, basic communication)",
    body_style,
))

story.append(Paragraph("SELECTED PROJECTS", section_style))
story.append(Paragraph(
    "<b>Nihon Job Finder</b> (React/Node/Express/Supabase job search app, auth + admin panel) "
    "&nbsp;&middot;&nbsp; <b>Weather Dashboard</b> (React, live API) "
    "&nbsp;&middot;&nbsp; <b>WordPress ACF Theme</b> (editable fields) "
    "&nbsp;&middot;&nbsp; <b>Booknest Library</b> (CRUD, LocalStorage) "
    "&nbsp;&middot;&nbsp; <b>Restaurant Menu App</b> (vanilla JS)",
    body_style,
))

doc = SimpleDocTemplate(
    "../cv/Hanz_Robles_CV.pdf",
    pagesize=A4,
    topMargin=7 * mm, bottomMargin=6 * mm,
    leftMargin=18 * mm, rightMargin=18 * mm,
    title="Hanz Robles - CV",
    author="Hanz Robles",
)
doc.build(story)
print("CV generated")
