# 🧠 Live Knowledge Graph Builder

> **Watch knowledge take shape — in real time.**

Transform unstructured text into an interactive, streaming knowledge graph. Instead of waiting for a finished result, watch entities appear, relationships form, and structure emerge progressively as the system reasons through your input.

**This is not a demo. This is a deep exploration of modern React architecture.**

---

## 📖 Table of Contents

- [What It Does](#-what-it-does)
- [Why This Project Exists](#-why-this-project-exists)
- [Key Features](#-key-features)
- [Architectural Philosophy](#-architectural-philosophy)
- [Technical Deep Dive](#-technical-deep-dive)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Who This Is For](#-who-this-is-for)
- [Future Directions](#-future-directions)

---

## ✨ What It Does

Live Knowledge Graph Builder processes unstructured text and builds an interactive knowledge graph **as you watch**:

1. **Accepts** raw text (notes, documents, articles, ideas)
2. **Extracts** entities (concepts, people, places, topics)
3. **Infers** relationships between entities
4. **Streams** the graph to the UI progressively
5. **Enables** interactive exploration and subgraph expansion

**The result:** A living graph that evolves as knowledge is discovered — not a static visualization.

---

## 🎯 Why This Project Exists

Most applications hide complexity behind loading spinners.  
**This project does the opposite.**

It answers a fundamental question:

> **What does a UI look like when it reflects how thinking actually happens?**

The answer:

- ✅ Partial results appear immediately
- ✅ Progressive structure builds over time
- ✅ Reasoning becomes visible
- ✅ Interaction is instant

This project explores **how modern React enables this experience** when used intentionally and architecturally.

---

## 🌟 Key Features

### Real-Time Streaming

- Progressive rendering as entities and relationships are discovered
- No waiting for complete results
- Visual feedback during computation

### Interactive Exploration

- Click nodes to expand related entities
- Dynamically fetch and integrate subgraphs
- Intelligent caching prevents redundant requests

### Smart Client-Server Separation

- Heavy computation stays on the server
- Client handles rendering and interaction
- Clear ownership boundaries

### Production-Ready Patterns

- Suspense boundaries for granular loading states
- React Server Components for data-heavy operations
- React Query for client-side interactions
- Type-safe with TypeScript

---

## 🧩 Architectural Philosophy

This project is **opinionated by design**. Every architectural decision is intentional.

### 🖥️ Server Does the Thinking

**Responsibilities:**

- Entity extraction from unstructured text
- Relationship inference and reasoning
- Heavy or slow computation
- Progressive streaming of partial results

**Why:** Keep expensive operations close to data sources and off the client.

### 🎨 Client Does the Exploring

**Responsibilities:**

- Graph rendering and visualization
- Node interaction and selection
- Layout, filtering, and navigation
- Subgraph expansion on demand

**Why:** Maximize responsiveness and user control.

### 💾 Cache Enables Continuity

**Strategy:**

- Previously explored nodes are reused
- Expansions are cached and intelligently merged
- Refetching is explicit and predictable
- No redundant computation

**Why:** Fast interactions without sacrificing correctness.

---

## 🔬 Technical Deep Dive

### Why React Server Components?

RSCs are used **where they actually matter**:

```typescript
// Server Component - data co-located with rendering
async function KnowledgeGraph({ query }) {
  const graph = await extractKnowledgeGraph(query)
  return <GraphView initialData={graph} />
}
```

**Benefits:**

- Expensive computation happens server-side
- Async data dependencies resolve before rendering
- Partial results stream progressively
- Zero client-side data coordination

**Result:** Simpler mental models, fewer loading states, clearer boundaries.

---

### Why `use()` and Suspense?

Async data is treated as a **first-class rendering concern**:

```typescript
// Unwrap server promises directly in components
function GraphNode({ nodePromise }) {
  const node = use(nodePromise)
  return <NodeView data={node} />
}
```

**The Pattern:**

- `use()` unwraps server promises directly
- Suspense boundaries define where UI can pause
- Streaming shows meaningful content immediately
- Rendering becomes a pure function of data

**No more:** useEffect chains, loading state management, or lifecycle juggling.

---

### Why React Query Still Exists Here?

Not all data belongs on the server.

**React Query handles:**

- Node expansion on user interaction
- Client-initiated refetches
- Caching previously explored subgraphs
- Background updates without blocking rendering

```typescript
// Client-side interaction with smart caching
const { data: subgraph } = useQuery({
  queryKey: ['subgraph', nodeId],
  queryFn: () => fetchSubgraph(nodeId),
  staleTime: 1000 * 60 * 5, // 5 minutes
})
```

**This project demonstrates when to use React Query — and when not to.**

---

### Why a Graph?

Graphs are **honest**. They expose:

- ❌ Bad data models
- ❌ Unclear relationships
- ❌ Architectural shortcuts

Using a graph forces explicit decisions about:

- ✅ What defines an entity
- ✅ How entities relate to each other
- ✅ Who owns each part of the data lifecycle

**That pressure is the point.**

---

## 🛠️ Technology Stack

### Frontend

- **React 19** - Server Components, `use()`, Suspense
- **Next.js 15** - App Router, Server Actions, Streaming
- **TypeScript** - Type safety across client and server
- **TanStack Query** - Client-side state and caching
- **React Flow / D3.js** - Graph visualization *(to be implemented)*

### Backend

- **OpenAI API / Local LLM** - Entity extraction and relationship inference
- **Streaming APIs** - Progressive result delivery

### Tooling

- **Turbopack** - Fast development builds
- **Ultracite** - Code quality

---

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- npm, yarn, or pnpm
- OpenAI API key (or local LLM setup)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/kg-builder.git
cd kg-builder

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your API keys to .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Basic Usage

1. Enter or paste unstructured text
2. Watch as entities are extracted in real-time
3. See relationships form between entities
4. Click nodes to explore and expand the graph
5. Navigate the knowledge structure interactively

---

## 📁 Project Structure

```bash
kg-builder/
├── app/                    # Next.js App Router
│   ├── graph/             # Graph visualization pages
│   └── layout.tsx         # Root layout
├── components/
│   ├── server/            # React Server Components
│   ├── client/            # Client Components
│   └── graph/             # Graph visualization components
├── lib/
│   ├── graph/             # Graph data structures
│   ├── extraction/        # Entity extraction logic
│   └── streaming/         # Streaming utilities
├── hooks/                 # Custom React hooks
└── types/                 # TypeScript type definitions
```

---

## 🚫 What This Project Avoids

- ❌ Fake async behavior or artificial delays
- ❌ Client-side overfetching
- ❌ Global state abstractions without clear need
- ❌ "LLM wrapper" app patterns
- ❌ Hidden magic or opaque pipelines
- ❌ Premature optimization
- ❌ Trendy tech without justification

**Every tradeoff is intentional and explainable.**

---

## 👤 Who This Is For

This project is designed for engineers who want to:

- 🎓 Understand modern React beyond surface-level tutorials
- 🧠 Build intuition around async UI and streaming patterns
- 🏗️ Design systems with clear server/client boundaries
- 📐 Think in data structures, not just UI screens
- 💼 Create portfolio work that demonstrates architectural maturity
- 🚀 Learn production-ready patterns for real applications

**If you're building with React in 2024+, this is your reference.**

---

## 🔮 Future Directions

The architecture is intentionally extensible:

### Planned Features

- [ ] Richer entity types and custom schemas
- [ ] Local or privacy-preserving inference options
- [ ] Versioned knowledge graphs with history
- [ ] Collaborative multi-user exploration
- [ ] Domain-specific templates (research, legal, engineering, personal notes)
- [ ] Export to standard graph formats (RDF, GraphML)
- [ ] Advanced visualization modes and layouts
- [ ] Real-time collaboration via WebSockets

### Research Directions

- Incremental learning and graph refinement
- Conflict resolution in distributed graphs
- Query optimization for large graphs
- Graph compression and summarization

---

## 📝 License

MIT License - See [LICENSE](LICENSE) for details

---

## 🤝 Contributing

Contributions are welcome! This project values:

- Clear architectural thinking
- Well-reasoned tradeoffs
- Code that teaches

Please open an issue before starting major work.

---

## 💡 Final Thoughts

**Live Knowledge Graph Builder is not about displaying data.**

It's about **making reasoning visible** — and using modern React the way it was designed to be used.

If you understand why this project is built this way,  
**you understand the future of React.**

---

<div align="center">

**Built with intention. Designed to teach. Open to explore.**

</div>
