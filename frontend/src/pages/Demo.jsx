import {
  ArrowLeft,
  ArrowRight,
  Check,
  Code2,
  Coins,
  CreditCard,
  ExternalLink,
  LayoutDashboard,
  Link as LinkIcon,
  LogIn,
  MessageSquare,
  Monitor,
  Rocket,
  Send,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    icon: LogIn,
    label: "Home",
    title: "Login from the navbar",
    text: "Click Login, continue with Google, and Zion AI stores your account with starting credits. After login, the navbar shows your credits and profile menu.",
  },
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    title: "Open your dashboard",
    text: "Use the profile menu or dashboard route to see all websites you have generated. The + New Website button starts a fresh build.",
  },
  {
    icon: Sparkles,
    label: "Generate",
    title: "Describe the website",
    text: "Write a clear prompt in Describe Your Website, then click Generate Website. Zion AI analyzes, designs, writes code, and deducts credits.",
  },
  {
    icon: Monitor,
    label: "Editor",
    title: "Review the live preview",
    text: "After generation, the app opens the editor. The main area shows a live website preview so you can inspect the result immediately.",
  },
  {
    icon: Code2,
    label: "Code",
    title: "Open the code panel",
    text: "Click the code icon to see the generated index.html in the editor. You can inspect or adjust the HTML directly.",
  },
  {
    icon: MessageSquare,
    label: "Changes",
    title: "Ask for updates",
    text: "Use the chat box to request changes like colors, sections, responsiveness, layout, animation, or content improvements.",
  },
  {
    icon: Rocket,
    label: "Deploy",
    title: "Publish the website",
    text: "Click Deploy in the editor or dashboard. Zion AI creates a live /site link for the generated website.",
  },
  {
    icon: LinkIcon,
    label: "Share",
    title: "Share from dashboard",
    text: "Go back to the dashboard. Deployed websites show Share Link, which copies the public URL for clients or friends.",
  },
  {
    icon: CreditCard,
    label: "Pricing",
    title: "Buy credits when needed",
    text: "Click the credits pill in the navbar to open Pricing. Free returns to dashboard, while Pro and Enterprise open Razorpay checkout.",
  },
];

const Demo = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen bg-[#050505] text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-125 h-125 bg-indigo-600/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-125 h-125 bg-purple-600/20 rounded-full blur-[140px]" />
      </div>

      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff15 1px, transparent 1px), linear-gradient(to bottom, #ffffff15 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        <button
          onClick={() => navigate("/")}
          className="mb-12 flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-white/10 rounded-full bg-white/5 backdrop-blur">
            <img src="/ai2.png" className="w-5" />
            <span className="text-sm text-gray-300">Zion AI Demo</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Watch the real workflow from
            <span className="block bg-linear-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
              idea to live website
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-400">
            This is the exact order your app follows: login, dashboard,
            generation, editor, code, changes, deploy, sharing, and credits.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <img src="/ai.png" className="w-12 h-12 object-contain" />
                <div>
                  <h2 className="font-semibold">Zion AI walkthrough</h2>
                  <p className="text-sm text-zinc-500">Built from your app screens</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm">
                <Coins size={14} className="text-yellow-400" />
                <span>65 Credits</span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/70 overflow-hidden">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
                <span className="ml-3 text-xs text-zinc-500">localhost:5173</span>
              </div>

              <div className="p-5 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold">Dashboard</span>
                    <span className="px-3 py-1 rounded-lg bg-white text-black text-xs font-semibold">
                      + New Website
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <PreviewCard title="men shirts shopping website" />
                    <PreviewCard title="tic toc game website" />
                  </div>
                </div>

                <div className="rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-4">
                  <p className="text-xs text-zinc-400 mb-2">Generate prompt</p>
                  <p className="text-sm font-medium">
                    build an online men shirts shopping website
                  </p>
                  <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-3/4 bg-linear-to-r from-white to-zinc-300" />
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white text-black p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Live Preview</span>
                    <div className="flex gap-2 text-zinc-700">
                      <Rocket size={16} />
                      <Code2 size={16} />
                      <Monitor size={16} />
                    </div>
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-slate-900">
                    ShirtBoutique
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Elegant Men&apos;s Shirts with responsive sections and a
                    working page structure.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur hover:border-indigo-400 transition"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 mb-1">
                        Step {index + 1} - {step.label}
                      </p>
                      <h3 className="font-semibold mb-2">{step.title}</h3>
                      <p className="text-sm leading-relaxed text-zinc-400">
                        {step.text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ActionTile icon={Check} title="Free plan" text="Go to dashboard" />
            <ActionTile icon={CreditCard} title="Paid plans" text="Open Razorpay checkout" />
            <ActionTile icon={LinkIcon} title="Deployed sites" text="Copy and share live URL" />
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/generate")}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-xl font-semibold transition"
          >
            Start Building
            <ArrowRight size={18} />
          </button>
          <button
            onClick={() => navigate("/pricing")}
            className="flex items-center justify-center gap-2 px-6 py-3 border border-white/20 hover:bg-white/10 rounded-xl transition"
          >
            View Pricing
            <ExternalLink size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

const PreviewCard = ({ title }) => (
  <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
    <div className="h-16 bg-linear-to-r from-slate-200 to-slate-400" />
    <div className="p-3">
      <p className="text-xs font-semibold line-clamp-1">{title}</p>
      <div className="mt-3 h-7 rounded-lg bg-white/10" />
    </div>
  </div>
);

const ActionTile = ({ icon: Icon, title, text }) => (
  <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/30 p-4">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-indigo-300">
      <Icon size={18} />
    </div>
    <div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-zinc-400">{text}</p>
    </div>
  </div>
);

export default Demo;
