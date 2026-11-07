import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom';
import './styles.css';

const OWNER = {
  name: 'Maya Bennett',
  email: 'hello@mayabennett.studio',
  location: 'Remote / Lahore',
};

const PROJECTS = [
  [
    'after-hours',
    'After Hours',
    'Lumen House',
    'Brand film',
    '2025',
    '01:42',
    'aqz-KE-bpKQ',
    '#8d68ff',
    'A nocturnal fashion cut built from reflective textures, patient pacing, and one decisive final turn.',
  ],
  [
    'soft-launch',
    'Soft Launch',
    'Ritual Coffee',
    'Social campaign',
    '2025',
    '00:48',
    'M7lc1UVf-VE',
    '#ff765f',
    'A warm, grainy product story that makes a new morning ritual feel instantly familiar.',
  ],
  [
    'field-notes',
    'Field Notes',
    'Atlas Running',
    'Documentary',
    '2024',
    '03:18',
    'aqz-KE-bpKQ',
    '#c8f06a',
    'A human-scale portrait of a runner, cut around breath, weather, and the distance between miles.',
  ],
  [
    'one-more-take',
    'One More Take',
    'Morrow Studio',
    'Showreel',
    '2024',
    '01:12',
    'M7lc1UVf-VE',
    '#8d68ff',
    'A kinetic edit that turns studio scraps into a confident point of view.',
  ],
  [
    'slow-burn',
    'Slow Burn',
    'Northline Objects',
    'Product film',
    '2024',
    '01:06',
    'dQw4w9WgXcQ',
    '#ff765f',
    'A precise object study where shadow, silence, and material carry the narrative.',
  ],
  [
    'open-water',
    'Open Water',
    'Blue Current',
    'Travel story',
    '2024',
    '02:24',
    'aqz-KE-bpKQ',
    '#c8f06a',
    'An airy, salt-washed travel story that lets the horizon become the edit.',
  ],
  [
    'the-long-way',
    'The Long Way',
    'Common Ground',
    'Campaign',
    '2023',
    '00:57',
    'M7lc1UVf-VE',
    '#8d68ff',
    'A portrait-led campaign edit about choosing the slower, more considered route.',
  ],
  [
    'small-hours',
    'Small Hours',
    'Common Room',
    'Editorial',
    '2023',
    '01:28',
    'aqz-KE-bpKQ',
    '#ff765f',
    'A quiet editorial piece about the places that stay awake after everyone leaves.',
  ],
  [
    'made-by-hand',
    'Made by Hand',
    'Form / Function',
    'Process film',
    '2023',
    '02:02',
    'aqz-KE-bpKQ',
    '#c8f06a',
    'An intimate process film that turns repetition into a kind of visual percussion.',
  ],
  [
    'still-moving',
    'Still Moving',
    'East / West',
    'Music visualizer',
    '2023',
    '03:44',
    'dQw4w9WgXcQ',
    '#8d68ff',
    'A pulsing visualizer that holds the tension between a still image and a live track.',
  ],
  [
    'the-first-light',
    'The First Light',
    'Dawn Systems',
    'Product launch',
    '2022',
    '01:14',
    'aqz-KE-bpKQ',
    '#ff765f',
    'A bright, architectural launch film with a clean edit and a little electricity underneath.',
  ],
  [
    'in-the-cut',
    'In the Cut',
    'Frame Journal',
    'Editorial series',
    '2022',
    '04:10',
    'M7lc1UVf-VE',
    '#c8f06a',
    'A visual essay about editing itself: instinct, restraint, and the final trim.',
  ],
  [
    'night-shift',
    'Night Shift',
    'Neon Market',
    'Social campaign',
    '2022',
    '00:36',
    'aqz-KE-bpKQ',
    '#8d68ff',
    'A vivid night-market cut that turns a product drop into a place you want to enter.',
  ],
  [
    'under-the-surface',
    'Under the Surface',
    'Aster Labs',
    'Explainer',
    '2022',
    '02:36',
    'M7lc1UVf-VE',
    '#ff765f',
    'A clear, kinetic explainer that makes a complex system feel surprisingly close.',
  ],
  [
    'good-company',
    'Good Company',
    'Common Table',
    'Brand story',
    '2021',
    '01:54',
    'dQw4w9WgXcQ',
    '#c8f06a',
    'A generous, people-first brand story stitched together with laughter and small gestures.',
  ],
  [
    'blue-hour',
    'Blue Hour',
    'Sonder Hotels',
    'Hospitality',
    '2021',
    '01:22',
    'aqz-KE-bpKQ',
    '#8d68ff',
    'A soft-focus hospitality film that makes arrival feel like a change in weather.',
  ],
  [
    'good-form',
    'Good Form',
    'Arc Athletics',
    'Performance film',
    '2021',
    '00:52',
    'M7lc1UVf-VE',
    '#ff765f',
    'A graphic training edit where bodies, typography, and rhythm move as one system.',
  ],
  [
    'open-studio',
    'Open Studio',
    'Paloma Ceramics',
    'Studio portrait',
    '2020',
    '02:48',
    'aqz-KE-bpKQ',
    '#c8f06a',
    'A patient studio portrait with clay under the nails and a story that earns its close.',
  ],
  [
    'signal-loss',
    'Signal Loss',
    'Lowlight Records',
    'Music video',
    '2020',
    '04:02',
    'M7lc1UVf-VE',
    '#8d68ff',
    'A fractured music video built from signal, smear, and the moment a memory breaks.',
  ],
  [
    'the-everyday',
    'The Everyday',
    'Good Objects',
    'Product story',
    '2020',
    '01:08',
    'dQw4w9WgXcQ',
    '#ff765f',
    'A simple object film with a playful edit that respects how a thing enters a life.',
  ],
].map(
  (
    [slug, title, client, category, year, duration, video, accent, description],
    index,
  ) => ({
    slug,
    title,
    client,
    category,
    year,
    duration,
    video,
    accent,
    description,
    budget: 3000 + index * 600,
  }),
);

