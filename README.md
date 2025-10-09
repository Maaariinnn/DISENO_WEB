# WEB ATELIER (UDIT) · Professor's Repository

_Critical Coding for a Better Living._

Use this to start a course (Template Mode). Do **not** fork `web-foundations`.

**Author:** Rubén Vega Balbás, PhD (UDIT, University of Design, Innovation and Technology) — ORCID: <https://orcid.org/0000-0001-6862-9081> · <https://www.udit.es>

### Licensing

- **Code:** MIT — see `LICENSE-CODE`
- **Content:** CC BY-NC 4.0 — see `LICENSE-CONTENT`
  _Unless otherwise indicated._

© 2025 Rubén Vega Balbás, PhD — WEB ATELIER (UDIT)

## Summary

**Web Foundations** is the central repository of the WEB ATELIER (UDIT) initiative, which provides the core content and pedagogical framework for a modern web design course. It embodies a **project-based, one-commit-per-class** approach to teaching front-end web development, emphasizing continuous practice and critical reflection. Every student builds a personal website project incrementally, committing changes after each class. This methodology – guided by the motto **“One student, one repository, one project”** – encourages active learning and ethical, human-centered coding (“Critical Coding for a Better Living”).

## Pedagogical Approach: Incremental Projects & Ethical Web Design

**Project-Based, Incremental Learning:** Each student works on a single web project throughout the semester, adding new features or improvements in every session. At the end of each class, the student **commits their work to a personal repository**, with a descriptive message documenting the update. Over time, these commits form a narrative of the project’s evolution, resulting in a fully functional, responsive, and accessible website in the student’s portfolio. This approach integrates theory and practice continuously – new concepts aren’t taught in isolation, but immediately applied to enhance the ongoing project. For example, after a lesson on responsive design, the student that same week adapts their site for mobile devices, reinforcing the relevance of the concept. By semester’s end, each student has not only learned diverse web techniques but also created a tangible product demonstrating their skills.

**One Commit per Class:** The course is structured such that in each class session students go through a brief lecture, a guided exercise, and then an independent task, which leads to a commit. Commits are made at a regular cadence (after every class), similar to weekly “sprints” in agile methodology. This ritual instills good development habits: writing meaningful commit messages and documenting progress. The commit log becomes a learning journal of mistakes and successes, which instructors can review to understand each student’s thinking and growth. Regular small commits also prevent last-minute cramming and discourage plagiarism – irregular or sudden large code additions stand out and can be investigated. Research in software education supports these benefits: frequent iterative work and version-control data help track engagement and ensure academic integrity.

**Critical and Reflective Coding:** Beyond technical skills, the curriculum encourages students to reflect on the social and ethical context of technology. This is captured in the ethos _“Critical Coding for a Better Living”_. We integrate discussions on wellbeing, accessibility, and ethics into the lessons. For instance, while learning agile development practices, students also read critiques about how excessive focus on speed and metrics can alienate creative workers. Lessons on accessibility are framed around inclusivity and the impact of design on marginalized users. By weaving such reflections through the course, we aim to produce not just competent coders, but responsible designers who question why they build something and who it benefits. Students are encouraged to critique tools and workflows (e.g. understanding the limits of agile or the ethical use of AI in coding) as part of their learning. This approach aligns with global best practices in design education, blending **creative autonomy, critical thinking, and technical rigor**.

**Agile Structure Adapted to Education:** We borrow agile software development concepts (like sprints and iterative development) to structure the class, but adapt them for a learning environment. Each week’s commit is a “mini-sprint” delivering a new increment of the project. However, unlike strict industry sprints, the course remains flexible – if students struggle with a topic, we can pause to reinforce it rather than strictly moving to the next feature. We even include a “buffer” or innovation week if needed, allowing students to improve existing work or explore creative detours. This ensures that agile methodologies serve the students’ learning process rather than impose unrealistic pressure. The goal is to familiarize students with professional practices (version control, continuous integration, iterative development) **while maintaining a learner-centered pace**. In doing so, students appreciate both the value and the limitations of agile: they learn to deliver incrementally, but also reflect on the importance of creative exploration beyond “velocity” and metrics.

