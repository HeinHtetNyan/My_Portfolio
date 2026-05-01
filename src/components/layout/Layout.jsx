import Navbar from './Navbar'
import GridBackground from '../ui/GridBackground'

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-white">
      <GridBackground />
      <Navbar />
      <main className="relative z-10">
        {children}
      </main>
    </div>
  )
}