const SKILLS = [
  [
    'Editing & story',
    'Narrative editing',
    'Turning raw footage into a clear emotional arc.',
  ],
  [
    'Editing & story',
    'Pacing & rhythm',
    'Building momentum, breath, and attention across every cut.',
  ],
  [
    'Editing & story',
    'Interview editing',
    'Finding the strongest human line inside long-form conversations.',
  ],
  [
    'Motion & finishing',
    'Motion graphics',
    'Designing titles, lower thirds, explainers, and visual systems.',
  ],
  [
    'Motion & finishing',
    'Color direction',
    'Creating a consistent visual mood from mixed camera sources.',
  ],
  [
    'Motion & finishing',
    'Sound design',
    'Using room tone, texture, music, and silence to shape feeling.',
  ],
  [
    'Platform craft',
    'Short-form cutdowns',
    'Reframing one idea for Reels, Shorts, TikTok, and paid social.',
  ],
  [
    'Platform craft',
    'YouTube packaging',
    'Building strong openings, chapters, end cards, and thumbnail moments.',
  ],
  [
    'Platform craft',
    'Multi-format delivery',
    'Exporting clean 16:9, 9:16, 1:1, and 4:5 versions.',
  ],
  [
    'Tools',
    'Premiere Pro',
    'Primary editing, organization, sound sync, and finishing workflow.',
  ],
  [
    'Tools',
    'After Effects',
    'Motion systems, compositing, tracking, and visual transitions.',
  ],
  [
    'Tools',
    'CapCut',
    'Fast social-native edits, captions, templates, and mobile-first delivery.',
  ],
  [
    'Tools',
    'Photoshop',
    'Thumbnail concepts, key art, image cleanup, and design support.',
  ],
];

function usePageTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo({ top: 0, behavior: 'instant' }), [pathname]);
}

