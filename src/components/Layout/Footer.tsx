import { Github, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-auto border-t bg-background/95 backdrop-blur-sm border-border/50 sticky top-[100vh]">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-3">
            <h3 className="font-bold text-lg text-foreground">ResumeForge</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Create professional, ATS-friendly resumes in minutes. Built with modern web technologies.
            </p>
            <div className="text-sm text-primary font-medium">
              Your Career, Forged to Perfection.
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <div className="space-y-2">
              <a 
                href="#templates" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 transform"
              >
                Resume Templates
              </a>
              <a 
                href="#tips" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 transform"
              >
                Resume Tips
              </a>
              <a 
                href="#faq" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 transform"
              >
                FAQ
              </a>
            </div>
          </div>

          {/* Social & Legal */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Connect</h4>
            <div className="flex space-x-3">
              <a 
                href="https://github.com/darshanchaudharii" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="https://www.linkedin.com/in/darshan-chaudhari-81600118b/" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
            <div className="flex flex-col space-y-1 text-xs text-muted-foreground">
              <a href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-6 pt-4">
          <p className="text-center text-xs text-muted-foreground">
            © {currentYear} ResumeForge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}