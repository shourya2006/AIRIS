import React, { useEffect, useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  Cpu,
  Terminal,
  Zap,
  ExternalLink,
  ArrowRight,
  Brain,
  Globe,
  Shield,
  Linkedin,
  Instagram,
  Target,
  Send,
} from "lucide-react";
import "./App.css";

function App() {
  const [formStatus, setFormStatus] = useState("");

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Typing effect on mount for hero title
  useEffect(() => {
    const text = "Intelligent";
    let curr = "";
    let i = 0;
    const el = document.getElementById("typing-text");
    if (el) {
      const interval = setInterval(() => {
        curr += text.charAt(i);
        el.innerText = curr;
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 100);
      return () => clearInterval(interval);
    }
  }, []);

  const formRef = useRef();

  const handleContact = async (e) => {
    e.preventDefault();
    setFormStatus("TRANSMITTING...");

    // Extract values
    const formData = new FormData(formRef.current);
    const userName = formData.get("user_name");
    const userEmail = formData.get("user_email");
    const message = formData.get("message");

    // Pass multiple aliases for the email so that the template "To Email" field catches it
    // regardless of whether it uses {{user_email}}, {{email}}, or {{reply_to}}
    const templateParams = {
      user_name: userName,
      user_email: userEmail,
      email: userEmail,
      reply_to: userEmail,
      message: message,
    };

    try {
      // 1. Send main contact form
      await emailjs.send(
        "service_8pshv8o",
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        },
      );

      // 2. Send Auto-Reply
      await emailjs.send(
        "service_8pshv8o",
        import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID,
        templateParams,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        },
      );

      setFormStatus("DELIVERED");
      e.target.reset(); // Reset form locally
      setTimeout(() => setFormStatus(""), 3000);
    } catch (error) {
      console.error(error);
      alert(
        "Error sending transmission: " +
          (error.text || error.message || "Unknown error"),
      );
      setFormStatus("FAILED");
      setTimeout(() => setFormStatus(""), 3000);
    }
  };

  return (
    <div className="app-container">
      {/* Crazy Overlays */}
      <div className="scanlines"></div>
      <div className="scanline-bar"></div>
      <div className="vignette"></div>

      {/* Navbar with glitch hover */}
      <nav className="navbar">
        <div
          className="nav-brand"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          {/* Logo Placeholder */}
          <div
            style={{
              width: "32px",
              height: "32px",
              background: "var(--accent-purple)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "4px",
              marginRight: "0.5rem",
            }}
          >
            <Brain size={20} color="var(--bg-dark)" />
          </div>
          AIRIS
        </div>
        <div className="nav-links">
          <button className="nav-link" onClick={() => scrollTo("events")}>
            [ Work So Far ]
          </button>
          <button className="nav-link" onClick={() => scrollTo("whatwedo")}>
            [ Overview ]
          </button>
          <button className="nav-link" onClick={() => scrollTo("projects")}>
            [ Deployments ]
          </button>
          <button className="nav-link" onClick={() => scrollTo("team")}>
            [ Directory ]
          </button>
          <button className="nav-link" onClick={() => scrollTo("contact")}>
            [ Contact ]
          </button>
        </div>
      </nav>

      <main className="main-content">
        {/* HERO SECTION */}
        <section className="section hero-section">
          <div className="sys-label">SYSTEM.INIT()</div>
          <div className="hero-pill">
            <div className="glow-dot"></div> CONNECTION_ESTABLISHED
          </div>

          <h1 className="hero-title typewriter-cursor">
            Architect the <br />{" "}
            <span className="accent" id="typing-text"></span>
            <br /> Systems of Tomorrow.
          </h1>

          <p className="hero-subtitle">
            An academic collective of developers pushing the extreme boundaries
            of machine learning, computational neural nets, and systems
            architecture.
          </p>

          <div className="hero-cta">
            <button
              className="btn btn-primary"
              onClick={() => scrollTo("contact")}
            >
              Initialize User
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => scrollTo("events")}
            >
              View Logs
            </button>
          </div>
        </section>

        {/* EVENTS SECTION - Color fill slide (MOVED HERE) */}
        <section id="events" className="section">
          <div className="section-header">
            <h2 className="section-title">Work_So_Far</h2>
            <div className="section-id">0x01</div>
          </div>

          <div className="events-container">
            {[
              {
                mo: "Feb",
                d: "10",
                title: "Product Hackathon",
                desc: "48-hour continuous deployment hackathon. Goal: Productionize an open-source inference endpoint.",
                image: "/static/productHackathon.png",
                link: "https://www.linkedin.com/posts/airis-ai_artificialintelligence-hackathon-aiinnovation-activity-7429140026187304960--U-a?utm_source=share&utm_medium=member_desktop&rcm=ACoAADZhk4oBL984fo5JdmWPgN1SUBIhAJqTdPE",
              },
              {
                mo: "Nov",
                d: "22",
                title: "Kaggle Competition",
                desc: "Technical contest comparing predictive models engineered by different computational pods.",
                image: "/static/kaggle_event.png",
                link: "https://www.linkedin.com/posts/airis-ai_ai-genai-studentbuilders-activity-7418277728749281280-Nd_2?utm_source=share&utm_medium=member_desktop&rcm=ACoAADZhk4oBL984fo5JdmWPgN1SUBIhAJqTdPE",
              },
              {
                mo: "Jan",
                d: "05",
                title: "Peer to Peer Sessions",
                desc: "Analyzing the future iterations of computational graphs and automated reasoning.",
                image: "/static/peertopeer.png",
                link: "https://www.linkedin.com/posts/airis-ai_aicommunity-internshipprep-upskilling-activity-7428052857322631168-q-Ma?utm_source=share&utm_medium=member_desktop&rcm=ACoAADZhk4oBL984fo5JdmWPgN1SUBIhAJqTdPE",
              },
              {
                mo: "Feb",
                d: "12",
                title: "Club Recruitments",
                desc: "Screening algorithms and architectural system evaluations for incoming candidates.",
                image: "/static/clubExam.png",
                link: "https://www.linkedin.com/posts/airis-ai_genai-airesearch-artificialintelligence-activity-7425157504923287552-a-MG?utm_source=share&utm_medium=member_desktop&rcm=ACoAADZhk4oBL984fo5JdmWPgN1SUBIhAJqTdPE",
              },
            ].map((e, i) => (
              <div
                key={i}
                className="event-row"
                onClick={() => window.open(e.link, "_blank")}
              >
                <div
                  className="event-row-poster"
                  style={{ backgroundImage: `url(${e.image})` }}
                ></div>
                <div className="event-row-overlay"></div>

                <div className="event-date-cell">
                  <div className="month">{e.mo}</div>
                  <div className="day">{e.d}</div>
                </div>
                <div className="event-info-cell">
                  <h3>{e.title}</h3>
                  <p>{e.desc}</p>
                </div>
                <div className="event-action-cell">
                  <ArrowRight size={28} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TELEMETRY SECTION - Engagement & Reputation */}
        <section
          id="metrics"
          className="section"
          style={{ paddingTop: "0", paddingBottom: "0" }}
        >
          <div className="grid-2">
            <div className="metric-card">
              <div className="metric-content">
                <div
                  className="sys-label"
                  style={{
                    background: "rgba(113, 158, 122, 0.1)",
                    borderColor: "var(--accent-green)",
                    color: "var(--accent-green)",
                  }}
                >
                  <div
                    className="glow-dot"
                    style={{ background: "var(--accent-green)" }}
                  ></div>
                  ENGAGEMENT_METRIC
                </div>
                <div className="metric-value">
                  45
                  <span
                    style={{
                      fontSize: "3.5rem",
                      color: "var(--accent-green)",
                      marginLeft: "0.5rem",
                    }}
                  >
                    +
                  </span>
                </div>
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.9rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Average attendance at
                  <br />
                  weekly AI workshops.
                </p>
                <div className="metric-chart">
                  <div
                    className="metric-bar"
                    style={{ animationDuration: "1.2s" }}
                  ></div>
                  <div
                    className="metric-bar"
                    style={{ animationDuration: "0.8s" }}
                  ></div>
                  <div
                    className="metric-bar"
                    style={{ animationDuration: "1.5s" }}
                  ></div>
                  <div
                    className="metric-bar"
                    style={{ animationDuration: "0.9s" }}
                  ></div>
                  <div
                    className="metric-bar"
                    style={{ animationDuration: "1.1s" }}
                  ></div>
                  <div
                    className="metric-bar"
                    style={{ animationDuration: "1.3s" }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-content">
                <div
                  className="sys-label"
                  style={{
                    background: "rgba(179, 136, 255, 0.1)",
                    borderColor: "var(--accent-purple)",
                    color: "var(--accent-purple)",
                  }}
                >
                  <div
                    className="glow-dot"
                    style={{ background: "var(--accent-purple)" }}
                  ></div>
                  REPUTATION_SCORE
                </div>
                <div className="metric-value">
                  12
                  <span
                    style={{
                      fontSize: "3.5rem",
                      color: "var(--accent-purple)",
                      marginLeft: "0.5rem",
                      textTransform: "lowercase",
                    }}
                  >
                    x
                  </span>
                </div>
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.9rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  External hackathons &<br />
                  competitions won by members.
                </p>
                <div className="metric-chart">
                  <div
                    className="metric-bar"
                    style={{ animationDuration: "1.1s" }}
                  ></div>
                  <div
                    className="metric-bar"
                    style={{ animationDuration: "0.7s" }}
                  ></div>
                  <div
                    className="metric-bar"
                    style={{ animationDuration: "1.4s" }}
                  ></div>
                  <div
                    className="metric-bar"
                    style={{ animationDuration: "1.0s" }}
                  ></div>
                  <div
                    className="metric-bar"
                    style={{ animationDuration: "0.8s" }}
                  ></div>
                  <div
                    className="metric-bar"
                    style={{ animationDuration: "1.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OPERATIONS SECTION - 3D Cards */}
        <section id="whatwedo" className="section">
          <div className="section-header">
            <h2 className="section-title">Operations_Directory</h2>
            <div className="section-id">0x02</div>
          </div>

          <div className="grid-3">
            {[
              {
                icon: <Brain size={28} />,
                title: "Deep Learning",
                desc: "Constructing neural networks for complex pattern recognition and natural language processing tasks.",
              },
              {
                icon: <Terminal size={28} />,
                title: "Core Engineering",
                desc: "Writing high-performance algorithms, data structures, and optimizing runtime execution contexts.",
              },
              {
                icon: <Globe size={28} />,
                title: "Systems Integration",
                desc: "Deploying computational models to web and edge devices via robust, scalable APIs.",
              },
              {
                icon: <Cpu size={28} />,
                title: "Hardware Acceleration",
                desc: "Exploring parallel computing logic, CUDA, and high-throughput GPU training environments.",
              },
              {
                icon: <Zap size={28} />,
                title: "Generative Search",
                desc: "Experimenting with language models, transformer architectures, and embedding spaces.",
              },
              {
                icon: <Shield size={28} />,
                title: "Alignment & Security",
                desc: "Rigorous testing of model parameters, adversarial robustness, and operational security.",
              },
            ].map((item, idx) => (
              <div key={idx} className="card">
                <div className="icon-wrapper">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS SECTION - Shrink reveal */}
        <section id="projects" className="section">
          <div className="section-header">
            <h2 className="section-title">Active_Deployments</h2>
            <div className="section-id">0x03</div>
          </div>

          <div className="grid-3">
            {[
              {
                icon: <Target size={56} />,
                title: "Vanguard-Vision",
                tags: ["TensorFlow", "WASM"],
                desc: "Real-time client-side object detection deployed via WebAssembly. Low latency inference.",
              },
              {
                icon: <Cpu size={56} />,
                title: "Iterative Synth",
                tags: ["PyTorch", "Python"],
                desc: "LoRA-adapted models fine-tuned specifically for generating automated test suites and proofs.",
              },
              {
                icon: <Globe size={56} />,
                title: "DataFlow Pipeline",
                tags: ["Go", "Kafka"],
                desc: "High-throughput telemetry and data scraping backbone for system training multipliers.",
              },
              {
                icon: <Brain size={56} />,
                title: "Neuro-Chat",
                tags: ["LangChain", "React"],
                desc: "Multi-agent LLM orchestration system capable of handling complex reasoning loops autonomously.",
              },
              {
                icon: <Shield size={56} />,
                title: "Secur-AI",
                tags: ["Rust", "PyTorch"],
                desc: "Adversarial prompt-injection detection firewall for commercial large language models.",
              },
              {
                icon: <Zap size={56} />,
                title: "Rapid-Edge",
                tags: ["ONNX", "C++"],
                desc: "Model quantization toolkit dropping parameter weights by 40% with minimal accuracy loss.",
              },
            ].map((p, i) => (
              <div key={i} className="card project-card">
                <div className="project-visual">{p.icon}</div>
                <div className="project-content">
                  <div className="project-title">
                    <h3>{p.title}</h3>
                    <ExternalLink size={20} />
                  </div>
                  <p className="project-desc">{p.desc}</p>
                  <div className="tags">
                    {p.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TEAM SECTION - Splitting into Core & Mentors */}
        <section id="team" className="section">
          <div className="section-header">
            <h2 className="section-title">User_Directory</h2>
            <div className="section-id">0x04</div>
          </div>

          {/* Core Committee */}
          <h3
            style={{
              color: "var(--accent-purple)",
              marginBottom: "2rem",
              borderBottom: "1px dashed var(--border-color)",
              paddingBottom: "0.5rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              display: "block",
            }}
          >
            Core Committee
          </h3>
          <div className="team-grid" style={{ marginBottom: "5rem" }}>
            {[
              {
                name: "Rachit Gupta",
                role: "President",
                image: "/static/people/rachit.jpeg",
                linkedin: "#",
              },
              {
                name: "Aditya Srivastava",
                role: "Vice-President",
                image: "/static/people/aditya.jpeg",
                linkedin:
                  "https://www.linkedin.com/in/aditya-srivastava-3bb819323/",
              },
              {
                name: "Shourya Bafna",
                role: "Technical Head",
                image: "/static/people/shourya.jpeg",
                linkedin:
                  "https://www.linkedin.com/in/shourya-bafna-80a670215/",
              },
              {
                name: "Yash Dhankar",
                role: "Operations Head",
                image: "/static/people/yash.jpeg",
                linkedin: "#",
              },
              {
                name: "Vendant Mande",
                role: "Marketing Head",
                image: "/static/people/vedant.jpeg",
                linkedin: "https://www.linkedin.com/in/vedantmadne/",
              },
              {
                name: "Japindar Kaur",
                role: "General Secretary",
                image: "/static/people/japinder.jpeg",
                linkedin: "#",
              },
              {
                name: "Harshita Joshi",
                role: "Outreach Head",
                image: "/static/people/harshita.jpeg",
                linkedin:
                  "https://www.linkedin.com/in/harshita-joshi-918ab9320/",
              },
              {
                name: "Shreya Suman",
                role: "Logistics Head",
                image: "/static/people/shreya.jpeg",
                linkedin: "#",
              },
            ].map((member, idx) => (
              <div key={`core-${idx}`} className="team-member">
                <div className="team-member-inner">
                  <div className="team-front">
                    <div
                      className="avatar"
                      style={{ overflow: "hidden", padding: 0 }}
                    >
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      ) : (
                        <Cpu size={28} />
                      )}
                    </div>
                    <h4 className="team-name">{member.name}</h4>
                    <p className="team-role">{member.role}</p>
                  </div>
                  <div className="team-back">
                    <h4>{member.name}</h4>
                    <p>STATUS: ACTIVE</p>
                    <p style={{ marginBottom: "1rem" }}>CLEARANCE: LVL 5</p>
                    <div style={{ display: "flex", gap: "1rem" }}>
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            color: "var(--bg-dark)",
                            transition: "transform var(--transition-fast)",
                          }}
                          onMouseOver={(e) =>
                            (e.currentTarget.style.transform = "scale(1.2)")
                          }
                          onMouseOut={(e) =>
                            (e.currentTarget.style.transform = "scale(1)")
                          }
                        >
                          <Linkedin size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mentors & Advisors */}
          <h3
            style={{
              color: "var(--accent-purple)",
              marginBottom: "2rem",
              borderBottom: "1px dashed var(--border-color)",
              paddingBottom: "0.5rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              display: "block",
            }}
          >
            Mentors & Advisors
          </h3>
          <div className="team-grid">
            {[
              {
                name: "Kartik Gupta",
                image: "/static/people/kartik.jpeg",
                linkedin: "https://www.linkedin.com/in/kartikgupta98/",
              },
              {
                name: "Bipul Shahi",
                image: "/static/people/Bipul.jpeg",
                linkedin: "https://www.linkedin.com/in/bipulshahi/",
              },
            ].map((member, idx) => (
              <div key={`mentor-${idx}`} className="team-member">
                <div className="team-member-inner">
                  <div className="team-front">
                    <div
                      className="avatar"
                      style={{ overflow: "hidden", padding: 0 }}
                    >
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      ) : (
                        <Terminal size={28} />
                      )}
                    </div>
                    <h4 className="team-name">{member.name}</h4>
                    <p className="team-role">MENTOR_NODE</p>
                  </div>
                  <div className="team-back">
                    <h4>{member.name}</h4>
                    <p>STATUS: OVERSEER</p>
                    <p style={{ marginBottom: "1rem" }}>CLEARANCE: LVL OMEGA</p>
                    <div style={{ display: "flex", gap: "1rem" }}>
                      {/* GitHub Link Removed as Requested */}
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            color: "var(--bg-dark)",
                            transition: "transform var(--transition-fast)",
                          }}
                          onMouseOver={(e) =>
                            (e.currentTarget.style.transform = "scale(1.2)")
                          }
                          onMouseOut={(e) =>
                            (e.currentTarget.style.transform = "scale(1)")
                          }
                        >
                          <Linkedin size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION - Fully Functional UI Form */}
        <section id="contact" className="section">
          <div className="section-header">
            <h2 className="section-title">Establish_Link</h2>
            <div className="section-id">0x05</div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              border: "1px solid var(--border-color)",
              background: "var(--bg-panel)",
              padding: "4rem",
              position: "relative",
            }}
          >
            <h3
              style={{
                fontSize: "1.5rem",
                color: "var(--text-main)",
                marginBottom: "1rem",
              }}
            >
              Initialize Communication Protocol
            </h3>
            <p
              style={{
                color: "var(--text-muted)",
                marginBottom: "3rem",
                maxWidth: "600px",
              }}
            >
              Interested in joining the collective, deploying models, or
              proposing a joint operation? Enter your transmission below.
            </p>

            <form
              ref={formRef}
              onSubmit={handleContact}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                maxWidth: "600px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <label
                  style={{
                    color: "var(--accent-purple)",
                    fontSize: "0.85rem",
                    textTransform: "uppercase",
                  }}
                >
                  User_ID [Name]
                </label>
                <input
                  required
                  type="text"
                  name="user_name"
                  style={{
                    background: "var(--bg-dark)",
                    border: "1px solid var(--border-color)",
                    padding: "1rem",
                    color: "var(--text-main)",
                    fontFamily: "var(--font-mono)",
                    outline: "none",
                  }}
                  placeholder="Enter your identity..."
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <label
                  style={{
                    color: "var(--accent-purple)",
                    fontSize: "0.85rem",
                    textTransform: "uppercase",
                  }}
                >
                  Relay_Address [Email]
                </label>
                <input
                  required
                  type="email"
                  name="user_email"
                  style={{
                    background: "var(--bg-dark)",
                    border: "1px solid var(--border-color)",
                    padding: "1rem",
                    color: "var(--text-main)",
                    fontFamily: "var(--font-mono)",
                    outline: "none",
                  }}
                  placeholder="Enter secure channel..."
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <label
                  style={{
                    color: "var(--accent-purple)",
                    fontSize: "0.85rem",
                    textTransform: "uppercase",
                  }}
                >
                  Payload [Message]
                </label>
                <textarea
                  required
                  rows="4"
                  name="message"
                  style={{
                    background: "var(--bg-dark)",
                    border: "1px solid var(--border-color)",
                    padding: "1rem",
                    color: "var(--text-main)",
                    fontFamily: "var(--font-mono)",
                    resize: "vertical",
                    outline: "none",
                  }}
                  placeholder="Type your payload here..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ marginTop: "1rem", alignSelf: "flex-start" }}
                disabled={formStatus !== ""}
              >
                {formStatus === "" ? (
                  <>
                    Transmit Payload <Send size={18} />
                  </>
                ) : formStatus === "TRANSMITTING..." ? (
                  <span style={{ animation: "blink 1s infinite" }}>
                    Transmitting...
                  </span>
                ) : (
                  <span
                    style={{
                      color: "var(--bg-dark)",
                    }}
                  >
                    Payload Delivered
                  </span>
                )}
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  background: "var(--accent-purple)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "4px",
                }}
              >
                <Brain size={20} color="var(--bg-dark)" />
              </div>
              <h2 style={{ margin: 0, fontSize: "2rem" }}>AIRIS</h2>
            </div>
            <p>
              Empowering the next generation to engineer intelligent robust
              systems.
            </p>
          </div>

          <div className="social-links">
            <a
              href="https://www.linkedin.com/company/airis-ai/"
              target="_blank"
              rel="noreferrer"
              className="social-circle"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://www.instagram.com/airis.nstru/"
              target="_blank"
              rel="noreferrer"
              className="social-circle"
            >
              <Instagram size={24} />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>AIRIS_V_0.2 // KINETIC_BUILD</p>
          <p>EOF</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
