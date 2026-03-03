const Footer = () => {
  return (
    <footer className="py-8 border-t border-border bg-background">
      <div className="container mx-auto px-4 max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-semibold text-foreground">PDF Answer Sheet Analyzer</p>
        <p className="text-sm text-muted-foreground">Built with Next.js + AI</p>
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
