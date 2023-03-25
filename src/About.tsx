const About = (): JSX.Element => {
  return (
    <div className="flex flex-col min-h-screen pb-8 bg-blue-400">
      <div className="content-center mx-auto my-12">
        <div className="rounded-lg bg-blue-100">
          <h1 className="text-center px-16 py-12 text-4xl">
            About the Website
          </h1>
        </div>
      </div>
      <article className="w-5/6 lg:w-2/3 indent-6 mx-auto my-4 mb-0 text-left rounded-lg px-5 py-10 bg-blue-100 [&>*]:mb-4">
        <p>
          This project was created over the span of a week. It started when I
          was frustrated with other Chess repertoire trainers online. I just
          wished I could simply copy and paste a PGN in and begin practicing
          every line I could face of an opening. So I created it...
        </p>
        <p>
          To use go to the <strong>Builder</strong> section. Create a new
          opening. Name the opening, paste in a thumbnail FEN, paste in a PGN
          with multiple sidelines, and choose what side you want to practice
          for. I recommend generating the PGN opening by either finding a
          Lichess study with all the variations of the opening in one chapter or
          going through an opening explorer and copying the resulting PGN in.
          Have one response to every possible opponent move to ensure their
          won't be conflicting answers in practice mode.
        </p>
        <p>
          After creating an opening go to the <strong>Train</strong> section to
          practice on the openings you've created. Click on the opening you
          created and practice! If you every get stuck on a move put thought
          into what you'd do in that situation and why? If a wrong move is
          inputted the board will show the correct move. Don't worry there's
          always oppurtunity to learn!
        </p>
      </article>
    </div>
  );
};

export default About;
