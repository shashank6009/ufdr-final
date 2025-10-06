import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Shield, Database, Search, FileText } from 'lucide-react'

function App() {
  const [apiStatus, setApiStatus] = useState<string>('Checking...')

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await fetch('http://localhost:8000/health')
        if (response.ok) {
          const data = await response.json()
          setApiStatus(`Connected - ${data.message}`)
        } else {
          setApiStatus('API Error')
        }
      } catch {
        setApiStatus('API Offline')
      }
    }

    checkApiStatus()
    const interval = setInterval(checkApiStatus, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-blue-400 mr-3" />
            <h1 className="text-4xl font-bold text-white">UFDR Copilot</h1>
          </div>
          <p className="text-xl text-slate-300 mb-4">
            Secure Forensic Analysis Platform
          </p>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800 border border-slate-700">
            <div className={`w-2 h-2 rounded-full mr-2 ${
              apiStatus.includes('Connected') ? 'bg-green-400' : 'bg-red-400'
            }`} />
            <span className="text-sm text-slate-300">API Status: {apiStatus}</span>
          </div>
        </header>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 hover:bg-slate-800/70 transition-colors">
            <Database className="h-8 w-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Data Analysis</h3>
            <p className="text-slate-300">
              Advanced forensic data processing and analysis capabilities
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 hover:bg-slate-800/70 transition-colors">
            <Search className="h-8 w-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Investigation Tools</h3>
            <p className="text-slate-300">
              Comprehensive search and investigation utilities
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 hover:bg-slate-800/70 transition-colors">
            <FileText className="h-8 w-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Report Generation</h3>
            <p className="text-slate-300">
              Automated forensic report creation and documentation
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-x-4">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Start Analysis
          </Button>
          <Button variant="outline" size="lg" className="border-slate-600 text-slate-300 hover:bg-slate-800">
            View Documentation
          </Button>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-slate-400">
          <p>&copy; 2024 UFDR Copilot. Secure Forensic Analysis Platform.</p>
        </footer>
      </div>
    </div>
  )
}

export default App