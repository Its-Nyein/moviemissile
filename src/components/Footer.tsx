const Footer = () => {
  return (
    <footer className="bg-muted py-5 mt-auto">
      <div className="container mx-auto max-w-7xl text-center text-muted-foreground">
        The movie data are provided by{" "}
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground font-semibold transition-colors"
        >
          The Movie DB
        </a>
      </div>
    </footer>
  );
};

export default Footer;
