import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/HomePage/Header";
import Footer from "../components/HomePage/Footer";
import resume_builder from "../assets/images/resume_builder.jpeg";
import vdo from "../assets/videos/vdo.mp4";
import { useAppContext } from "../context/AppContext";
import { useNavigate, Link } from "react-router-dom";
import { ToastNotification } from "../components/ToastNotification";

// Enhanced animations
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "backOut",
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const Home = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();

  const features = [
    {
      title: "AI-Powered Analysis",
      description:
        "Get instant feedback on your resume's strengths and weaknesses.",
      icon: "🔍",
    },
    {
      title: "ATS Optimization",
      description:
        "Ensure your resume passes through Applicant Tracking Systems.",
      icon: "🤖",
    },
    {
      title: "Custom Templates",
      description: "Professionally designed templates for any industry.",
      icon: "🎨",
    },
    {
      title: "LinkedIn Integration",
      description: "Sync your LinkedIn profile for optimization.",
      icon: "🔗",
    },
  ];

  const testimonials = [
    {
      quote:
        "This platform helped me land 3 interviews in just 2 weeks after optimizing my resume!",
      author: "Sarah K., Marketing Professional",
    },
    {
      quote:
        "The ATS optimization feature was a game-changer. I started getting callbacks immediately.",
      author: "James L., Software Engineer",
    },
    {
      quote:
        "Best investment in my career. The LinkedIn optimization alone was worth it.",
      author: "Priya M., Financial Analyst",
    },
  ];

  const steps = [
    {
      title: "Upload Your Resume",
      description: "Start by uploading your current resume.",
    },
    {
      title: "Get Instant Feedback",
      description: "AI analyzes your resume within seconds.",
    },
    {
      title: "Optimize & Improve",
      description: "Enhance your resume's effectiveness.",
    },
    {
      title: "Download & Apply",
      description: "Start applying with confidence.",
    },
  ];

  return (
    <div className="bg-gradient-to-l from-gray-950 to-gray-800 min-h-screen text-white font-sans px-2 sm:px-20">
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 md:py-24 lg:py-32 flex flex-col lg:flex-row items-center gap-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="lg:w-1/2 text-center lg:text-left"
        >
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight"
          >
            Improve your resume &{" "}
            <span className="text-blue-400">LinkedIn</span> profile
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-lg md:text-xl mb-8"
          >
            AI-powered platform for tailored feedback on your resume and
            profile.
          </motion.p>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Link
              to={user ? "/home" : "/signup"}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg transition-all shadow-lg hover:shadow-xl text-lg font-medium"
            >
              Get Started Free
            </Link>
            <button
              onClick={() => navigate("/preview")}
              className="border-2 border-blue-500 hover:bg-blue-500 text-white px-8 py-4 rounded-lg transition-all hover:shadow-xl text-lg font-medium"
            >
              See Preview
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={scaleUp}
          className="lg:w-1/2 w-full mt-12 lg:mt-0"
        >
          <img
            className="w-full rounded-xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-500"
            src={resume_builder}
            alt="Resume Improvement"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 ">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Everything you need to create a standout resume
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ y: -10 }}
                className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-blue-500/20 transition-all"
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    transition: {
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    },
                  }}
                  className="text-5xl mb-6"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Get from blank page to job-ready resume in minutes
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 p-8 rounded-xl shadow-lg relative overflow-hidden group"
              >
                <div className="absolute -top-4 -left-4 text-8xl font-bold text-blue-500 opacity-10 group-hover:opacity-20 transition-all">
                  {index + 1}
                </div>
                <div className="text-blue-500 text-3xl font-bold mb-4">
                  {index + 1}.
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 ">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              See It In Action
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Watch our platform transform your resume
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scaleUp}
            className="flex justify-center"
          >
            <div className="w-full max-w-4xl bg-gray-800 p-2 rounded-xl shadow-2xl overflow-hidden">
              <video
                className="w-full rounded-lg transform hover:scale-[1.01] transition-transform duration-500"
                controls
                src={vdo}
                loop
                muted
                playsInline
                poster={resume_builder}
              >
                Your browser doesn't support videos
              </video>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-800">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="container mx-auto px-6 text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8"
          >
            Ready to Transform Your Resume?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="text-blue-100 text-xl mb-12 max-w-3xl mx-auto"
          >
            Join thousands of professionals who've accelerated their careers
            with our platform
          </motion.p>
          <motion.div variants={fadeUp} transition={{ delay: 0.4 }}>
            <Link
              to={user ? "/home" : "/signup"}
              className="inline-block bg-white text-blue-600 px-10 py-4 rounded-lg font-semibold hover:bg-gray-100 shadow-xl hover:shadow-2xl text-lg transition-all"
            >
              Start Your Free Trial
            </Link>
          </motion.div>
        </motion.div>
      </section>
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -150px 0px" }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-bold text-center mb-4"
            >
              Success Stories
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-center text-gray-300 text-lg mb-12 max-w-3xl mx-auto"
            >
              Join thousands of professionals who've transformed their careers
            </motion.p>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700"
                >
                  <p className="text-lg italic text-gray-300 mb-4">
                    "{testimonial.quote}"
                  </p>
                  <p className="text-sm font-semibold text-gray-400">
                    — {testimonial.author}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ToastNotification />
    </div>
  );
};

export default Home;
