import { useState } from "react";
import { Code, User, Search, Globe, Terminal, Cpu, Layers } from "lucide-react";
import Editor from "@monaco-editor/react";
import Sidebar from "../components/Sidebar";
import Category from "../components/CatagoryTag";
import Language from "../components/LanguageTag";
import { FaClipboard } from "react-icons/fa";

const tags = ["DSA", "Web Dev", "DevOps/Linux", "AI/ML", "Others"];

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
    category: "Web Dev",
    author: "John Doe",
    createdAt: "2024-03-15T10:30:00",
    tag: "Web Dev",
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
    category: "DSA",
    author: "Jane Smith",
    createdAt: "2024-03-14T15:45:00",
    tag: "DSA",
  },
  {
    id: 3,
    title: "Bash: Check if File Exists",
    code: `if [ -f "./myfile.txt" ]; then
  echo "File exists."
else
  echo "File does not exist."
fi`,
    language: "bash",
    category: "DevOps/Linux",
    author: "Alice Kumar",
    createdAt: "2024-03-16T09:20:00",
    tag: "Linux",
  },
  {
    id: 4,
    title: "Node.js HTTP Server",
    code: `const http = require('http');
http.createServer((req, res) => {
  res.write('Hello World!');
  res.end();
}).listen(3000);`,
    language: "javascript",
    category: "Web Dev",
    author: "Rahul Mehta",
    createdAt: "2024-03-17T14:10:00",
    tag: "Web Dev",
  },
  {
    id: 5,
    title: "Linear Search in C++",
    code: `int linearSearch(int arr[], int n, int key) {
  for(int i = 0; i < n; i++) {
    if(arr[i] == key)
      return i;
  }
  return -1;
}`,
    language: "cpp",
    category: "DSA",
    author: "Sneha Roy",
    createdAt: "2024-03-18T11:00:00",
    tag: "DSA",
  },
  {
    id: 6,
    title: "Train/Test Split with Scikit-learn",
    code: `from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)`,
    language: "python",
    category: "AI/ML",
    author: "Arjun Patel",
    createdAt: "2024-03-19T08:30:00",
    tag: "ML",
  },
  {
    id: 7,
    title: "Dockerfile for Node App",
    code: `FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]`,
    language: "dockerfile",
    category: "DevOps/Linux",
    author: "Priya Sen",
    createdAt: "2024-03-20T16:45:00",
    tag: "Docker",
  },
  {
    id: 8,
    title: "Java Binary Search",
    code: `int binarySearch(int[] arr, int key) {
  int left = 0, right = arr.length - 1;
  while (left <= right) {
    int mid = (left + right) / 2;
    if (arr[mid] == key) return mid;
    else if (arr[mid] < key) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    language: "java",
    category: "DSA",
    author: "Karan Verma",
    createdAt: "2024-03-21T13:25:00",
    tag: "DSA",
  },
  {
    id: 9,
    title: "Pandas DataFrame Summary",
    code: `import pandas as pd

df = pd.read_csv("data.csv")
print(df.describe())`,
    language: "python",
    category: "AI/ML",
    author: "Isha Kapoor",
    createdAt: "2024-03-22T10:10:00",
    tag: "ML",
  },
  {
    id: 10,
    title: "Tailwind Center Div",
    code: `<div class="flex items-center justify-center h-screen">
  <p>Hello World</p>
</div>`,
    language: "html",
    category: "Web Dev",
    author: "Mohit Yadav",
    createdAt: "2024-03-23T17:40:00",
    tag: "Web Dev",
  },
];

const Home = () => {
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

  // Function to handle copy to clipboard
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
    <div className="flex min-h-screen bg-slate-950">
      {/* Fixed Sidebar */}
      <div className="fixed w-64 h-screen bg-slate-900 text-white flex flex-col">
        <Sidebar />
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 ml-64 p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
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

          {/* Snippets Grid */}
          <div className="grid grid-cols-2 gap-4">
            {sampleSnippets.map((snippet) => (
              <div
                key={snippet.id}
                className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden"
              >
                <div className="px-4 py-2">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-serif text-white  uppercase">
                      {snippet.title}
                    </h3>
                    <button
                      onClick={() => handleCopyToClipboard(snippet.code)}
                      className="text-yellow-300/50  cursor-pointer hover:bg-red-400/10 rounded-full p-1 flex items-center justify-center"
                    >
                      <FaClipboard className="h-5 w-5 text-red-600" />
                    </button>
                  </div>
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
                        <div>
                          <User className="h-4 w-4 text-yellow-300/50" />
                        </div>
                        <span className="text-sm text-green-500/60 font-semibold">
                          {snippet.author}
                        </span>
                      </div>
                      <span className="text-sm text-slate-400">-</span>
                      <span className="text-sm text-blue-500/60">
                        {snippet.createdAt.split("T")[0]}
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
        </div>
      </div>
    </div>
  );
};

export default Home;