function Logo() {
  return (
    <Link className="logo" to="/">
      <span className="logo-dot" />
      AN / EDITS
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="site-header">
      <Logo />
      <nav className={open ? 'site-nav is-open' : 'site-nav'}>
        <NavLink onClick={close} to="/work">
          Work
        </NavLink>
        <NavLink onClick={close} to="/about">
          About
        </NavLink>
        <NavLink onClick={close} to="/skills">
          Skills
        </NavLink>
        <NavLink onClick={close} to="/contact">
          Contact
        </NavLink>
      </nav>
      <Link className="header-cta" to="/contact">
        Start a project <span>↗</span>
      </Link>
      <button
        className="menu-toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Toggle navigation"
      >
        {open ? 'Close' : 'Menu'}
      </button>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Logo />
          <p>
            Independent editor & visual storyteller.
            <br />
            Making the good cut since 2020.
          </p>
        </div>
        <div className="footer-links">
          <Link to="/work">Selected work</Link>
          <Link to="/about">About Maya Bennett</Link>
          <Link to="/skills">Skills & tools</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <a className="footer-email" href={`mailto:${OWNER.email}`}>
          {OWNER.email} <span>↗</span>
        </a>
      </div>
      <div className="footer-bottom">
        <span>{OWNER.location}</span>
        <span>Available for select projects</span>
        <span>© 2025 {OWNER.name}</span>
      </div>
    </footer>
  );
}

function VideoFrame({ project, large = false }) {
  return (
    <div
      className={`video-frame ${large ? 'video-frame-large' : ''}`}
      style={{ '--project-accent': project.accent }}
    >
      <iframe
        src={`https://www.youtube.com/embed/${project.video}?rel=0&modestbranding=1`}
        title={`${project.title} by ${project.client}`}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
      <div className="video-overlay">
        <span>{project.client}</span>
        <strong>{project.title}</strong>
        <small>
          {project.category} / {project.duration}
        </small>
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <Link className="project-card" to={`/work/${project.slug}`}>
      <VideoFrame project={project} />
      <div className="project-card-copy">
        <div>
          <h3>{project.title}</h3>
          <span>
            {project.client} / {project.category}
          </span>
        </div>
        <i>↗</i>
      </div>
      <p>{project.description}</p>
    </Link>
  );
}

