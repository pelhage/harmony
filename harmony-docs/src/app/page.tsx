import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Terminal } from "@/components/terminal";
import { YamlEditor } from "@/components/yaml-editor";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-background/95">
      <SiteHeader />
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-16">
          <Container className="flex flex-col items-center gap-4 text-center">
            <h1 className="font-bold text-3xl sm:text-4xl md:text-4xl lg:text-5xl max-w-[42rem] leading-tight text-indigo-500">
              harmonize your local dev projects with one config
            </h1>
            <p className="text-lg text-muted-foreground max-w-[38rem]">
              Define, launch, and manage all your microservices, APIs, and
              frontends from a single YAML file. No more juggling terminal tabs.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
              <Button
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700"
                asChild
              >
                <Link href="https://github.com/pelhage/harmony" target="_blank">
                  Get Started
                </Link>
              </Button>
            </div>

            {/* Split layout with YAML editor and Terminal */}
            <div
              id="demo"
              className="w-full max-w-[95%] md:max-w-[90%] lg:max-w-[85%] mt-10 grid grid-cols-1 md:grid-cols-5 gap-4"
            >
              <div className="relative overflow-hidden rounded-xl border border-border/50 shadow-2xl md:col-span-2">
                <YamlEditor />
              </div>
              <div className="relative overflow-hidden rounded-xl border border-border/50 shadow-2xl md:col-span-3">
                <Terminal />
              </div>
            </div>
          </Container>
        </section>

        <section id="features" className="space-y-6 py-8 md:py-12 lg:py-24">
          <Container>
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
                Features
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Harmony comes with a powerful set of features to boost your
                productivity.
              </p>
            </div>

            <div className="mx-auto mt-8 grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="relative overflow-hidden rounded-xl border border-border/50 bg-background/50 p-6 shadow-md transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex h-full flex-col justify-between">
                    <div className="space-y-2">
                      <div className="h-10 w-10 rounded-full bg-indigo-500/10 flex items-center justify-center mb-3">
                        <div
                          className="h-5 w-5 rounded-full"
                          style={{
                            backgroundColor:
                              index % 2 === 0
                                ? "var(--indigo-500)"
                                : "var(--violet-500)",
                          }}
                        ></div>
                      </div>
                      <h3 className="font-bold text-xl">{feature.title}</h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section
          id="installation"
          className="space-y-6 py-8 md:py-12 lg:py-16 bg-gradient-to-b from-background/80 to-background"
        >
          <Container>
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
                Get Started in Minutes
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Install Harmony and start managing your projects with ease.
              </p>

              <div className="w-full max-w-[90%] mt-8 bg-[#0f0f0f] rounded-xl overflow-hidden">
                <div className="bg-[#0f0f0f] text-white p-2 flex items-center">
                  <div className="flex space-x-2 mr-2">
                    <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                  </div>
                  <div className="text-sm font-medium text-gray-300">
                    terminal
                  </div>
                </div>
                <pre className="p-4 text-sm font-mono text-left text-gray-300">
                  <code>
                    # Clone the repository{"\n"}
                    git clone https://github.com/pelhage/harmony.git{"\n\n"}#
                    Install dependencies{"\n"}
                    cd harmony{"\n"}
                    npm install{"\n\n"}# Build the project{"\n"}
                    npm run build{"\n\n"}# Link the package globally{"\n"}
                    npm link
                  </code>
                </pre>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

const features = [
  {
    title: "Project Discovery",
    description:
      "Instantly list all your projects and available commands. No more digging through READMEs or trying to remember script names across multiple repositories.",
  },
  {
    title: "Unified Command Center",
    description:
      "Start all your projects in a single window or separate terminals with granular control. Choose what works best for your workflow without juggling multiple terminal tabs.",
  },
  {
    title: "Intelligent Autocomplete",
    description:
      "Never struggle to remember project names or commands again. Harmony's autocomplete ensures you always know what's available without memorizing complex scripts.",
  },
  {
    title: "Effortless Port Management",
    description:
      "Say goodbye to 'lsof' and grepping for ports. Harmony makes port cleanup easy and config-driven, eliminating the frustration of 'address already in use' errors.",
  },
  {
    title: "Multi-Command Workflows",
    description:
      "Configure multiple commands per project to handle complex startup sequences. Build, migrate, and run your services in the right order, every time.",
  },
  {
    title: "Run From Anywhere",
    description:
      "Access your projects from any directory. Harmony finds your config automatically, so you can start your development environment from wherever you're working.",
  },
  {
    title: "Color-Coded Output",
    description:
      "Easily distinguish between different projects with clean, color-coded terminal output. Quickly identify which logs belong to which service at a glance.",
  },
];
