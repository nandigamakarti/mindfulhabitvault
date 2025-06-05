import React from 'react';
import { Button } from '@/components/ui/button';
import { GradientButton } from '@/components/ui/gradient-button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { Contact7 } from '@/components/ui/contact-7';
import { Feature } from '@/components/ui/feature-with-image-carousel';
import { Gallery6 } from '@/components/ui/gallery6';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import { Footer } from '@/components/ui/footer-section';
import { HeroGeometric } from '@/components/ui/shape-landing-hero';
import { GradientText } from '@/components/ui/gradient-text';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

const LandingPage: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b py-4">
        <div className="container flex items-center justify-between">
          <div className="font-bold text-2xl"><GradientText>HabitVault</GradientText></div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="h-9 w-9"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <GradientButton asChild>
              <Link to="/login">Log in</Link>
            </GradientButton>
            <GradientButton asChild variant="variant">
              <Link to="/signup">Sign up</Link>
            </GradientButton>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative bg-background text-foreground overflow-hidden">
          <HeroGeometric
            badge="HabitVault"
            title1="Build better habits,"
            title2="one day at a time"
          />
          {/* This content is positioned to appear towards the bottom of the HeroGeometric display */}
          <div className="container mx-auto px-4 md:px-6 text-center relative z-20 pb-16 md:pb-24 lg:pb-32 -mt-32 sm:-mt-40 md:-mt-48 lg:-mt-56 xl:-mt-64">
            {/* Description paragraph removed as per user request */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1, ease: [0.25, 0.4, 0.25, 1] }}
              className="flex flex-wrap justify-center gap-4"
            >
              <GradientButton asChild size="lg">
                <Link to="/signup">Get Started</Link>
              </GradientButton>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <Feature />

        {/* Blog Resources Section */}
        <Gallery6 />

        <TestimonialsSection />

        <Contact7 
          title="Get in Touch"
          description="Have questions about HabitVault? Our team is here to help you succeed on your habit-building journey."
          emailLabel="Email Support"
          emailDescription="We aim to respond to all inquiries within 24 hours."
          email="support@habitvault.com"
          officeLabel="Visit Us"
          officeDescription="Come by our office to meet the team."
          officeAddress="123 Productivity Lane, San Francisco, CA 94105"
          phoneLabel="Phone Support"
          phoneDescription="Available Monday through Friday, 9 AM - 6 PM PST"
          phone="+1 (555) 123-4567"
        />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
