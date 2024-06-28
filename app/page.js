// app/page.jsx
import ResumeForm from "@/components/ResumeForm"
import ResumeBuilder from "./build/page"

export default function Home() {
  return (
    <main className="container mx-auto px-4">
      <h1 className="text-4xl font-bold  text-purple-900 my-8">Resume Builder</h1>
      {/* Add your components here */}
        <ResumeBuilder/>
    </main>
  )
}

