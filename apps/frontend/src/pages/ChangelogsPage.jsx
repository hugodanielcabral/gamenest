import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export const ChangelogsPage = () => {
  const [updateText, setUpdateText] = useState("");

  useEffect(() => {
    fetch("src/changelogs/update-pre-alpha-1.mkd").then((response) => {
      response.text().then((text) => {
        setUpdateText(text);
      });
    });
  }, []);

  return (
    <article className="relative w-full px-6 py-12 bg-base-200 shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5 md:max-w-3xl md:mx-auto lg:max-w-4xl lg:pt-16 lg:pb-28 my-5">
      <div
        className="
     mt-8 prose prose-slate mx-auto lg:prose-lg"
      >
        <ReactMarkdown>{updateText}</ReactMarkdown>
      </div>
    </article>
  );
};
