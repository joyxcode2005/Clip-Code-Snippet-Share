import { useEffect, useState } from "react";
import { Code, User, Search, Globe, Terminal, Cpu, Layers } from "lucide-react";
import Editor from "@monaco-editor/react";
import Sidebar from "../components/Sidebar";
import Category from "../components/CatagoryTag";
import Language from "../components/LanguageTag";
import { FaClipboard } from "react-icons/fa";
import axios from "axios";

const tags = ["DSA", "Web_Dev", "DevOps/Linux", "AI/ML", "Others"];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [snippets, setSnippets] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);

  // Fetch snippets
  const fetchSnippets = async () => {
    setLoading(true);
    try {
      const res = await axios(
        `http://127.0.0.1:8787/api/v1/snippet/bulk?page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setLoading(false);
      setSnippets(res.data.data);
      setHasNextPage(res.data.data.length === 10); // assuming 10 per page
    } catch (err) {
      console.error("Error fetching snippets:", err);
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, [page]);

  const getTagIcon = (tag: string) => {
    switch (tag) {
      case "DSA":
        return <Code className="w-4 h-4 mr-2" />;
      case "Web_Dev":
        return <Globe className="w-4 h-4 mr-2" />;
      case "DevOps/Linux":
        return <Terminal className="w-4 h-4 mr-2" />;
      case "AI/ML":
        return <Cpu className="w-4 h-4 mr-2" />;
      default:
        return <Layers className="w-4 h-4 mr-2" />;
    }
  };

  const handleCopyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      alert("Code copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy code:", error);
      alert("Failed to copy code. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-bl from-slate-950 to-slate-800 text-white">
      <div className="fixed w-64 h-screen bg-slate-900 text-white flex flex-col">
        <Sidebar />
      </div>

      <div className="flex-1 ml-64 p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search snippets..."
                className="w-full p-3 pl-10 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? "" : tag)}
                  className={`flex items-center px-4 py-2 rounded-full border transition-all duration-200 ${
                    tag === selectedTag
                      ? "bg-cyan-600 text-white border-cyan-600 shadow-lg shadow-cyan-500/20"
                      : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
                  }`}
                >
                  {getTagIcon(tag)}
                  <span>{tag}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Snippet Grid */}
          {loading ? (
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-lg">Loading snippets...</div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {snippets.map((snippet: any) => (
                <div
                  key={snippet.id}
                  className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden"
                >
                  <div className="px-4 py-2">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-lg font-serif text-white uppercase">
                        {snippet.title}
                      </h3>
                      <button
                        onClick={() => handleCopyToClipboard(snippet.code)}
                        className="text-blue-300/50 cursor-pointer hover:bg-blue-400/10 rounded-full p-2 flex items-center justify-center"
                      >
                        <FaClipboard className="h-5 w-5 text-blue-600" />
                      </button>
                    </div>
                    <div className="h-[200px] rounded overflow-hidden">
                      <Editor
                        height="200px"
                        defaultLanguage={snippet.language}
                        defaultValue={snippet.code}
                        theme="vs-dark"
                        options={{
                          wordWrap: "on",
                          minimap: { enabled: false },
                          fontSize: 16,
                          readOnly: true,
                          scrollBeyondLastLine: true,
                          lineNumbers: "on",
                          renderLineHighlight: "none",
                          folding: false,
                          contextmenu: false,
                          scrollbar: {
                            vertical: "hidden",
                            horizontal: "hidden",
                          },
                        }}
                      />
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-yellow-300/50" />
                          <span className="text-sm text-green-500/60 font-semibold">
                            {snippet.author}
                          </span>
                        </div>
                        <span className="text-sm text-slate-400">-</span>
                        <span className="text-sm text-blue-500/60">
                          {snippet.createdAt?.split("T")[0]}
                        </span>
                      </div>
                      <div className="ml-auto flex items-center gap-2 space-x-2 cursor-pointer">
                        <Category text={snippet.category} />
                        <Language text={snippet.language} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-600 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-white">Page {page}</span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={!hasNextPage}
              className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-600 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
