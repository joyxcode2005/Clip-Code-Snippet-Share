import React, { useState } from "react";
import {
  Code,
  Home as HomeIcon,
  Plus,
  FileCode,
  Heart,
  Settings,
  User,
  Search,
  Sparkles,
  Globe,
  Terminal,
  Cpu,
  Layers,
} from "lucide-react";
import Editor from "@monaco-editor/react";
import Sidebar from "../components/Sidebar";

const tags = ["DSA", "Web Development", "DevOps/Linux", "AI/ML", "Others"];

// Sample snippets data
const sampleSnippets = [
  {
    id: 1,
    title: "React useEffect Hook",
    code: `useEffect(() => {
  // Effect code here
  return () => {
    // Cleanup code
  };
}, [dependencies]);`,
    language: "javascript",
    author: "John Doe",
    createdAt: "2024-03-15T10:30:00",
    tag: "Web Development",
  },
  {
    id: 2,
    title: "Python Quick Sort",
    code: `def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)`,
    language: "python",
    author: "Jane Smith",
    createdAt: "2024-03-14T15:45:00",
    tag: "DSA",
  },
  {
    id: 2,
    title: "Python Quick Sort",
    code: `def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)`,
    language: "python",
    author: "Jane Smith",
    createdAt: "2024-03-14T15:45:00",
    tag: "DSA",
  },
  {
    id: 2,
    title: "Python Quick Sort",
    code: `def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)`,
    language: "python",
    author: "Jane Smith",
    createdAt: "2024-03-14T15:45:00",
    tag: "DSA",
  },
  {
    id: 2,
    title: "Python Quick Sort",
    code: `def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)`,
    language: "python",
    author: "Jane Smith",
    createdAt: "2024-03-14T15:45:00",
    tag: "DSA",
  },
  {
    id: 2,
    title: "Python Quick Sort",
    code: `def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)`,
    language: "python",
    author: "Jane Smith",
    createdAt: "2024-03-14T15:45:00",
    tag: "DSA",
  },
  {
    id: 2,
    title: "Python Quick Sort",
    code: `def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)`,
    language: "python",
    author: "Jane Smith",
    createdAt: "2024-03-14T15:45:00",
    tag: "DSA",
  },
];

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  // Map tag names to their corresponding icons
  const getTagIcon = (tag: string) => {
    switch (tag) {
      case "DSA":
        return <Code className="w-4 h-4 mr-2" />;
      case "Web Development":
        return <Globe className="w-4 h-4 mr-2" />;
      case "DevOps/Linux":
        return <Terminal className="w-4 h-4 mr-2" />;
      case "AI/ML":
        return <Cpu className="w-4 h-4 mr-2" />;
      default:
        return <Layers className="w-4 h-4 mr-2" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Fixed Sidebar */}
      <div className="fixed w-64 h-screen bg-slate-900 text-white flex flex-col">
        <Sidebar />
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 ml-64 p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
              Explore Snippets
              <Sparkles className="ml-2 w-5 h-5 text-cyan-400" />
            </h1>
            <p className="text-slate-400">
              Find and organize your code snippets by tags and search terms
            </p>
          </header>

          {/* Search Bar */}
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
                className="w-full p-3 pl-10 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 
                         focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent
                         transition-all duration-200"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-white mb-3">
              Filter by category
            </h2>
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

          {/* Snippets Grid */}
          <div className="grid grid-cols-2 gap-6">
            {sampleSnippets.map((snippet) => (
              <div
                key={snippet.id}
                className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden"
              >
                <div className="p-4">
                  <h3 className="text-lg font-medium text-white mb-2">
                    {snippet.title}
                  </h3>
                  <div className="h-[200px] rounded overflow-hidden">
                    <Editor
                      height="200px"
                      defaultLanguage={snippet.language}
                      defaultValue={snippet.code}
                      theme="vs-dark"
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        readOnly: true,
                        scrollBeyondLastLine: false,
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
                    <div className="flex items-center space-x-2">
                      <div className="bg-slate-700 rounded-full p-1">
                        <User className="h-4 w-4 text-slate-300" />
                      </div>
                      <span className="text-sm text-slate-400">
                        {snippet.author}
                      </span>
                    </div>
                    <span className="text-sm text-slate-500">
                      {formatDate(snippet.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
