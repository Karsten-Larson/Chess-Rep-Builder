const Footer = (): JSX.Element => {
  return (
    <div className="pt-4 bg-blue-400">
      <div className="flex flex-col py-3 bg-blue-200 text-center">
        <button
          className="m-auto p-3 hover:underline"
          onClick={() => {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
          }}
        >
          Back to Top
        </button>
      </div>
    </div>
  );
};

export default Footer;
