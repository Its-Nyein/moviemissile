const Footer = () => {
  return (
    <footer className="bg-gray-200 py-5">
      <div className="container mx-auto max-w-7xl text-center">
        The movie data are provided by{" "}
        <a
          href="https://www.themoviedb.org/"
          className="hover:text-[#0d6efd] font-bold"
        >
          The Movie DB
        </a>
      </div>
    </footer>
  );
};

export default Footer;
