import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GettingStartedPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="container py-10">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h1 className="font-bold text-3xl leading-tight sm:text-5xl md:text-6xl">
              Getting Started
            </h1>
            <p className="max-w-[85%] leading-normal text-stone-700 sm:text-lg sm:leading-7">
              Learn how to install and use Harmony
            </p>
          </div>
        </section>

        <section className="container py-12">
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Installation</h2>
              <p className="text-stone-700">
                Harmony can be installed on various platforms. Choose your
                platform below to see installation instructions.
              </p>

              <Tabs defaultValue="npm" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="npm">npm</TabsTrigger>
                  <TabsTrigger value="brew">Homebrew</TabsTrigger>
                  <TabsTrigger value="binary">Binary</TabsTrigger>
                </TabsList>
                <TabsContent value="npm" className="mt-4 space-y-4">
                  <p>Install Harmony globally using npm:</p>
                  <pre className="bg-stone-100 p-4 rounded-md overflow-x-auto">
                    <code>npm install -g harmony-cli</code>
                  </pre>
                </TabsContent>
                <TabsContent value="brew" className="mt-4 space-y-4">
                  <p>Install Harmony using Homebrew on macOS:</p>
                  <pre className="bg-stone-100 p-4 rounded-md overflow-x-auto">
                    <code>brew install harmony-cli</code>
                  </pre>
                </TabsContent>
                <TabsContent value="binary" className="mt-4 space-y-4">
                  <p>
                    Download the binary for your platform from the GitHub
                    releases page:
                  </p>
                  <pre className="bg-stone-100 p-4 rounded-md overflow-x-auto">
                    <code>
                      # Linux/macOS
                      <br />
                      curl -L
                      https://github.com/yourusername/harmony/releases/latest/download/harmony-$(uname
                      -s)-$(uname -m) -o /usr/local/bin/harmony
                      <br />
                      chmod +x /usr/local/bin/harmony
                    </code>
                  </pre>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Basic Usage</h2>
              <p className="text-stone-700">
                After installing Harmony, you can start using it by running the{" "}
                <code>harmony</code> command in your terminal.
              </p>
              <pre className="bg-stone-100 p-4 rounded-md overflow-x-auto">
                <code>
                  # Start Harmony
                  <br />
                  harmony
                  <br />
                  <br />
                  # Run a specific command
                  <br />
                  harmony [command] [options]
                </code>
              </pre>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Configuration</h2>
              <p className="text-stone-700">
                Harmony can be configured using a configuration file located at{" "}
                <code>~/.harmony/config.json</code>.
              </p>
              <pre className="bg-stone-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`{
  "theme": "dark",
  "plugins": [
    "harmony-plugin-git",
    "harmony-plugin-npm"
  ],
  "shortcuts": {
    "ctrl+t": "new-tab",
    "ctrl+w": "close-tab"
  }
}`}
                </code>
              </pre>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">First Steps</h2>
              <p className="text-stone-700">
                Here are some basic commands to get you started with Harmony:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <code>harmony help</code> - Display help information
                </li>
                <li>
                  <code>harmony version</code> - Show version information
                </li>
                <li>
                  <code>harmony list</code> - List available commands
                </li>
                <li>
                  <code>harmony config</code> - Edit configuration
                </li>
                <li>
                  <code>harmony update</code> - Update to the latest version
                </li>
              </ul>
              <p className="text-stone-700 mt-4">
                For more detailed information, check out the{" "}
                <a
                  href="/docs/commands"
                  className="text-blue-600 hover:underline"
                >
                  Commands
                </a>{" "}
                section.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
