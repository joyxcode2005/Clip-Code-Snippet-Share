import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Editor from "@monaco-editor/react";
import Sidebar from "../components/Sidebar";

const languages = [
  { name: "JavaScript", value: "javascript" },
  { name: "TypeScript", value: "typescript" },
  { name: "Python", value: "python" },
  { name: "HTML", value: "html" },
  { name: "CSS", value: "css" },
  { name: "JSON", value: "json" },
  { name: "SQL", value: "sql" },
  { name: "Markdown", value: "markdown" },
];

const tags = ["DSA", "Web Development", "DevOps/Linux", "AI/ML", "Others"];

const Create = () => {
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState(languages[0].value);
  const [selectedTag, setSelectedTag] = useState(tags[0]);
  const [code, setCode] = useState("// Write your code here");
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log({ title, language, selectedTag, code });
  };

  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Fixed Sidebar */}
      <div className="fixed w-64 h-screen bg-slate-900 text-white flex flex-col">
        <Sidebar />
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 ml-64 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">
            Create New Snippet
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white 
                         focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Enter snippet title"
              />
            </div>

            {/* Language and Tag Selection */}
            <div className="grid grid-cols-2 gap-6">
              {/* Language Dropdown */}
              <div className="relative">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Language
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
                  }
                  className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white 
                           flex items-center justify-between
                           focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  {languages.find((lang) => lang.value === language)?.name}
                  <ChevronDown className="h-4 w-4" />
                </button>
                {isLanguageDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 rounded-lg bg-slate-800 border border-slate-700 shadow-lg">
                    {languages.map((lang) => (
                      <button
                        key={lang.value}
                        type="button"
                        onClick={() => {
                          setLanguage(lang.value);
                          setIsLanguageDropdownOpen(false);
                        }}
                        className="w-full p-3 text-left text-white hover:bg-slate-700 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Tag Dropdown */}
              <div className="relative">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Tag
                </label>
                <button
                  type="button"
                  onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
                  className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white 
                           flex items-center justify-between
                           focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  {selectedTag}
                  <ChevronDown className="h-4 w-4" />
                </button>
                {isTagDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 rounded-lg bg-slate-800 border border-slate-700 shadow-lg">
                    {tags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          setSelectedTag(tag);
                          setIsTagDropdownOpen(false);
                        }}
                        className="w-full p-3 text-left text-white hover:bg-slate-700 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Code Editor */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Code
              </label>
              <div className="rounded-lg overflow-hidden border border-slate-700">
                <Editor
                  height="400px"
                  defaultLanguage={language}
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  theme="vs-dark"
                  options={{
                    selectOnLineNumbers: true,
                    automaticLayout: true,
                    wordWrap: "on",
                    wrappingIndent: "indent",
                    tabSize: 2,
                    useTabStops: true,
                    fontFamily: "Fira Code, monospace",
                    fontLigatures: true,
                    lineHeight: 24,
                    fontSize: 14,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    lineNumbers: "on",
                    renderLineHighlight: "all",
                    contextmenu: false,
                    mouseWheelZoom: true,
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 
                          transition-colors duration-200 font-medium cursor-pointer"
              >
                Create Snippet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
