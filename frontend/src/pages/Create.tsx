import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Editor from "@monaco-editor/react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { BACKEND_URL, categories, languages } from "../constants";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState(languages[0].value);
  const [category, setCategory] = useState(categories[0]);
  const [code, setCode] = useState("");
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (code === "") {
      alert("Code cannot be empty. Please write some code before submitting.");
      return;
    }

    if (category === "Web Development") {
      setCategory("Web_Dev");
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/snippet/create`,
        {
          title,
          language,
          category,
          code,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Snippet created successfully!");
        setLoading(false);
        navigate("/home");
      }
    } catch (error) {
      alert("Failed to create snippet. Please try again.");
    }
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
                required
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
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
                  className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
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

              {/* Category Dropdown */}
              <div className="relative">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Category
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                  }
                  className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  {category}
                  <ChevronDown className="h-4 w-4" />
                </button>
                {isCategoryDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 rounded-lg bg-slate-800 border border-slate-700 shadow-lg">
                    {categories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => {
                          setCategory(category);
                          setIsCategoryDropdownOpen(false);
                        }}
                        className="w-full p-3 text-left text-white hover:bg-slate-700 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {category === "Web_Dev"
                          ? "Web Development"
                          : category === "AI_ML"
                          ? "AI/ML"
                          : category}
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
                  language={language}
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  theme="vs-dark"
                  options={{
                    automaticLayout: true,
                    wordWrap: "on",
                    wrappingIndent: "indent",
                    tabSize: 2,
                    fontFamily: "san-serif",
                    lineHeight: 24,
                    fontSize: 20,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    renderLineHighlight: "all",
                    contextmenu: false,
                    mouseWheelZoom: true,
                    quickSuggestions: true,
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
                {loading ? "Creating..." : "Create Snippet"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
