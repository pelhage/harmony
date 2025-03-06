"use client";

import { useEffect, useState } from "react";

export function YamlEditor() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Simplified YAML content with one command per project - keeping space theme
  const yamlContent = `projects:
  space-rocket-api:
    root: "./spaceship-api"
    commands:
      - command: "npm start"
        workingDir: "."
        description: "Start spaceship API"
  alien-detector:
    root: "./rocket-blaster-ui"
    commands:
      - command: "./scan_for_aliens.sh"
        workingDir: "."
        description: "Run blaster UI"
    ports:
      - 8080

cleanup:
  ports: true`;

  return (
    <div className="border-0 shadow-lg overflow-hidden rounded-xl transition-all duration-300 hover:shadow-2xl h-full">
      <div className="bg-[#0f0f0f] text-white p-2 flex items-center">
        <div className="flex space-x-2 mr-2">
          <div className="w-3 h-3 rounded-full bg-gray-400"></div>
          <div className="w-3 h-3 rounded-full bg-gray-400"></div>
          <div className="w-3 h-3 rounded-full bg-gray-400"></div>
        </div>
        <div className="ml-auto text-xs text-gray-400 hidden sm:block">
          harmony.yaml
        </div>
      </div>
      <div className="h-72 md:h-[22rem] lg:h-[24rem] w-full bg-[#0f0f0f] overflow-auto">
        {isClient ? (
          <pre className="p-4 text-sm font-mono text-left">
            <code className="language-yaml">
              {yamlContent.split("\n").map((line, index) => {
                // Calculate indentation level for proper spacing
                const indentLevel = line.search(/\S|$/);
                const indentSpace = " ".repeat(indentLevel);

                // Remove leading whitespace for our custom rendering
                const trimmedLine = line.trimStart();

                // Highlight comments
                if (trimmedLine.startsWith("#")) {
                  return (
                    <div key={index} className="text-gray-500">
                      {indentSpace}
                      {trimmedLine}
                    </div>
                  );
                }

                // Highlight keys
                if (trimmedLine.includes(":")) {
                  const [key, value] = trimmedLine.split(":", 2);
                  return (
                    <div key={index} className="whitespace-pre">
                      {indentSpace}
                      <span className="text-indigo-400">{key}:</span>
                      <span className="text-gray-300">{value}</span>
                    </div>
                  );
                }

                // Highlight list items
                if (trimmedLine.startsWith("-")) {
                  return (
                    <div key={index} className="whitespace-pre">
                      {indentSpace}
                      <span className="text-violet-400">-</span>
                      <span className="text-gray-300">
                        {trimmedLine.substring(1)}
                      </span>
                    </div>
                  );
                }

                // Empty lines or other content
                return (
                  <div key={index} className="text-gray-300 whitespace-pre">
                    {line}
                  </div>
                );
              })}
            </code>
          </pre>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-400 text-sm">Loading YAML editor...</div>
          </div>
        )}
      </div>
    </div>
  );
}
