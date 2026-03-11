import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Award,
  Building2,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  HardHat,
  Home,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Phone,
  Shield,
  Star,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { AnimatePresence, type Variants, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const queryClient = new QueryClient();

function BuildCoApp() {
  const { actor } = useActor();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) {
      toast.error("Connection error. Please try again.");
      return;
    }
    setSubmitStatus("loading");
    try {
      await actor.submitForm(
        formState.name,
        formState.email,
        formState.message,
      );
      setSubmitStatus("success");
      setFormState({ name: "", email: "", message: "" });
      toast.success("Message sent! We'll be in touch soon.");
    } catch {
      setSubmitStatus("error");
      toast.error("Failed to send. Please try again.");
    }
  };

  const services = [
    {
      icon: Home,
      title: "Residential Construction",
      desc: "Custom homes built to your exact vision. From foundations to finishing touches, we deliver quality craftsmanship that lasts generations.",
    },
    {
      icon: Building2,
      title: "Commercial Buildings",
      desc: "Scalable commercial projects from office complexes to retail centers. On time, on budget, built to code.",
    },
    {
      icon: Wrench,
      title: "Renovations & Remodeling",
      desc: "Transform your existing space with expert renovation services. We preserve what matters and modernize what counts.",
    },
    {
      icon: ClipboardList,
      title: "Project Management",
      desc: "End-to-end project oversight with transparent reporting, schedule control, and proactive problem solving.",
    },
  ];

  const stats = [
    { value: "350+", label: "Projects Completed" },
    { value: "28", label: "Years in Business" },
    { value: "120+", label: "Team Members" },
    { value: "98%", label: "Client Satisfaction" },
  ];

  const projects = [
    {
      title: "Oakwood Residence",
      category: "Residential",
      location: "Austin, TX",
      img: "/assets/generated/project-residential.dim_600x400.jpg",
    },
    {
      title: "Vertex Tower",
      category: "Commercial",
      location: "Dallas, TX",
      img: "/assets/generated/project-commercial.dim_600x400.jpg",
    },
    {
      title: "The Meridian Kitchen",
      category: "Renovation",
      location: "Houston, TX",
      img: "/assets/generated/project-renovation.dim_600x400.jpg",
    },
    {
      title: "Ironridge Logistics Hub",
      category: "Industrial",
      location: "San Antonio, TX",
      img: "/assets/generated/project-industrial.dim_600x400.jpg",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Homeowner",
      quote:
        "BuildCo turned our dream home into reality. The attention to detail was extraordinary — every corner of the house exceeded our expectations. The team was professional, communicative, and genuinely cared about quality.",
      rating: 5,
    },
    {
      name: "James Okafor",
      role: "CEO, Vertex Realty Group",
      quote:
        "We've worked with many contractors over the years, but BuildCo stands apart. They delivered our 12-story commercial project two weeks ahead of schedule and under budget. Remarkable execution.",
      rating: 5,
    },
    {
      name: "Linda Reyes",
      role: "Restaurant Owner",
      quote:
        "The renovation of our flagship location was seamless. BuildCo minimized our downtime to just 3 weeks and the result is stunning. Our customers notice the difference every single day.",
      rating: 5,
    },
  ];

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ===== NAVBAR ===== */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2.5 group"
            data-ocid="nav.link"
          >
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
              <HardHat className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">
              Build<span className="text-primary">Co</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-ocid="nav.link"
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-sm hover:bg-secondary"
              >
                {link.label}
              </a>
            ))}
            <Button
              onClick={scrollToContact}
              size="sm"
              className="ml-4 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
              data-ocid="nav.primary_button"
            >
              Get a Quote
            </Button>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-sm hover:bg-secondary transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            type="button"
            data-ocid="nav.toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-background/98 backdrop-blur-md border-b border-border overflow-hidden"
            >
              <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    data-ocid="nav.link"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-sm transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <Button
                  onClick={scrollToContact}
                  className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                  data-ocid="nav.primary_button"
                >
                  Get a Free Quote
                </Button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ===== HERO ===== */}
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-construction.dim_1200x600.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/92 via-background/70 to-background/30" />
        <div className="absolute inset-0 grid-texture opacity-40" />

        <div className="relative container mx-auto px-4 pt-24 pb-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-2xl"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-12 bg-primary" />
              <span className="text-primary font-semibold text-sm tracking-widest uppercase">
                Texas' Premier Builder
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-6"
            >
              Building
              <span className="block text-gradient-amber">Tomorrow's</span>
              Landmarks
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg"
            >
              From custom residences to commercial towers, BuildCo delivers
              exceptional construction with unmatched precision, transparency,
              and craftsmanship since 1996.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                onClick={scrollToContact}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base px-8 py-6 shadow-amber"
                data-ocid="hero.primary_button"
              >
                Get a Free Quote
                <ChevronRight className="ml-1 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-border text-foreground hover:bg-secondary font-semibold text-base px-8 py-6"
                data-ocid="hero.secondary_button"
              >
                <a href="#projects">View Our Work</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-border/50 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                  className="py-5 px-4 text-center border-r border-border/40 last:border-r-0"
                >
                  <div className="font-display font-black text-2xl text-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" className="py-28 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-12 bg-primary" />
                <span className="text-primary font-semibold text-sm tracking-widest uppercase">
                  What We Do
                </span>
                <div className="h-px w-12 bg-primary" />
              </div>
              <h2 className="font-display font-black text-4xl sm:text-5xl tracking-tight">
                Our Services
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                Comprehensive construction solutions tailored to every scale and
                complexity.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {services.map((svc) => (
                <motion.div key={svc.title} variants={itemVariants}>
                  <Card className="h-full bg-card border-border hover:border-primary/40 transition-all duration-300 group cursor-default hover:shadow-[0_0_24px_oklch(0.75_0.16_65_/_0.12)]">
                    <CardContent className="p-7">
                      <div className="w-12 h-12 bg-primary/10 rounded-sm flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                        <svc.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-display font-bold text-lg mb-3">
                        {svc.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {svc.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section
        id="about"
        className="py-28 bg-secondary/30 relative overflow-hidden"
      >
        <div className="absolute inset-0 grid-texture opacity-20" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={containerVariants}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Left: Text */}
            <div>
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3 mb-4"
              >
                <div className="h-px w-12 bg-primary" />
                <span className="text-primary font-semibold text-sm tracking-widest uppercase">
                  Our Story
                </span>
              </motion.div>
              <motion.h2
                variants={itemVariants}
                className="font-display font-black text-4xl sm:text-5xl tracking-tight mb-6"
              >
                Built on Trust,
                <span className="block text-gradient-amber">
                  Delivered with Pride
                </span>
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-muted-foreground leading-relaxed mb-4"
              >
                Founded in 1996 by Marcus &amp; Elena Brooks, BuildCo started as
                a two-person residential framing crew in Austin. Today we're a
                full-service construction firm with over 120 skilled
                professionals delivering landmark projects across Texas.
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="text-muted-foreground leading-relaxed mb-8"
              >
                Every project we take on is a promise — to the client, to the
                community, and to the craft itself. We don't cut corners. We
                don't miss deadlines. We build things that last.
              </motion.p>

              {/* Values */}
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-3 gap-4"
              >
                {[
                  {
                    icon: Award,
                    label: "Quality",
                    desc: "Best materials, master craftsmen",
                  },
                  {
                    icon: Shield,
                    label: "Safety",
                    desc: "Zero-incident site culture",
                  },
                  {
                    icon: CheckCircle2,
                    label: "Integrity",
                    desc: "Transparent from day one",
                  },
                ].map((val) => (
                  <motion.div
                    key={val.label}
                    variants={itemVariants}
                    className="text-center p-4 rounded-sm bg-card border border-border"
                  >
                    <val.icon className="w-7 h-7 text-primary mx-auto mb-2" />
                    <div className="font-display font-bold text-sm">
                      {val.label}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {val.desc}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right: Large stat display */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-5"
            >
              {[
                {
                  value: "350+",
                  label: "Projects Completed",
                  sub: "Residential & Commercial",
                },
                {
                  value: "28",
                  label: "Years of Experience",
                  sub: "Est. 1996 in Austin, TX",
                },
                {
                  value: "120+",
                  label: "Skilled Professionals",
                  sub: "Carpenters to engineers",
                },
                {
                  value: "98%",
                  label: "Client Satisfaction",
                  sub: "Verified post-project surveys",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-card border border-border rounded-sm p-6 hover:border-primary/30 transition-colors"
                >
                  <div className="font-display font-black text-4xl text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="font-semibold text-sm mb-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {stat.sub}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <section id="projects" className="py-28 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-12 bg-primary" />
                <span className="text-primary font-semibold text-sm tracking-widest uppercase">
                  Portfolio
                </span>
                <div className="h-px w-12 bg-primary" />
              </div>
              <h2 className="font-display font-black text-4xl sm:text-5xl tracking-tight">
                Featured Projects
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                A selection of our most celebrated builds across Texas.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              {projects.map((proj, i) => (
                <motion.div
                  key={proj.title}
                  variants={itemVariants}
                  data-ocid={`projects.item.${i + 1}`}
                  className="group relative overflow-hidden rounded-sm border border-border hover:border-primary/40 transition-all duration-300"
                >
                  <div className="aspect-[3/2] overflow-hidden">
                    <img
                      src={proj.img}
                      alt={proj.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-sm">
                        {proj.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {proj.location}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-xl text-foreground">
                      {proj.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-28 bg-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0 grid-texture opacity-20" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-12 bg-primary" />
                <span className="text-primary font-semibold text-sm tracking-widest uppercase">
                  Testimonials
                </span>
                <div className="h-px w-12 bg-primary" />
              </div>
              <h2 className="font-display font-black text-4xl sm:text-5xl tracking-tight">
                What Clients Say
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  variants={itemVariants}
                  data-ocid={`testimonials.item.${i + 1}`}
                >
                  <Card className="h-full bg-card border-border hover:border-primary/30 transition-all duration-300">
                    <CardContent className="p-7 flex flex-col h-full">
                      <div className="flex gap-0.5 mb-5">
                        {Array.from({ length: t.rating }, (__, idx) => (
                          <Star
                            key={`${t.name}-star-${idx}`}
                            className="w-4 h-4 fill-primary text-primary"
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground leading-relaxed text-sm flex-1 mb-6">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{t.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {t.role}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section
        id="contact"
        ref={contactRef as React.RefObject<HTMLElement>}
        className="py-28 bg-background"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={containerVariants}
            className="grid lg:grid-cols-2 gap-16 items-start"
          >
            {/* Left: Info */}
            <div>
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3 mb-4"
              >
                <div className="h-px w-12 bg-primary" />
                <span className="text-primary font-semibold text-sm tracking-widest uppercase">
                  Contact Us
                </span>
              </motion.div>
              <motion.h2
                variants={itemVariants}
                className="font-display font-black text-4xl sm:text-5xl tracking-tight mb-6"
              >
                Start Your
                <span className="block text-gradient-amber">Next Project</span>
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-muted-foreground leading-relaxed mb-10"
              >
                Ready to build something extraordinary? Fill out the form and a
                BuildCo project consultant will reach out within one business
                day.
              </motion.p>

              <motion.div variants={containerVariants} className="space-y-5">
                {[
                  { icon: Phone, label: "Phone", value: "(512) 555-0142" },
                  { icon: Mail, label: "Email", value: "hello@buildco.com" },
                  {
                    icon: MapPin,
                    label: "Office",
                    value: "2800 S Lamar Blvd, Austin, TX 78704",
                  },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    variants={itemVariants}
                    className="flex items-center gap-4"
                  >
                    <div className="w-11 h-11 bg-primary/10 rounded-sm flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-medium mb-0.5">
                        {item.label}
                      </div>
                      <div className="font-medium text-sm">{item.value}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right: Form */}
            <motion.div variants={itemVariants}>
              <Card className="bg-card border-border">
                <CardContent className="p-8">
                  <AnimatePresence mode="wait">
                    {submitStatus === "success" ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8"
                        data-ocid="contact.success_state"
                      >
                        <div className="w-16 h-16 bg-primary/10 rounded-sm flex items-center justify-center mx-auto mb-5">
                          <CheckCircle2 className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="font-display font-bold text-2xl mb-3">
                          Message Received!
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          Thank you for reaching out. A BuildCo consultant will
                          contact you within one business day.
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => setSubmitStatus("idle")}
                          className="border-primary text-primary hover:bg-primary/10"
                        >
                          Send Another Message
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        onSubmit={handleSubmit}
                        className="space-y-5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className="space-y-2">
                          <Label htmlFor="name" className="font-medium text-sm">
                            Full Name
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            autoComplete="name"
                            required
                            placeholder="John Anderson"
                            value={formState.name}
                            onChange={(e) =>
                              setFormState((p) => ({
                                ...p,
                                name: e.target.value,
                              }))
                            }
                            className="bg-background border-border focus:border-primary"
                            data-ocid="contact.input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="email"
                            className="font-medium text-sm"
                          >
                            Email Address
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            placeholder="john@company.com"
                            value={formState.email}
                            onChange={(e) =>
                              setFormState((p) => ({
                                ...p,
                                email: e.target.value,
                              }))
                            }
                            className="bg-background border-border focus:border-primary"
                            data-ocid="contact.input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="message"
                            className="font-medium text-sm"
                          >
                            Project Details
                          </Label>
                          <Textarea
                            id="message"
                            name="message"
                            required
                            placeholder="Tell us about your project — scope, timeline, location..."
                            rows={5}
                            value={formState.message}
                            onChange={(e) =>
                              setFormState((p) => ({
                                ...p,
                                message: e.target.value,
                              }))
                            }
                            className="bg-background border-border focus:border-primary resize-none"
                            data-ocid="contact.textarea"
                          />
                        </div>

                        {submitStatus === "error" && (
                          <p
                            className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-sm"
                            data-ocid="contact.error_state"
                          >
                            Failed to send your message. Please try again or
                            call us directly.
                          </p>
                        )}

                        <Button
                          type="submit"
                          disabled={submitStatus === "loading"}
                          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-6 text-base"
                          data-ocid="contact.submit_button"
                        >
                          {submitStatus === "loading" ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <ChevronRight className="ml-2 w-5 h-5" />
                            </>
                          )}
                        </Button>
                        {submitStatus === "loading" && (
                          <div
                            data-ocid="contact.loading_state"
                            className="sr-only"
                            aria-live="polite"
                          >
                            Sending your message...
                          </div>
                        )}
                      </motion.form>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-secondary/50 border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                  <HardHat className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-display font-bold text-xl tracking-tight">
                  Build<span className="text-primary">Co</span>
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                Texas' premier construction company. Building exceptional
                residential, commercial, and industrial structures since 1996.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-bold text-sm mb-4 uppercase tracking-wider">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      data-ocid="footer.link"
                      className="text-muted-foreground hover:text-primary text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display font-bold text-sm mb-4 uppercase tracking-wider">
                Contact
              </h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li>(512) 555-0142</li>
                <li>hello@buildco.com</li>
                <li className="leading-relaxed">
                  2800 S Lamar Blvd
                  <br />
                  Austin, TX 78704
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <span>
              &copy; {new Date().getFullYear()} BuildCo Construction. All rights
              reserved.
            </span>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Built with ♥ using caffeine.ai
            </a>
          </div>
        </div>
      </footer>

      <Toaster richColors />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BuildCoApp />
    </QueryClientProvider>
  );
}