## Technology Stack: GitHub Pages, Jekyll, and GitHub Actions

This repository leverages modern web and DevOps tools to create a seamless teaching and learning experience:

- **GitHub Pages for Deployment:** All course materials and student projects are served as static websites via GitHub Pages. GitHub Pages provides free hosting directly from our repositories, so the **course site and each student’s project site are live online** without any complex setup. In this Web Foundations repo, the educational content (like lesson pages and methodology docs) is published through GitHub Pages, making it accessible to students 24/7. Likewise, every student enables Pages on their project repo to deploy their personal site. GitHub Pages has native support for Jekyll, which means our Markdown content and templates are automatically processed into a website on each push. The result is a low-friction deployment pipeline: as soon as a lesson or project update is pushed to the main branch, the corresponding site rebuilds and reflects the changes. This continuous publishing model underscores to students the **importance of iterative development and deployment** – their work is always in a “live” state, just like in real-world web projects.

- **Jekyll Static Site Generator:** The core of our content pipeline is [Jekyll](https://jekyllrb.com), an open-source static site generator. Jekyll takes Markdown files (for lessons, tutorials, etc.) along with HTML templates and produces a ready-to-serve static website. We use Jekyll to transform the content in `docs/` (within Web Foundations) into the course website on GitHub Pages. Jekyll allows us to write lessons in simple Markdown and include metadata in YAML (see below), which it then builds into consistent HTML pages. Because GitHub Pages **integrates Jekyll by default**, our instructors don’t need to manually run builds – GitHub handles it whenever changes are pushed. Jekyll’s **templating system (Liquid)** lets us create reusable layouts for all pages so that all lessons share a common structure and style. For example, we have templates for lesson pages, the course schedule, and the student project index. The benefit of this static site approach is that it’s lightweight, secure, and maintainable: there’s no server-side code to manage, and content can be written in a friendly format while the generator ensures a professional presentation.

- **Liquid Templating:** We utilize the Liquid templating language (originally by Shopify, and built into Jekyll) to add dynamic content to our static pages. **Liquid** allows including common page elements and injecting data without any client-side scripting. For instance, in the “students’ showroom” page, a Liquid loop goes through each entry in a YAML file to generate a list of student projects automatically. In lesson pages, Liquid placeholders insert metadata like the lesson title, date, or author into the HTML. Jekyll and Liquid together let us maintain content and presentation separately: instructors and students can focus on Markdown content, while the templates ensure everything is formatted nicely. Essentially, Liquid gives us the power of a simple CMS – with tags and filters for content – but the output remains a static site. This means the course site is fast and compatible with GitHub Pages, while still being easy to update.

- **GitHub Actions (CI/CD Workflow):** To manage a class of many sites and submissions, we employ **GitHub Actions** for continuous integration tasks. GitHub Actions is a built-in automation platform that can run scripts in response to repository events (like pushes or pull requests). In this repository and the course-template repository, Actions workflows perform several important functions:

  - **Site Builds & Link Checking:** Although GitHub Pages can build Jekyll sites on its own, we use Actions to run additional checks – for example, verifying that the site builds without errors and that all links (especially to student pages) are valid.
  - **YAML Validation:** Actions automatically lint and validate **YAML files** (such as `students.yaml` or `project.yaml` in student repos). This is crucial because a small formatting error in a data file could break a page build. Our CI ensures that when a student submits their project metadata or when the course roster is updated, the YAML syntax is correct and keys like URLs or titles meet expected patterns.
  - **Peer Review Automation:** In Week 4, students submit their project metadata to be included in the course showcase. We use a Pull Request workflow – when a student opens a PR to add their entry to `students.yaml`, a GitHub Action automatically runs to check the submission and even builds a preview of the updated showcase.
  - **Showroom Generation:** Our course “showroom” (the index of all student projects) can be rebuilt by an Action. When `students.yaml` changes (new student added or project title updated), an Action triggers Jekyll to regenerate the index page. This means the instructor doesn’t have to manually regenerate any listing; just merging a PR will automatically update the live class gallery.

## Content Format and Data: Markdown, YAML, Liquid, JSON-LD

- **Markdown:** Used for authoring lessons, briefs, and documentation. It is easy to read, easy to write, and converts to HTML.
- **YAML:** Used in front matter and data files for metadata and configuration. YAML defines project briefs, student lists, and lesson metadata.
- **Liquid:** The templating language Jekyll uses to insert data and loops into static pages.
- **JSON-LD:** Embedded in `<head>` as structured metadata, to provide semantic meaning to lessons and project pages (author, affiliation, ORCID, etc.), aligning with the semantic web and scholarly indexing.

## Repository Structure

```plaintext
professor-course-template/
├── 2025-fall/                    # Semester-specific content
│   ├── es/
│   │   └── index.md             # Course homepage (Spanish)
│   └── en/
│       └── index.md             # Course homepage (English)
├── _data/
│   ├── course/
│   │   ├── en.yml               # Course metadata (English)
│   │   └── es.yml               # Course metadata (Spanish)
│   ├── lessons/
│   │   ├── en.yml               # Lesson links (English)
│   │   └── es.yml               # Lesson links (Spanish)
│   ├── locales.yml              # Language configuration
│   └── students/
│       └── 2025-fall/           # Student data by semester
│           ├── sample-student.yml # Individual student files
│           └── .gitkeep
├── _includes/
│   ├── head.html                # HTML head template
│   ├── header.html              # Site header
│   ├── footer.html              # Site footer
│   ├── lang-switcher.html       # Language switching
│   ├── head-hreflang.html       # Multilingual SEO
│   ├── head-jsonld.html         # Structured data
│   └── students-list-by-files.html # Student showroom (file-based)
├── assets/css/
│   └── site.css                 # Course site styles
├── _config.yml                  # Jekyll configuration
├── Gemfile                      # Ruby dependencies
└── README.md                    # This document
```

## References

- Nelson & Ponciano (2021). _Experiences and insights from using GitHub Classroom to support Project-Based Courses_. arXiv preprint. URL: [https://arxiv.org/abs/2103.07242](https://arxiv.org/abs/2103.07242)
- Vega, Jiménez & Villalobos (2012). _Implementing an Incremental Project-Based Learning Solution for CS1/CS2 Courses_. CSEDU. URL: [http://www.scitepress.org/Papers/2012/39005/](http://www.scitepress.org/Papers/2012/39005/)
- Wallet, B. (2025). _It’s not you: your UX design job is frustrating and unfulfilling – Marx’s concept of alienation applied to today’s design industry_. UX Collective. URL: [https://uxdesign.cc/its-not-you-your-ux-design-job-is-frustrating-and-unfulfilling-14d5180800d7](https://uxdesign.cc/its-not-you-your-ux-design-job-is-frustrating-and-unfulfilling-14d5180800d7)
- Colfelt, A. (2010). _Bringing User-Centered Design to the Agile Environment_. Boxes and Arrows. URL: [https://boxesandarrows.com/bringing-user-centered-design-to-the-agile-environment/](https://boxesandarrows.com/bringing-user-centered-design-to-the-agile-environment/)
- Hacker News (2020). _GitHub Classroom discussion (NC State experience with Jenkins CI feedback)._ URL: [https://news.ycombinator.com/item?id=23399742](https://news.ycombinator.com/item?id=23399742)
- Walsh, J.D. (2025). _Everyone Is Cheating Their Way Through College_. New York Magazine. URL: [https://nymag.com/intelligencer/article/openai-chatgpt-ai-cheating-education-college-students-school.html](https://nymag.com/intelligencer/article/openai-chatgpt-ai-cheating-education-college-students-school.html)
- Neumann & Baumann (2021). _Agile Methods in Higher Education: Adapting and Using eduScrum with Real World Projects_. IEEE Frontiers in Education. URL: [https://doi.org/10.48550/arXiv.2106.12166](https://doi.org/10.48550/arXiv.2106.12166)

```

```
