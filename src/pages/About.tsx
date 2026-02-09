export default function About() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">About MOC 106 Generator</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Learn about this application and its creator
        </p>
      </div>

      {/* Project Description */}
      <section className="card p-6">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Project Description</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-4">
          MOC 106 Form Generator is a modern, React-based web application that streamlines the process of generating and filling MOC 106 forms. It automatically extracts form fields from a PDF template and provides an intuitive interface for users to fill in their information and generate customized PDFs.
        </p>
        <p className="text-slate-700 dark:text-slate-300">
          The application emphasizes user privacy by storing all data locally in the browser, without sending any information to external servers.
        </p>
      </section>

      {/* Technology Stack */}
      <section className="card p-6">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Technology Stack</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Frontend</h3>
            <ul className="space-y-1 text-slate-600 dark:text-slate-400">
              <li>⚛️ React 19.2.0</li>
              <li>📘 TypeScript 5.9.3</li>
              <li>⚡ Vite 7.2.4</li>
              <li>🎨 Tailwind CSS 4.1.18</li>
              <li>🛣️ React Router 7.13.0</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Libraries</h3>
            <ul className="space-y-1 text-slate-600 dark:text-slate-400">
              <li>📄 pdf-lib 1.17.1</li>
              <li>📅 date-fns 4.1.0</li>
              <li>🎯 clsx 2.1.1</li>
              <li>🔍 ESLint & Prettier</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="card p-6">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Key Features</h2>
        <ul className="space-y-3 text-slate-700 dark:text-slate-300">
          <li>✅ <strong>Automatic Field Extraction:</strong> Extracts form fields from PDF templates</li>
          <li>✅ <strong>Dynamic Form UI:</strong> Generates responsive form interface from extracted fields</li>
          <li>✅ <strong>PDF Generation:</strong> Fills and generates downloadable PDF documents</li>
          <li>✅ <strong>Theme Support:</strong> Light, dark, and automatic theme modes</li>
          <li>✅ <strong>Settings Management:</strong> Save and export user preferences</li>
          <li>✅ <strong>Auto-Save:</strong> Automatically saves form progress</li>
          <li>✅ <strong>Comprehensive Logging:</strong> Track all actions and events</li>
          <li>✅ <strong>Offline Support:</strong> Works without internet connection</li>
          <li>✅ <strong>Privacy First:</strong> All data stored locally, no server communication</li>
        </ul>
      </section>

      {/* Creator & Contact */}
      <section className="card p-6 bg-sky-50 dark:bg-sky-900/20">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Developer</h2>
        <div className="space-y-3">
          <p className="text-slate-700 dark:text-slate-300">
            <strong>Created by:</strong> Igal Krigel
          </p>
          <p className="text-slate-700 dark:text-slate-300">
            <strong>Email:</strong> <a href="mailto:ikrigel@gmail.com" className="text-sky-600 hover:text-sky-700 dark:text-sky-400">ikrigel@gmail.com</a>
          </p>
          <p className="text-slate-700 dark:text-slate-300">
            <strong>GitHub:</strong> <a href="https://github.com/ikrigel" className="text-sky-600 hover:text-sky-700 dark:text-sky-400">github.com/ikrigel</a>
          </p>
          <p className="text-slate-700 dark:text-slate-300">
            <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/ikrigel/" className="text-sky-600 hover:text-sky-700 dark:text-sky-400">linkedin.com/in/ikrigel</a>
          </p>
        </div>
      </section>

      {/* Version Info */}
      <section className="card p-6">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Version Information</h2>
        <dl className="space-y-3">
          <div className="flex justify-between">
            <dt className="font-medium text-slate-900 dark:text-slate-100">Version:</dt>
            <dd className="text-slate-600 dark:text-slate-400">1.0.0</dd>
          </div>
          <div className="flex justify-between">
            <dt className="font-medium text-slate-900 dark:text-slate-100">Released:</dt>
            <dd className="text-slate-600 dark:text-slate-400">February 2026</dd>
          </div>
          <div className="flex justify-between">
            <dt className="font-medium text-slate-900 dark:text-slate-100">License:</dt>
            <dd className="text-slate-600 dark:text-slate-400">MIT</dd>
          </div>
          <div className="flex justify-between">
            <dt className="font-medium text-slate-900 dark:text-slate-100">Built with:</dt>
            <dd className="text-slate-600 dark:text-slate-400">React + TypeScript</dd>
          </div>
        </dl>
      </section>

      {/* Credits */}
      <section className="card p-6">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Credits & Acknowledgments</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-4">
          This project was built with the help of modern open-source libraries and frameworks:
        </p>
        <ul className="space-y-2 text-slate-600 dark:text-slate-400">
          <li>🙏 React team for the excellent UI framework</li>
          <li>🙏 Vite team for the fast build tool</li>
          <li>🙏 Tailwind CSS team for the utility-first CSS framework</li>
          <li>🙏 pdf-lib contributors for PDF manipulation</li>
          <li>🙏 All open-source contributors</li>
        </ul>
      </section>

      {/* Links */}
      <section className="card p-6">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Useful Links</h2>
        <div className="space-y-2">
          <a href="/help" className="block text-sky-600 hover:text-sky-700 dark:text-sky-400">
            📚 Help & User Guide
          </a>
          <a href="https://github.com/yourprofile/moc106-generator" className="block text-sky-600 hover:text-sky-700 dark:text-sky-400">
            💻 GitHub Repository
          </a>
          <a href="/form" className="block text-sky-600 hover:text-sky-700 dark:text-sky-400">
            📋 Back to Form
          </a>
        </div>
      </section>
    </div>
  );
}
