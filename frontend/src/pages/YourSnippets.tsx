import { User, Sparkles } from "lucide-react";
import Editor from "@monaco-editor/react";
import Sidebar from "../components/Sidebar";
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import Category from "../components/CatagoryTag";
import Language from "../components/LanguageTag";

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
];

const YourSnippets = () => {
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
              Your Snippets
              <Sparkles className="ml-2 w-5 h-5 text-cyan-400" />
            </h1>
            <p className="text-gray-500 italic">
              Manage your code snippets, edit or delete them as needed. Click on the pencil icon to edit or the trash icon to delete a snippet.
            </p>
          </header>
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
                    <div className="flex items-center space-x-2">
                      <button className="text-yellow-300/50  cursor-pointer hover:bg-red-400/10 rounded-full p-1 flex items-center justify-center">
                        <FaPencilAlt className="text-3xl text-yellow-600 p-1" />
                      </button>
                      <button className="text-yellow-300/50  cursor-pointer hover:bg-red-400/10 rounded-full p-1 flex items-center justify-center">
                        <RiDeleteBinFill className="text-3xl p-1 text-red-600" />
                      </button>
                    </div>
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

export default YourSnippets;