function Home() {
  return (
    <>
      <main>
        <section className="hero">
          <div className="hero-glow" />
          <div className="hero-kicker">Independent editor / 2020—25</div>
          <h1>
            Make it
            <br />
            feel like
            <br />
            <em>something.</em>
          </h1>
          <div className="hero-bottom">
            <p>
              I’m {OWNER.name}, a video editor shaping raw footage into work
              with a pulse, a point of view, and somewhere to land.
            </p>
            <Link className="coral-button" to="/work">
              Enter the reel <span>↗</span>
            </Link>
          </div>
          <div className="hero-meta">
            <span>Scroll to explore</span>
            <span>01 / 06</span>
          </div>
        </section>
        <section className="statement-band">
          <strong>
            The best edits do not call attention to the cut. They make the
            feeling impossible to miss.
          </strong>
          <span>✦</span>
        </section>
        <section className="section-shell" id="featured-work">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Selected work</span>
              <h2>
                Cuts worth
                <br />
                staying for.
              </h2>
            </div>
            <p>20 projects / brand, culture, and the spaces between.</p>
          </div>
          <div className="featured-project">
            <VideoFrame project={PROJECTS[0]} large />
            <div>
              <span className="eyebrow">Featured cut / {PROJECTS[0].year}</span>
              <h3>{PROJECTS[0].title}</h3>
              <p>{PROJECTS[0].description}</p>
              <Link className="text-link" to={`/work/${PROJECTS[0].slug}`}>
                Open case study <span>↗</span>
              </Link>
            </div>
          </div>
          <div className="project-grid">
            {PROJECTS.slice(1, 7).map(project => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <div className="center-link">
            <Link className="outline-button" to="/work">
              View all 20 projects <span>↗</span>
            </Link>
          </div>
        </section>
        <Process />
        <AboutPreview />
        <Testimonial />
        <ContactCta />
      </main>
    </>
  );
}

function Process() {
  const steps = [
    ['01', 'Listen', 'Find the thing the footage is already trying to say.'],
    [
      '02',
      'Shape',
      'Build rhythm, contrast, and a clear place for the eye to rest.',
    ],
    [
      '03',
      'Release',
      'Leave the viewer with a feeling that keeps moving after the frame.',
    ],
  ];
  return (
    <section className="process-band">
      <span className="eyebrow">The process</span>
      <h2>A good edit is a conversation.</h2>
      <div className="process-grid">
        {steps.map(step => (
          <div className="process-step" key={step[0]}>
            <b>{step[0]}</b>
            <h3>{step[1]}</h3>
            <p>{step[2]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AboutPreview() {
  return (
    <section className="about-preview">
      <div className="about-art">
        <strong>A</strong>
        <span>EDIT / REPEAT / REFINE</span>
      </div>
      <div>
        <span className="eyebrow">About the editor</span>
        <h2>Details are not decoration. They are the story.</h2>
        <p>
          I work with founders, artists, and thoughtful teams who have something
          real to say but need help finding its shape. My process is
          collaborative, direct, and a little obsessed with the last ten
          percent.
        </p>
        <div className="tool-list">
          {['Premiere Pro', 'After Effects', 'CapCut', 'Photoshop'].map(
            tool => (
              <span key={tool}>{tool}</span>
            ),
          )}
        </div>
        <Link className="text-link dark" to="/about">
          More about Maya Bennett <span>↗</span>
        </Link>
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="testimonial">
      <blockquote>
        “Maya found the emotional centre of the footage before we knew what it
        was.”
      </blockquote>
      <cite>— Maya, Lumen House</cite>
    </section>
  );
}

function ContactCta() {
  return (
    <section className="contact-cta">
      <span className="eyebrow dark-eyebrow">
        Have footage? Let’s make it move.
      </span>
      <h2>
        Let’s make
        <br />
        the good cut.
      </h2>
      <Link className="ink-button" to="/contact">
        Start a project <span>↗</span>
      </Link>
    </section>
  );
}

function Work() {
  const [filter, setFilter] = useState('All');
  const categories = [
    'All',
    ...new Set(PROJECTS.map(project => project.category)),
  ];
  const visible =
    filter === 'All'
      ? PROJECTS
      : PROJECTS.filter(project => project.category === filter);
  return (
    <main className="page-shell">
      <div className="page-intro">
        <span className="eyebrow">The archive / 20 cuts</span>
        <h1>
          Work that
          <br />
          <em>moves.</em>
        </h1>
        <p>
          A selection of brand films, social campaigns, documentaries, and small
          cinematic experiments.
        </p>
      </div>
      <div className="filter-row">
        {categories.map(category => (
          <button
            className={filter === category ? 'filter active' : 'filter'}
            key={category}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="archive-grid">
        {visible.map(project => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </main>
  );
}

function Detail() {
  const { slug } = useParams();
  const project = PROJECTS.find(item => item.slug === slug) || PROJECTS[0];
  return (
    <main className="detail-page">
      <Link className="back-link" to="/work">
        ← Back to projects
      </Link>
      <div className="detail-heading">
        <span className="eyebrow">
          {project.client} / {project.category}
        </span>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
      </div>
      <VideoFrame project={project} large />
      <div className="detail-grid">
        <article>
          <span className="eyebrow">The cut</span>
          <p className="detail-copy">
            {project.description} Every frame is designed to give the idea more
            room, then take it away at exactly the right moment.
          </p>
          <p className="detail-copy">
            The edit was built as a conversation between pace, texture, and the
            audience’s attention — with every transition earning its place.
          </p>
        </article>
        <aside className="facts">
          {[
            ['Client', project.client],
            ['Date', `${project.year} / Spring`],
            ['Budget', `PKR ${project.budget.toLocaleString()}`],
            ['Tools', 'Premiere Pro, After Effects, Photoshop'],
            ['Deliverables', 'Hero film, social cutdowns, title cards'],
          ].map(([label, value]) => (
            <div key={label}>
              <b>{label}</b>
              <span>{value}</span>
            </div>
          ))}
        </aside>
      </div>
      <div className="detail-next">
        <span>Keep exploring</span>
        <Link className="text-link" to="/work">
          See all 20 projects <span>↗</span>
        </Link>
      </div>
    </main>
  );
}

function About() {
  return (
    <main className="page-shell about-page">
      <div className="page-intro">
        <span className="eyebrow">About the editor</span>
        <h1>
          Make room
          <br />
          for the <em>feeling.</em>
        </h1>
        <p>
          Good editing is part instinct, part architecture, and part knowing
          when to stop.
        </p>
      </div>
      <div className="about-story">
        <div className="about-art large-art">
          <strong>A</strong>
          <span>EDIT / REPEAT / REFINE</span>
        </div>
        <div>
          <h2>Hi, I’m Maya.</h2>
          <p>
            I’m an independent video editor and visual storyteller based in
            Lahore, working remotely with teams who care about the details. I
            turn long timelines, messy notes, and half-formed ideas into work
            that feels clear, human, and memorable.
          </p>
          <p>
            My favorite projects sit somewhere between a brand film and a short
            story — work with enough structure to land, and enough air to
            surprise you.
          </p>
          <div className="tool-list">
            {['Premiere Pro', 'After Effects', 'CapCut', 'Photoshop'].map(
              tool => (
                <span key={tool}>{tool}</span>
              ),
            )}
          </div>
        </div>
      </div>
      <Process />
      <Testimonial />
    </main>
  );
}

function Skills() {
  const grouped = SKILLS.reduce((groups, skill) => {
    groups[skill[0]] = groups[skill[0]] || [];
    groups[skill[0]].push(skill);
    return groups;
  }, {});
  return (
    <main className="page-shell skills-page">
      <div className="page-intro">
        <span className="eyebrow">The toolkit</span>
        <h1>
          Craft is
          <br />
          more than <em>software.</em>
        </h1>
        <p>
          The tools matter, but the edit starts with listening, shaping, and
          knowing what the audience should feel next.
        </p>
      </div>
      <div className="skills-intro-band">
        <strong>
          From the first rough cut to the last export, every detail has a job.
        </strong>
        <span>13 capabilities / 4 toolsets</span>
      </div>
      <div className="skills-groups">
        {Object.entries(grouped).map(([group, skills]) => (
          <section className="skills-group" key={group}>
            <div className="skills-group-heading">
              <span className="eyebrow">{group}</span>
              <span>{String(skills.length).padStart(2, '0')}</span>
            </div>
            <div className="skills-list">
              {skills.map(([, title, description]) => (
                <article key={title}>
                  <h2>{title}</h2>
                  <p>{description}</p>
                  <span className="skill-arrow">↗</span>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
      <ContactCta />
    </main>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const submit = event => {
    event.preventDefault();
    setSent(true);
  };
  return (
    <main className="page-shell contact-page">
      <div className="page-intro">
        <span className="eyebrow">Start a conversation</span>
        <h1>
          Tell me what
          <br />
          you’re <em>making.</em>
        </h1>
        <p>
          Have a launch, a campaign, or a stack of footage waiting for its
          shape? Send a note.
        </p>
      </div>
      <div className="contact-layout">
        <form className="contact-form" onSubmit={submit}>
          <label>
            Name
            <input name="name" required placeholder="Your name" />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              required
              placeholder="you@studio.com"
            />
          </label>
          <label>
            What are we making?
            <select name="project" defaultValue="">
              <option value="" disabled>
                Select a project type
              </option>
              <option>Brand film</option>
              <option>Social campaign</option>
              <option>Documentary / editorial</option>
              <option>Something else</option>
            </select>
          </label>
          <label>
            Tell me a little more
            <textarea
              name="message"
              rows="6"
              required
              placeholder="Timeline, rough scope, and what you want the work to feel like..."
            />
          </label>
          <button className="coral-button" type="submit">
            {sent ? 'Message ready ✓' : 'Send enquiry ↗'}
          </button>
          {sent && (
            <p className="form-success">
              Thanks — your message is staged. Connect this form to Formspree,
              Resend, or your preferred email endpoint before launch.
            </p>
          )}
        </form>
        <aside className="contact-aside">
          <span className="eyebrow">Elsewhere</span>
          <a href="mailto:hello@mayabennett.studio">hello@mayabennett.studio ↗</a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            Instagram ↗
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <p>
            Remote / Lahore
            <br />
            Available for select projects
          </p>
        </aside>
      </div>
    </main>
  );
}

function App() {
  usePageTop();
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<Detail />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
